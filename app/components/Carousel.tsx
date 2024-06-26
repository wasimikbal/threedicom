"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { loadModels } from '@/utils/getModels';
import { Product as ProductType } from '@/types/product';
import Product from '../components/Product'; // Ensure this import is correct

interface ProductDetailsProps {
  productList: ProductType[];
}

const Carousel: React.FC<ProductDetailsProps> = ({ productList }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [models, setModels] = useState<THREE.Object3D[] | null>(null);
  const scenes = useRef<THREE.Scene[]>([]);

  useEffect(() => {
    const paths = ['/model1.glb', '/model2.glb'];

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

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor(0xffffff, 1);
    renderer.setPixelRatio(window.devicePixelRatio);

    const animate = () => {
      requestAnimationFrame(animate);
      // console.log(scenes.current)
      scenes.current.forEach(scene => {
        const { element, camera, controls } = scene.userData;
        const rect = element.getBoundingClientRect();
        console.log(window.innerWidth + ":" + window.innerHeight)

        // Skip if the scene is off-screen
        if (rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth) {
          return;
        }

        const width = rect.width;
        const height = rect.height;
        const left = rect.left;
        const top = rect.top;

        renderer.setViewport(left, top, width, height);
        renderer.setScissor(left, top, width, height);
        renderer.setScissorTest(true);

        controls.update();
        renderer.render(scene, camera);
      });
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      scenes.current.forEach(scene => {
        const camera = scene.userData.camera;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [models]);

  if (!models || models.length < 1) return <h1>Loading ...</h1>;

  return (
    <>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <div id="content" ref={contentRef}></div>
      {
        productList.map((product: ProductType) => (
          <Product key={product._id} product={product} scenesRef={scenes} contentRef={contentRef} models={models} />
        ))
      }
    </>
  );
};

export default Carousel;
