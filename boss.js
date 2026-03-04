let boss;

function spawnBoss(scene){

  boss = new THREE.Mesh(
    new THREE.BoxGeometry(5,8,5),
    new THREE.MeshStandardMaterial({color: 0xff0000})
  );

  boss.position.set(100,5,100);
  boss.health = 500;

  scene.add(boss);
}

function damageBoss(amount){
  if(!boss) return;

  boss.health -= amount;

  if(boss.health <= 0){
    alert("🔥 BOSS VAINCU !");
    scene.remove(boss);
    gainXP(200);
  }
}

function bossAI(player){
  if(!boss) return;

  boss.position.x += (player.position.x - boss.position.x)*0.01;
  boss.position.z += (player.position.z - boss.position.z)*0.01;
}
