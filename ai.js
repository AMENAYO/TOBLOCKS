async function generateGame() {
  const description = prompt("Décris ton jeu :");

  if(!description) return;

  alert("L'IA génère votre jeu : " + description);

  // --- Étape 1 : Appel API OpenAI pour générer du code JS Phaser ---
  // Exemple (pseudo-code, remplace par ton endpoint OpenAI)
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer TON_OPENAI_KEY'
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {role: "system", content: "Tu es un moteur qui génère un jeu Phaser 2D complet en JavaScript."},
        {role: "user", content: `Crée un jeu en Phaser basé sur : ${description}. Renvoie uniquement le code JS.`}
      ],
      max_tokens: 1500
    })
  });

  const data = await response.json();
  const gameCode = data.choices[0].message.content;

  // --- Étape 2 : Stocker le jeu dans Supabase ---
  const user = supabase.auth.user();
  if(!user) { alert("Connecte-toi pour sauvegarder ton jeu."); return; }

  const { error } = await supabase.from("games").insert([
    { user_id: user.id, name: description, code: gameCode }
  ]);

  if(error) { alert("Erreur stockage : " + error.message); return; }

  alert("Jeu généré et sauvegardé ! Vérifie la liste des jeux.");

  // --- Étape 3 : Charger le jeu généré ---
  loadGameFromCode(gameCode);
}

// Fonction pour charger dynamiquement le jeu généré
function loadGameFromCode(code) {
  const script = document.createElement("script");
  script.textContent = code;
  document.body.appendChild(script);
}
