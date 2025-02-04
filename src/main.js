import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, cube;
const cubelets = [];
const CUBELET_SIZE = 1;
const GAP = 0.05;

function init() {
  // Renderizador
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight - 40);

  // Creación de la escena
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  // Cámara
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);
  new OrbitControls(camera, renderer.domElement);

  // Iluminación
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  // Y añadimos al canvas
  document.body.appendChild(renderer.domElement);

  // Creamos un grupo para pintar todos los elementos desde un único objeto
  cube = new THREE.Group();
  scene.add(cube);

  // Y definimos los colores de las caras del cubo de Rubik
  const colors = {
    white: 0xffffff,
    red: 0xff0000,
    blue: 0x0000ff,
    orange: 0xffa500,
    green: 0x00ff00,
    yellow: 0xffff00
  };

  // E, igual que en el caso de Processing, pintamos los cubos de la misma forma
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        createCubelet(x, y, z, colors);
      }
    }
  }

  animate();
}

function createCubelet(x, y, z, colors) {
  // Creamos un cubo
  const geometry = new THREE.BoxGeometry(CUBELET_SIZE, CUBELET_SIZE, CUBELET_SIZE);

  // Y ponemos un material por cara
  const materials = Array(6).fill().map(() => new THREE.MeshBasicMaterial());

  // Y, por cada cara, pintamos los colores (innecesariamente igual que los oficiales)
  materials[0].color.setHex(colors.white);
  materials[1].color.setHex(colors.yellow);
  materials[2].color.setHex(colors.red);
  materials[3].color.setHex(colors.orange);
  materials[4].color.setHex(colors.blue);
  materials[5].color.setHex(colors.green);

  // Añadimos la textura / material al cubo
  const cubelet = new THREE.Mesh(geometry, materials);
  // Y lo colocamos el cubo en su sitio
  cubelet.position.set(
    (x - 1) * (CUBELET_SIZE + GAP),
    (y - 1) * (CUBELET_SIZE + GAP),
    (z - 1) * (CUBELET_SIZE + GAP)
  );

  // Y lo añadimos al grupo del cubo
  cube.add(cubelet);
  cubelets.push(cubelet);
}

// Array conteniendo el índice de los cubos en base a la columna
const columnsX = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24, 25, 26]
]

// Array conteniendo el índice de los cubos en base a la columna
const columnsZ = [
  [2, 5, 8, 11, 14, 17, 20, 23, 26],
  [1, 4, 7, 10, 13, 16, 19, 22, 25],
  [0, 3, 6, 9, 12, 15, 18, 21, 24],
]

// Función para rotar las columnas del eje X
function rotateColumnX(col, direction) {
  for (const cubeIndex of columnsX[col]) {
    const currCube = cubelets[cubeIndex]
    currCube.rotateX(direction * 90 * Math.PI / 180)
  }
}

// Función para rotar als columnas del eje Y
function rotateColumnZ(col, direction) {
  for (const cubeIndex of columnsZ[col]) {
    const currCube = cubelets[cubeIndex]
    currCube.rotateZ(direction * 90 * Math.PI / 180)
  }
}

// Añadimos event handlers a las imágenes para realizar los cambio
document.getElementById("x0").addEventListener("click", () => {
  rotateColumnX(0, 1)
})

document.getElementById("x1").addEventListener("click", () => {
  rotateColumnX(1, 1)
})

document.getElementById("x2").addEventListener("click", () => {
  rotateColumnX(2, 1)
})

document.getElementById("-x0").addEventListener("click", () => {
  rotateColumnX(0, -1)
})

document.getElementById("-x1").addEventListener("click", () => {
  rotateColumnX(1, -1)
})

document.getElementById("-x2").addEventListener("click", () => {
  rotateColumnX(2, -1)
})



document.getElementById("y0").addEventListener("click", () => {
  rotateColumnZ(0, 1)
})

document.getElementById("y1").addEventListener("click", () => {
  rotateColumnZ(1, 1)
})

document.getElementById("y2").addEventListener("click", () => {
  rotateColumnZ(2, 1)
})

document.getElementById("-y0").addEventListener("click", () => {
  rotateColumnZ(0, -1)
})

document.getElementById("-y1").addEventListener("click", () => {
  rotateColumnZ(1, -1)
})

document.getElementById("-y2").addEventListener("click", () => {
  rotateColumnZ(2, -1)
})


function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


init();