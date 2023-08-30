import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera2 = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.5, 100);

let camAtual = camera;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

camera2.position.setZ(50);
camera2.position.setX(-20);
camera2.position.setY(20);

renderer.render(scene, camAtual);

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xfff00f);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement)
const controls2 = new OrbitControls(camera2, renderer.domElement);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  controls.update();
  controls2.update();

  renderer.render(scene, camAtual);
}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'a':
      camAtual = camera;
      break;
    case 'b':
      camAtual = camera2;
      break;
}});
