// Initialisation Supabase pour TOBLOCKS
const SUPABASE_URL = "https://cdtssgrgugrdiufqbdlm.supabase.co";
const SUPABASE_KEY = "sb_publishable_-bvOyCZ9qn2vNI5DRWpeeA_K9UqJ3GY";

// Création du client Supabase
const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ----- Fonctions comptes -----

// Créer un compte
async function register() {
  const email = prompt("Email:");
  const password = prompt("Mot de passe:");
  const { data, error } = await supabase.auth.signUp({ email, password });
  if(error) alert("Erreur : " + error.message);
  else alert("Compte créé ! Vérifie ton email.");
}

// Connexion
async function login() {
  const email = prompt("Email:");
  const password = prompt("Mot de passe:");
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if(error) alert("Erreur : " + error.message);
  else alert("Connecté !");
}

// Déconnexion
async function logout() {
  const { error } = await supabase.auth.signOut();
  if(error) alert("Erreur lors de la déconnexion : " + error.message);
  else alert("Déconnecté !");
}

// Vérifier l'utilisateur connecté
supabase.auth.onAuthStateChange((event, session) => {
  if(session) {
    console.log("Utilisateur connecté :", session.user.email);
  } else {
    console.log("Aucun utilisateur connecté");
  }
});
