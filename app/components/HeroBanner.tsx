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
import { gsap } from "gsap/gsap-core";


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
    renderer.setPixelRatio(window.devicePixelRatio);

    window.addEventListener('resize', () => {
      bannerSize.width = canvasRef.current.clientWidth;
      bannerSize.height = canvasRef.current.clientHeight;
      camera.aspect = bannerSize.width / bannerSize.height;
      console.log(camera.aspect);
      // camera.updateProjectionMatrix();
      // renderer.setSize(bannerSize.width, bannerSize.height);
    });

    camera.position.z = 300;

    const t1 = gsap.timeline();
    const duration = 1;
    const ease = 'none';
    let animationIsFinished = false;
    if (!animationIsFinished) {
      animationIsFinished = true;

      t1.to(camera.position, {
        x: 30,
        y: 30,
        z: 50,
        delay: 1,
        duration: 4,
        ease: "power2.in",
        onUpdate: () => {
          // camera.lookAt(0, -5, 0);
          // console.log(`x: ${Math.round(camera.position.x)}, y: ${Math.round(camera.position.y)}, z: ${Math.round(camera.position.z)}`);
        }
      }, '>-1')
        .to(camera.position, {
          x: 0,
          y: -5,
          z: 50,
          duration: 3,
          ease: "power2.inout",
          onUpdate: () => {
            // camera.lookAt(0, -5, 0);
            // console.log(`x: ${Math.round(camera.position.x)}, y: ${Math.round(camera.position.y)}, z: ${Math.round(camera.position.z)}`);
          }
        })


    }


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
    // controls.minPolarAngle = -Math.PI / 1.9;
    // controls.maxPolarAngle = Math.PI / 1.9;
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

      <style jsx>{`
.hero-banner-container {
  background-color: #dcdcdc;
  border-radius: 15px;
  position: relative;
  height: 500px;
  line-height: 0.9;
  width: 100%;
}

.hero-banner-canvas {
  position: absolute;
  z-index: 10;
  border-radius: 15px;
  height: 500px;
  line-height: 0.9;
  width: 100%;
}

.hero-banner-container .beats-solo {
  font-size: 20px;
}
.hero-banner-container button {
  border-radius: 15px;
  padding: 10px 16px;
  background-color: #f02d34;
  color: white;
  border: none;
  margin-top: 40px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  z-index: 11 !important;
}

.hero-banner-container h3 {
  font-size: 4rem;
  margin-top: 4px;
}
.hero-banner-container h1 {
  color: white;
  font-size: 10em;
  margin-left: -20px;
  text-transform: uppercase;
}
.hero-banner-image {
  position: absolute;
  top: 0%;
  right: 20%;
  width: 550px;
  height: 500px;
}

.desc {
  position: absolute;
  right: 10%;
  bottom: 5%;
  width: 300px;
  line-height: 1.3;
  display: flex;
  flex-direction: column;
  color: #324d67;
}
.desc p {
  color: #5f5f5f;
  font-weight: 100;
  text-align: end;
}
.desc h5 {
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 16px;
  /* color: black; */
  align-self: flex-end;
}
      `}</style>
    </>
  );
};

export default HeroBanner;
