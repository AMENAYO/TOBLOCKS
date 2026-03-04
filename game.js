let currentUser = null;

// =======================
// SYSTEME COMPTES LOCAL
// =======================

function register() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("toblocks_users")) || {};

  if (users[username]) {
    alert("Utilisateur existe !");
    return;
  }

  users[username] = {
    password: password,
    x: 0,
    y: 2,
    z: 0,
    level: 1,
    skin: "default"
  };

  localStorage.setItem("toblocks_users", JSON.stringify(users));
  alert("Compte créé !");
}

function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("toblocks_users")) || {};

  if (!users[username] || users[username].password !== password) {
    alert("Erreur login");
    return;
  }

  currentUser = username;
  document.getElementById("menu").style.display = "none";
  startGame(users[username]);
}

// =======================
// JEU 3D
// =======================

function startGame(data) {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("game")});
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 20, 10);
  scene.add(light);

  camera.position.z = 10;

  // Île stylée
  const island = new THREE.Mesh(
    new THREE.BoxGeometry(50, 2, 50),
    new THREE.MeshStandardMaterial({color: 0x2ecc71})
  );
  scene.add(island);

  // Eau
  const water = new THREE.Mesh(
    new THREE.BoxGeometry(200, 1, 200),
    new THREE.MeshStandardMaterial({color: 0x3498db})
  );
  water.position.y = -2;
  scene.add(water);

  // Joueur
  const player = new THREE.Mesh(
    new THREE.BoxGeometry(1,2,1),
    new THREE.MeshStandardMaterial({color: 0xff0000})
  );
  player.position.set(data.x, data.y, data.z);
  scene.add(player);

  document.addEventListener("keydown", (e)=>{
    if(e.key==="z") player.position.z -= 1;
    if(e.key==="s") player.position.z += 1;
    if(e.key==="q") player.position.x -= 1;
    if(e.key==="d") player.position.x += 1;

    savePlayer(player);
  });

  function savePlayer(p){
    let users = JSON.parse(localStorage.getItem("toblocks_users"));
    users[currentUser].x = p.position.x;
    users[currentUser].y = p.position.y;
    users[currentUser].z = p.position.z;
    localStorage.setItem("toblocks_users", JSON.stringify(users));
  }

  function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}
generateWorld(scene);
createUI();

document.addEventListener("click", ()=>{
  attack(scene, player);
});

document.addEventListener("keydown",(e)=>{
  if(e.key==="Shift"){
    attack(scene, player);
  }
});
