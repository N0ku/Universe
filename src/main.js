import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLightHelper } from "three";

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

/* EARTH -S */

function CreateEarth() {
  const geometry = new THREE.SphereGeometry(100, 62, 32);

  const texture = new THREE.TextureLoader().load("textures/day.jpg");
  const normal = new THREE.TextureLoader().load(
    "textures/8k_earth_normal_map.tif"
  );

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    color: 0x4287f5,
  });

  const earth = new THREE.Mesh(geometry, material);
  return earth;
}

/* EARTH -E */

/* MOON -S */

function CreateMoon() {
  const geometry = new THREE.SphereGeometry(2, 32, 16);

  const texture = new THREE.TextureLoader().load("textures/8k_moon.jpg");

  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });

  const moon = new THREE.Mesh(geometry, material);

  moon.name = "moon";

  return moon;
}

/* MOON -E */

const earthLight = new THREE.AmbientLight(0x404040, 0.5);
const sun = new THREE.DirectionalLight(0x404040, 12); // white 0x404040

const canvas = document.getElementById("app");

scene.add(earthLight);
scene.add(sun);

sun.position.set(100, 0, 0);
earthLight.position.set(0, 0, 0);

let earth = CreateEarth();
let moon = CreateMoon();

if (scene.getObjectByName("moon")) {
  console.log("true");
}
scene.add(earth);
/* earth.add(moon); */

const size = 1000;
const divisions = 100;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += 0.002;
  moon.rotation.y = Math.PI / 2;

  controls.update();
  renderer.render(scene, camera);
}

animate();
