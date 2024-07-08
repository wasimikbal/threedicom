'use client'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import { Product as ProductType } from "@/types/product";
import * as THREE from 'three';


type Props = {
    product: ProductType,
    scenesRef?: MutableRefObject<THREE.Scene[]>,
    contentRef?: MutableRefObject<HTMLDivElement>,
    models?: THREE.Object3D[]
  }


const Scene: React.FC<Props> = ({product, scenesRef, contentRef, models}) => {
    const sceneContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        
    
          const scene = new THREE.Scene();
          scene.background = 0x000000;
          scene.userData.element = sceneContainerRef.current;
    
          // Set up camera
          const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
          
          camera.position.set(0, 0, 5);
          scene.userData.camera = camera;
    
          
    
          scenesRef?.current.push(scene);
        
      }, [models]);
  return (
    <div ref={sceneContainerRef} style={{ width: '200px', height: '200px' }} />
  )
}

export default Scene