function generateWorld(scene) {

  const size = 200; // immense map

  for (let x = -size; x < size; x += 10) {
    for (let z = -size; z < size; z += 10) {

      let height = Math.floor(Math.random() * 6) + 1;

      const island = new THREE.Mesh(
        new THREE.BoxGeometry(10, height, 10),
        new THREE.MeshStandardMaterial({color: 0x2ecc71})
      );

      island.position.set(x, height/2 - 5, z);
      scene.add(island);
    }
  }
}
