import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const loadModels = async (modelPaths) => {
    const loader = new GLTFLoader();
    const models = [];

    for (const path of modelPaths) {
        try {
            const model = await loadModel(loader, path);
            models.push(model);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(models);
    return models;
}

const loadModel = (loader, path) => {
    return new Promise((resolve, reject) => {
        loader.load(
            '/model1.glb',
            (gltf) => {
                resolve(gltf.scene);
            },
            undefined,
            (error) => {
                reject(error);
            }
        );
    });
}

const _loadModels = async (paths: string[]): Promise<THREE.Object3D[]> => {
    const loader = new GLTFLoader();
    const loadModel = (path: string) => {
      return new Promise<THREE.Object3D>((resolve, reject) => {
        loader.load(
          path,
          (gltf) => {
            resolve(gltf.scene);
          },
          undefined,
          (error) => {
            reject(error);
          }
        );
      });
    };
  
    const models = await Promise.all(paths.map(loadModel));
    return models;
  };

export { loadModels, _loadModels };



