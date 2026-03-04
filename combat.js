let playerLevel = 1;
let xp = 0;

function attack(scene, player) {

  const projectile = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshStandardMaterial({color: 0xff9900})
  );

  projectile.position.copy(player.position);
  scene.add(projectile);

  let speed = 0.5;

  function move() {
    projectile.position.z -= speed;

    if (projectile.position.z < -200) {
      scene.remove(projectile);
      return;
    }

    requestAnimationFrame(move);
  }

  move();
}

function gainXP(amount) {
  xp += amount;

  if (xp >= playerLevel * 50) {
    xp = 0;
    playerLevel++;
    alert("LEVEL UP ! Niveau " + playerLevel);
  }

  localStorage.setItem("toblocks_level", playerLevel);
}
function attack(scene, player){

  if(boss && player.position.distanceTo(boss.position) < 10){
    damageBoss(20);
  }
}
