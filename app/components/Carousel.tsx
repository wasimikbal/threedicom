"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { loadModels } from '@/utils/getModels';
import { Product as ProductType } from '@/types/product';
import ProductComponent from '../components/Product'; // Updated import

type ProductDetailsProps = {
  productList: ProductType[];
}

type sceneObject = {
  scene: THREE.Scene;
  element: HTMLDivElement;
  renderFun: (renderer: THREE.WebGLRenderer, time: number, rect: any) => void
};

const Carousel: React.FC<ProductDetailsProps> = ({ productList }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [models, setModels] = useState<THREE.Object3D[] | null>(null);
  const scenesRef = useRef<sceneObject[]>([]);

  useEffect(() => {
    const paths = ['/model4.glb', '/model5.glb'];

    const fetchData = async () => {
      try {
        const loadedModels = await loadModels(paths);
        setModels(loadedModels);
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!models || models.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor(0xffffff, 1);
    renderer.setPixelRatio(window.devicePixelRatio);

    const animate = (time) => {

      for (const { scene, element, renderFun } of scenesRef.current) {
        resizeRendererToDisplaySize(renderer);
        renderer.setScissorTest(true);

        const transform = `translateY(${window.scrollY}px)`;
        renderer.domElement.style.transform = transform;
        
        const rect = element.getBoundingClientRect();
        const { left, right, top, bottom, width, height } = rect;

        const isOffscreen =
          bottom < 0 ||
          top > renderer.domElement.clientHeight ||
          right < 0 ||
          left > renderer.domElement.clientWidth;
        if (!isOffscreen) {

          const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
          renderer.setScissor(left, positiveYUpBottom, width, height);
          renderer.setViewport(left, positiveYUpBottom, width, height);

          renderFun(renderer, time, rect);

        }
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    function resizeRendererToDisplaySize(renderer) {

      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;

    }


  }, [models]);

  if (!models || models.length < 1) return <h1>Loading ...</h1>;

  return (
    <>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <div id="content" ref={contentRef}>
        {productList.map((product: ProductType) => (
          <ProductComponent
            key={product._id}
            product={product}
            scenesRef={scenesRef}
            contentRef={contentRef}
            models={models}
          />
        ))}
      </div>

      <style jsx>{`
        #content {
          position: absolute;
          display: flex;
          gap: 3em;
          margin: 10px;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          overflow-x: scroll;
          top: 0;
          left: 0;
          width: 100%;
          height: 380px;
          padding: 3em; /* Adjust as needed */
          pointer-events: none; /* Allow canvas interactions if needed */
        }

        #canvas {
          outline: rgb(255, 187, 0);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: 1; /* Ensure canvas is below the content */
        }
      `}</style>
    </>
  );
};

export default Carousel;
