const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let currentGameCode = ""; // Code du jeu chargé dynamiquement

function startGame() {
  if(currentGameCode) {
    loadGameFromCode(currentGameCode);
  } else {
    alert("Aucun jeu sélectionné.");
  }
}

// Charger un jeu depuis Supabase
async function loadGamesList() {
  const { data, error } = await supabase.from("games").select("*");
  if(error) return console.error(error);

  const container = document.getElementById("gamesList");
  container.innerHTML = "";

  data.forEach(game => {
    const btn = document.createElement("button");
    btn.textContent = game.name;
    btn.onclick = () => {
      currentGameCode = game.code;
      loadGameFromCode(game.code);
    };
    container.appendChild(btn);
  });
}

// Au chargement
loadGamesList();

function changeSkin() {
  // Exemple : changer couleur du player (placeholder)
  const colors = ["red","blue","green","yellow","purple","orange"];
  ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
}
