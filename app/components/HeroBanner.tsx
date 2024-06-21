"use client"
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { groq } from "next-sanity";
import { client, urlFor } from "@/lib/client";
import { Product } from "@/types/product";
import { Banner } from "@/types/banner";
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { url } from "inspector";


const HeroBanner: React.FC<Banner> = ({ ...bannerProps }) => {

  const
    { _id, _type, image, buttonText, product, desc, smallText, midText, largeText1, largeText2, discount, saleTime, }
      = bannerProps;

  const canvasRef = useRef(null);
  const [model, setModel] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    const bannerSize = { width: canvasRef.current.clientWidth, height: canvasRef.current.clientHeight }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, bannerSize.width / bannerSize.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(bannerSize.width, bannerSize.height);
    console.log(bannerSize)

    camera.position.z = 50;

    const modelLoader = new GLTFLoader();
    modelLoader.load('/headphones.glb', (gltf) => {
      const loadedModel = gltf.scene;
      loadedModel.position.set(0, -5, 0);
      loadedModel.scale.set(0.05, 0.05, 0.05);
      scene.add(loadedModel);
      setModel(loadedModel);
    });
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2;

    const skyboxTextureUrl = '/room.hdr';
    const hdriLoader = new RGBELoader().setDataType(THREE.HalfFloatType)
    hdriLoader.load(skyboxTextureUrl, function (texture) {
      
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      scene.environment = texture;
    
    });

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();


  }, []);


  return (
    <>
      <canvas className="hero-banner-canvas" ref={canvasRef} id="three-canvas"></canvas>
      <div className="hero-banner-container">
        <div>
          <p className="beats-solo">{smallText}</p>
          <h3>{midText}</h3>
          <h1>{largeText1}</h1>

          <div>
            <Link href={`/product/${product.toLowerCase()}`}>
              <button type="button" onClick={() => { }}>{buttonText}</button>
            </Link>
            <div className="desc">
              <h5>Description</h5>
              <p>{desc}</p>
            </div>
          </div>
        </div>
      </div>





    </>











  );
};

export default HeroBanner;
