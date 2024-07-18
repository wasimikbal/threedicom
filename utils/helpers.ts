import * as THREE from 'three';

const createCPointMesh = (name, x, y, z) => {
    const geo = new THREE.SphereGeometry(0.1);
    const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.name = name;
    return mesh;
  };

export { createCPointMesh };