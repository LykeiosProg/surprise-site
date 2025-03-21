let initialDays = 0;
let initialHours = 0;
let initialMinutes = 10;
let initialSeconds = 10;
let interval;

const timerElement = document.getElementById("timer");
const terminalElement = document.getElementById("terminal");
const terminalText = document.getElementById("terminal-text");
const errorMessage = document.getElementById("error-message");
const donateButton = document.getElementById("donate-button");

function formaterTemps(valeur) {
  return valeur.toString().padStart(2, "0");
}

function startTimer() {
  let lastTime = localStorage.getItem("end");

  if (!lastTime) {
    const now = Math.floor(Date.now() / 1000);
    lastTime = now + initialDays * 86400 + initialHours * 3600 + initialMinutes * 60 + initialSeconds;
    localStorage.setItem("end", lastTime);
  }

  interval = setInterval(() => {
    const now = Math.floor(Date.now() / 1000);
    const times = lastTime - now;

    if (times <= 0) {
      clearInterval(interval);
      timerElement.innerText = "00:00:00:00";
      lancerAnimation();
      return;
    }

    const days = Math.floor(times / 86400);
    const hours = Math.floor((times % 86400) / 3600);
    const minutes = Math.floor((times % 3600) / 60);
    const seconds = times % 60;

    timerElement.innerText = `${formaterTemps(days)}:${formaterTemps(hours)}:${formaterTemps(minutes)}:${formaterTemps(seconds)}`;
  }, 1000);
}

function lancerAnimation() {
  
  document.body.style.backgroundColor = "black";
  document.body.style.color = "#00ff00";

  
  document.getElementById("header").classList.add("hidden");
  timerElement.classList.add("hidden");

  
  terminalElement.classList.remove("hidden");

  
  const message = "Système compromis... Accès non autorisé détecté...";

  let index = 0;

  function ecrireTexte() {
    if (index < message.length) {
      terminalText.textContent += message[index];
      index++;
      setTimeout(ecrireTexte, 100); 
    } else {
      setTimeout(() => {
        afficherMessageErreur();
      }, 2000); 
    }
  }

  ecrireTexte();
}

function afficherMessageErreur() {
  terminalElement.classList.add("hidden");
  errorMessage.classList.remove("hidden");

  setTimeout(() => {
    errorMessage.classList.add("hidden");
    afficherBoutonAide();
  }, 3000); 
}

function afficherBoutonAide() {
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";

  document.getElementById("header").classList.remove("hidden");
  timerElement.classList.remove("hidden");
  donateButton.classList.remove("hidden");

  startTimer();
}

startTimer();


const donationSites = [
    "https://www.autisme-france.fr/faire-un-don",
    "https://donner.croix-rouge.fr/faire-un-don/~mon-don",
    "https://don.unicef.fr/don-ponctuel/~mon-don?_cv=1",
    "https://dons.restosducoeur.org/particulier/~mon-don?_cv=1",
    "https://faireundon.wwf.fr/don/~mon-don",
    "https://don.ligue-cancer.net/dons/~mon-don?ns_ira_cr_arg=IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNPth%2FQ3PMs%2Bjp2N37fLOzUcebNRlbjlOdRzKVH4vG%2F5qBtfHvm25p4tTcPIc8MNO2yhKrFOArYgvE876nQW0VAIOSQgk32CP%2FXl9vUHsWWfUEq3ShpPrVSRzBSgUt0hY4%3D&utm_source=LNCC&utm_medium=site&utm_campaign=DON&utm_content=&utm_term=BTN&_cv=1",
    "https://donner.fondationdesfemmes.org/8-mars-25/~mon-don?_cv=1",
    "https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=VKEN49F6GU4DA&source=url&ssrt=1742574334816",
    "https://www.tdah-france.fr/Don-solidaire.html",
    "https://dons.medecinsdumonde.org/soutien-mdm/~mon-don?ns_ira_cr_arg=IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyP5bj6LcyOw20IflkYNfZOnzSh%2BM6M7ybkzBPQnGg%2BAxihwlXe36%2BqRQP2uYhS4LeQB5ZJj0ibUrjJGwCffEK%2Bs&_gl=1%2A9yr2xn%2A_gcl_au%2AMjA2NjkwOTgxNC4xNzQyNTc0MTI0%2A_ga%2AMTQ5MDAzNjY4NC4xNzQyNTc0MTI0%2A_ga_CB79CPNHKN%2AMTc0MjU3NDEyNC4xLjAuMTc0MjU3NDEyNC42MC4wLjA.%2A_ga_8X5EY6GCM4%2AMTc0MjU3NDEyNC4xLjAuMTc0MjU3NDEyNC42MC4wLjE3Nzk4NjIwMTU.&_cv=1"
  ];
  
  
  function redirectToRandomSite() {
    const randomIndex = Math.floor(Math.random() * donationSites.length);
    const randomSite = donationSites[randomIndex];
    window.location.href = randomSite;
  }
  
  
  donateButton.onclick = redirectToRandomSite;