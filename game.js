const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let currentGameCode = "";

// Lancer le jeu sélectionné
function startGame() {
  if(currentGameCode) {
    const old = document.getElementById("dynamicGame");
    if(old) old.remove();

    const script = document.createElement("script");
    script.id = "dynamicGame";
    script.textContent = currentGameCode;
    document.body.appendChild(script);
  } else alert("Aucun jeu sélectionné.");
}

// Charger la liste des jeux depuis Supabase
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
      startGame();
    };
    container.appendChild(btn);
  });
}

loadGamesList();

// Changer skin (placeholder)
function changeSkin() {
  const colors = ["red","blue","green","yellow","purple","orange"];
  ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
}
