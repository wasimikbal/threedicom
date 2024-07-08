"use client"
import React, { MutableRefObject, useEffect, useRef } from "react";
import { Product as ProductType } from "@/types/product";
import Link from "next/link";
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

type Props = {
  product: ProductType,
  scenesRef?: MutableRefObject<{}[]>,
  contentRef?: MutableRefObject<HTMLDivElement>,
  models?: THREE.Object3D[]
}

type sceneObject = {
  scene: THREE.Scene;
  element: HTMLDivElement;
  renderFun: (renderer: THREE.WebGLRenderer, time: number, rect: any) => void
};

const ProductComponent: React.FC<Props> = ({ product, scenesRef, contentRef, models }) => {
  const { _id, name, slug, price } = product;
  product.model = models[0];
  product.model.rotation.set(45, 0, 0)
  // product.model.scale.set(2,2,2)
  const model = product.model;
  const sceneContainerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && models && models.length > 0) {
      initialized.current = true;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x909090);
      scene.add(model);
      const element = sceneContainerRef.current;

      // Set up camera
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
      const box = new THREE.Box3().setFromObject(model);
      const boxSize = new THREE.Vector3();
      box.getSize(boxSize);
      const distance = Math.max(boxSize.x, boxSize.y, boxSize.z) * 2;
      const boxCenter = new THREE.Vector3();
      box.getCenter(boxCenter);
      camera.position.set(boxCenter.x, boxCenter.y, boxCenter.z + distance);
      camera.lookAt(boxCenter);


      //Light
      const light = new THREE.DirectionalLight('#FFFFFF', 1)
      camera.add(light);


      // Set up controls
      const controls = new OrbitControls(camera, element);
      controls.enableDamping = true; // Optional smooth camera movements
      controls.dampingFactor = 0.25;
      controls.enableZoom = false;

      scene.add(model);

      const renderFun = (renderer, time, rect) => {
        model.rotation.y = time * .001;
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        controls.update();
        renderer.render(scene, camera);
      }

      scenesRef?.current.push({ scene, element, renderFun });
    }
  }, [models]);

  return (
    <div>
      <div ref={sceneContainerRef} className="product-image"></div>
      <div className="product-name">{name}</div>
      <div className="product-price">AED {price}</div>

      <style jsx>{`
        .product-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s ease;
          width: 200px;
          margin: 0 10px;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-image {
          width: 200px;
          height: 200px;
          border-radius: 10px;
        }
        .product-name {
          margin-top: 10px;
          font-weight: 600;
        }
        .product-price {
          font-weight: 800;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default ProductComponent;
