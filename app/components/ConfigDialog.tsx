'use client'
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const ConfigDialog = ({ isOpen, onClose}) => {

    const dialogRef = useRef(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [model, setModel] = useState<THREE.Group | null>(null);

    useEffect(() => {
        if(!dialogRef.current) return;
        const dialog: HTMLDialogElement = dialogRef.current;
        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    useEffect(() => {
        if(!canvasRef.current) return;
        const canvas: HTMLCanvasElement = canvasRef.current;
        const bannerSize = { width: canvas.clientWidth, height: canvas.clientHeight }
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, bannerSize.width / bannerSize.height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
        renderer.setSize(bannerSize.width, bannerSize.height);
        renderer.setPixelRatio(window.devicePixelRatio);

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


    }, [canvasRef]);

    return (
        <dialog ref={dialogRef} className='dialog'>
            <canvas ref={canvasRef} className='dialog-canvas'></canvas>
            <button className='dialog-close-button' onClick={onClose}>x</button>
            {(!model) && <h1>Loading ...</h1>}
        </dialog>
    );
};

export default ConfigDialog;
