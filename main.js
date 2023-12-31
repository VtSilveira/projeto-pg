import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let ballRotation = 0; // Inicializa a rotação da bola em radians (0 radianos)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera2 = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.5, 3000);

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
// const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const material = new THREE.RawShaderMaterial( {
  uniforms: {
    time: { value: 1.0 }
  },
  vertexShader: document.getElementById( 'vertexShader' ).textContent,
  fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
  side: THREE.DoubleSide,
  transparent: true
} );

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);


// Carregar a textura usando THREE.TextureLoader

const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);

const cubeTexture = new THREE.TextureLoader().load('bloco.jpg');

const cubeMaterial = new THREE.MeshBasicMaterial({
  map: cubeTexture,
  color: new THREE.Color(0.35, 0.35, 0.35), // Cor básica do material
  emissive: new THREE.Color(1, 1, 1) // Emissão (brilho) do material
});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

cube.position.set(0, 30, 0);

scene.add(cube);


// Cria um grupo para a bola de futebol
const soccerBallGroup = new THREE.Group();

// Cria uma geometria esférica
const ballGeometry = new THREE.SphereGeometry(3, 32, 32);

// Carrega uma textura para a bola de futebol (substitua 'soccer_texture.jpg' pelo caminho da sua textura)
const soccerTexture = new THREE.TextureLoader().load('soccer_texture.jpg');

// Cria um material com a textura carregada
const ballMaterial = new THREE.MeshBasicMaterial({ map: soccerTexture });

// Cria a bola usando a geometria e o material
const soccerBall = new THREE.Mesh(ballGeometry, ballMaterial);

const ballPosition = new THREE.Vector3(20, 20, 0); // Posição inicial da bola


// Adiciona a bola ao grupo
soccerBallGroup.add(soccerBall);

// Posiciona a bola no espaço 3D
soccerBallGroup.position.set(20, 3, 0);

// Adiciona o grupo da bola à cena
scene.add(soccerBallGroup);


const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(0, 10, 0);

scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
const controls2 = new OrbitControls(camera2, renderer.domElement);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

let torusX = -20;
let torusY = 15;
let torusZ = 0;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  torus.position.set(torusX, torusY, torusZ);

  cube.rotation.y +=0.005; 

  controls.update();
  controls2.update();

  // Atualize a rotação da bola (aumente o ângulo em radians a cada quadro)
  const rotationSpeed = 0.01; // Ajuste a velocidade de rotação conforme necessário
  ballRotation += rotationSpeed;

  // Aplique a rotação à bola
  soccerBallGroup.rotation.set(0, ballRotation, 0);

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
    case 'ArrowUp':
      torusY += 0.5;
      break;
    case 'ArrowDown':
      torusY -= 0.5;
      break;
    case 'ArrowLeft':
      torusX -= 0.5;
      break;
    case 'ArrowRight':
      torusX += 0.5;
      break;
  }
});
