"use client"
import React, { MutableRefObject, useEffect, useRef } from "react";
import { Product as ProductType } from "@/types/product";
import Link from "next/link";
import { urlFor } from "@/lib/client";
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

type props = {
  product: ProductType,
  scenesRef?: MutableRefObject<THREE.Scene[]>,
  contentRef?: MutableRefObject<HTMLDivElement>,
  models?: THREE.Object3D
}

const Product: React.FC<props> = ({product, scenesRef, contentRef, models}) => {
  product.model = models[0];
  const { _id, _type, name, slug, price, details, image, model } = product;
  const firstDivRef = useRef<HTMLDivElement | null>(null);
  const productRootDivRef = useRef<HTMLDivElement | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const scene = new THREE.Scene();

    const sceneDiv: HTMLDivElement = document.createElement('div');
    sceneDiv.className = 'scene-div';
    scene.userData.element = sceneDiv;
    firstDivRef.current?.appendChild(sceneDiv);
    contentRef.current?.appendChild(productRootDivRef?.current);

    // Compute model's bounding box
    const box = new THREE.Box3().setFromObject(model);
    const boxSize = new THREE.Vector3();
    box.getSize(boxSize);
    const distance = (boxSize.x + boxSize.y + boxSize.z) / 3;
    const boxCOG = new THREE.Vector3();
    box.getCenter(boxCOG);

    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, 200 / 200);
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

    scenesRef.current.push(scene);
  }, []);
  return (
    <div>
      <div ref={productRootDivRef}>
      <Link className="link" href={`/product/${slug.current}`}>
        <div  className="product-card">
          <div
            ref={firstDivRef}
            className="product-image"
          ></div>
          <div className="product-name">{name}</div>
          <div className="product-price">AED {price}</div>
        </div>
      </Link>
      </div>
      
    </div>
  );
};

export default Product;
