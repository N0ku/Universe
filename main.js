import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

const geometry = new THREE.SphereGeometry(16, 32, 16);

const texture = new THREE.TextureLoader().load("textures/earth.jpg");

const material = new THREE.MeshBasicMaterial({
  map: texture,
});

const earth = new THREE.Mesh(geometry, material);

const sunLight = new THREE.AmbientLight(0x404040, 1);

const canvas = document.getElementById("app");

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var targetMesh;

function onMouseClick(event) {
  raycaster.setFromCamera(mouse, camera);
  var isIntersected = raycaster.intersectObject(targetMesh);
  if (isIntersected) {
    console.log("Mesh clicked!");
  }
}

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
canvas.addEventListener("mouseclick", onMouseClick);
canvas.addEventListener("mousemove", onMouseMove);

scene.add(sunLight);
sunLight.position.set(0, 30, 0);

scene.add(earth);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += 0.002;

  controls.update();
  renderer.render(scene, camera);
}

animate();
