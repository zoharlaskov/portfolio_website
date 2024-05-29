// script.js

// יצירת סצנה, מצלמה ורנדרר
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// הוספת תאורה
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// הוספת תאורה רכה
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// הוספת קרקע ושביל עם טקסטורות נעות
const groundTexture = new THREE.TextureLoader().load("grass_texture.jpg");
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(10, 10);
const groundMaterial = new THREE.MeshPhongMaterial({ map: groundTexture });
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const pathTexture = new THREE.TextureLoader().load("path_texture.jpg");
pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
pathTexture.repeat.set(1, 10);
const pathMaterial = new THREE.MeshPhongMaterial({ map: pathTexture });
const pathGeometry = new THREE.PlaneGeometry(4, 200);
const path = new THREE.Mesh(pathGeometry, pathMaterial);
path.position.y = 0.01; // To avoid z-fighting
path.rotation.x = -Math.PI / 2;
scene.add(path);

// הוספת חלקיקים
const particleTexture = new THREE.TextureLoader().load("particle.png");
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 1000;
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 200;
  positions[i * 3 + 1] = Math.random() * 10;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
}

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
const particleMaterial = new THREE.PointsMaterial({
  size: 0.5,
  map: particleTexture,
  blending: THREE.AdditiveBlending,
  depthTest: false,
  transparent: true,
});
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// הוספת מים
const waterGeometry = new THREE.PlaneGeometry(100, 100);
const water = new THREE.Water(waterGeometry, {
  textureWidth: 512,
  textureHeight: 512,
  waterNormals: new THREE.TextureLoader().load(
    "waternormals.jpg",
    function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }
  ),
  sunDirection: new THREE.Vector3(),
  sunColor: 0xffffff,
  waterColor: 0x001e0f,
  distortionScale: 3.7,
  fog: scene.fog !== undefined,
});
water.rotation.x = -Math.PI / 2;
water.position.y = -0.5;
scene.add(water);

// פונקציה ליצירת קוביות עם טקסטורות מפרוייקטים
function createProjectCube(textureUrl, position, description, githubUrl) {
  const texture = new THREE.TextureLoader().load(textureUrl);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(position.x, position.y, position.z);
  scene.add(cube);

  const div = document.createElement("div");
}
