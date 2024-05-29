// פונקציה ליצירת קוביות עם טקסטורות מפרוייקטים
function createProjectCube(textureUrl, position, description, githubUrl) {
  const texture = new THREE.TextureLoader().load(textureUrl);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(position.x, position.y, position.z);
  scene.add(cube);

  const div = document.createElement("div");
  div.className = "description";
  div.innerHTML = `
        <strong>${description}</strong><br>
        <a href="${githubUrl}" target="_blank">View on GitHub</a>
    `;
  document.body.appendChild(div);

  // Update position based on camera view
  function updateDescriptionPosition() {
    const vector = new THREE.Vector3(position.x, position.y, position.z);
    vector.project(camera);
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (vector.y * -0.5 + 0.5) * window.innerHeight;
    div.style.left = $;
    {
      x;
    }
    px;
    div.style.top = $;
    {
      y;
    }
    px;
  }

  updateDescriptionPosition();
  window.addEventListener("resize", updateDescriptionPosition);
  camera.addEventListener("change", updateDescriptionPosition);

  return cube;
}
