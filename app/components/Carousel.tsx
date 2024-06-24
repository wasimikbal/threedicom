"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { loadModels } from '@/utils/getModels';
import { Product as ProductType } from '@/types/product';
import { Product } from '../components'

interface ProductDetailsProps {
  productList: ProductType[];
}


const Carousel: React.FC<ProductDetailsProps> = ({ productList }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [models, setModels] = useState<THREE.Object3D[] | null>(null)
  const scenes = useRef<THREE.Scene[]>([]);
  const arr = useRef<[]>([]);
  console.log(arr.current);

  
  useEffect(() => {

    const paths = ['/model1.glb', '/model2.glb'];

    const canvas = canvasRef.current;
    const content = contentRef.current;

    const fetchData = async () => {
      try {
        loadModels(paths).then((models: THREE.Object3D) => {
          renderModels(models, productList);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const renderModels = (models: THREE.Object3D, products: ProductType[]) => {


      products.forEach((product: ProductType, i) => {

        product.model = models[0];
        const model = product.model;
        const scene = new THREE.Scene();

        // Create container divs
        const firstDiv = document.createElement('div');
        firstDiv.className = 'list-item';

        const sceneDiv = document.createElement('div');
        firstDiv.appendChild(sceneDiv);

        scene.userData.element = sceneDiv;
        content.appendChild(firstDiv);

        // Compute model's bounding box
        const box = new THREE.Box3().setFromObject(model);
        const boxSize = new THREE.Vector3();
        box.getSize(boxSize);
        const distance = (boxSize.x + boxSize.y + boxSize.z) / 3;
        const boxCOG = new THREE.Vector3();
        box.getCenter(boxCOG);

        // Set up camera
        const camera = new THREE.PerspectiveCamera(75, 300 / 300);
        camera.position.z = distance * 1.5;
        camera.position.y = boxCOG.y;
        camera.lookAt(boxCOG);
        scene.userData.camera = camera;

        model.position.set(0, 0, 0);
        camera.position.y = 0;

        // Set up controls
        const controls = new OrbitControls(camera, sceneDiv);
        controls.enablePan = false;
        controls.enableZoom = false;
        scene.userData.controls = controls;

        // Add model and lights to scene
        scene.add(model);
        scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444, 3));
        const light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(1, 1, 1);
        scene.add(light);

        scenes.current.push(scene);
      });
    }





    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor(0xffffff, 1);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      scenes.current.forEach(scene => {
        const { element, camera, controls } = scene.userData;
        const rect = element.getBoundingClientRect();

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

  return (
    <>
      {/* <div id="content" ref={contentRef}></div>
      <canvas id="canvas" ref={canvasRef}></canvas> */}


      {
        productList.map((product: ProductType) => {
          return (<Product key={product._id} {...product} arr={arr}/>)
        })
      }
    </>
  );
};

export default Carousel;
