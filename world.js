function generateLegendaryIslands(scene){

  const biomes = [
    {color: 0x2ecc71, height: 5}, // nature
    {color: 0xe67e22, height: 8}, // désert
    {color: 0x9b59b6, height: 12}, // mystique
    {color: 0x34495e, height: 15} // sombre
  ];

  for(let i=0;i<20;i++){

    let biome = biomes[Math.floor(Math.random()*biomes.length)];

    const island = new THREE.Mesh(
      new THREE.CylinderGeometry(20,30,biome.height,32),
      new THREE.MeshStandardMaterial({color: biome.color})
    );

    island.position.set(
      Math.random()*800-400,
      biome.height/2 - 10,
      Math.random()*800-400
    );

    scene.add(island);
  }
}
