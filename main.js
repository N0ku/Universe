import "./style.css";

import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#app"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.SphereGeometry(15, 32, 16);

const texture = new THREE.TextureLoader().load(
  "textures/8081_earthlights10k.jpg"
);

const material = new THREE.MeshBasicMaterial({
  map: texture,
});

const earth = new THREE.Mesh(geometry, material);

scene.add(earth);

function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += 0.005;
  renderer.render(scene, camera);
}

animate();
