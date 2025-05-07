// Initialisation IndexedDB
const db = new Dexie("PWA_Users");
db.version(1).stores({
  users: "++id,username,password"
});

// Enregistrer un Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

// Inscription
document.getElementById("registerForm").addEventListener("submit", async e => {
  e.preventDefault();
  const username = document.getElementById("reg_username").value;
  const password = document.getElementById("reg_password").value;

  const exists = await db.users.where("username").equals(username).first();
  if (exists) {
    alert("Utilisateur déjà existant !");
    return;
  }

  await db.users.add({ username, password });
  alert("Utilisateur enregistré en local !");
});

// Connexion
document.getElementById("loginForm").addEventListener("submit", async e => {
  e.preventDefault();
  const username = document.getElementById("login_username").value;
  const password = document.getElementById("login_password").value;

  const user = await db.users.where({ username, password }).first();

  if (user) {
    document.getElementById("message").textContent = "Connexion réussie (offline) !";
  } else {
    document.getElementById("message").textContent = "Identifiants invalides.";
  }
  
  
});
