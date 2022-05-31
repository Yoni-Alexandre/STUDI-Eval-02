/* Selection des élèments dans le DOM */
const resultatJ1 = document.getElementById('resultat-0');
const resultatJ2 = document.getElementById('resultat-1');
const enCoursJ1 = document.getElementById('enCours-0');
const enCoursJ2 = document.getElementById('enCours-1');
const modalGagnant = document.getElementById('boite-de-dialogue');
const deDOM = document.querySelector('.img-de');
const btnNouvellePartie = document.querySelector('.btn-nouvelle-partie');
const btnLancer = document.querySelector('.btn-lancer');
const btnRetenir = document.querySelector('.btn-retenir');
const joueur1 = document.querySelector('.joueur-0');
const joueur2 = document.querySelector('.joueur-1');

/* déclaration des varaiables qui serviront à initialiser le resultat à zéro */
let resultatEnCours;
let joueurActif;
let resultat;
let enJeu;
let visible = false;

/* ------------------------------------------------------ */
/* FONCTION : pour la boite de dialogue du joueur gagnant */
/* ------------------------------------------------------ */
const boiteDeDialogue = () => {
  if(visible) {
    modalGagnant.style.visibility = modalGagnant.style.visibility === 'visible' ? 'hidden' : 'visible';
    musiqueGagnant();
  } else {
    modalGagnant.style.visibility = modalGagnant.style.visibility === 'visible' ? 'hidden' : 'visible';
  }
}

/* --------------------------------------------------- */
/* FONCTION : pour la personalisation du nom du joueur */
/* --------------------------------------------------- */
let joueur1nom = "Joueur 1";
let joueur2nom = "Joueur 2";
let nombreDeCaractereMin = 3;
let nombreDeCaractereMax = 10;
let verificationDeNom = false;

const changementDeNom = () => {

  joueur1nom = prompt('Joueur 1, Tapez votre nom en 3 et 10 caractères');
  joueur2nom = prompt('Joueur 2, Tapez votre nom en 3 et 10 caractères');

  if (joueur1nom.length > nombreDeCaractereMax || joueur1nom.length < nombreDeCaractereMin || joueur2nom.length > nombreDeCaractereMax || joueur2nom.length < nombreDeCaractereMin) {

    /* ------------- */
    /* DEBUT : DEBUG */
    /* ------------- */
    console.log('Nom inadapté, merci de le retapez')
    /* ------------- */
    /* FIN  :  DEBUG */
    /* ------------- */

    verificationDeNom = true;

    while (verificationDeNom) {
      joueur1nom = prompt('Joueur 1, changez votre nom');
      if (joueur1nom.length > nombreDeCaractereMax || joueur1nom.length < nombreDeCaractereMin || joueur2nom.length > nombreDeCaractereMax || joueur2nom.length < nombreDeCaractereMin) {
        
        /* ------------- */
        /* DEBUT : DEBUG */
        /* ------------- */
        console.log('Nom inadapté, merci de le retapez')
        /* ------------- */
        /* FIN  :  DEBUG */
        /* ------------- */

        verificationDeNom = true;
      } else {
        verificationDeNom = false;
      }
    }
  }
  j1nUpperCase = joueur1nom.toUpperCase();
  j2nUpperCase = joueur2nom.toUpperCase();
  document.getElementById('nomJoueur1').textContent = j1nUpperCase;
  document.getElementById('nomJoueur2').textContent = j2nUpperCase;
}

/* ---------------------------------- */
/* FONCTION : pour la musique de fond */
/* ---------------------------------- */
const musiqueStart = () => {
  const mStart = new Audio('/musique/BRO-Dice-teleportation-sound-effect.mp3');
  mStart.play();
};

const musiqueGagnant = () => {
  const mStart = new Audio('/musique/BRO-Dice-FinalFantasy-gagnant.mp3');
  mStart.play();
};

/* --------------------------------------------------------------- */
/* FONCTION : Initilisation lors d'une fin ou d'un reset de partie */
/* --------------------------------------------------------------- */
const initialisationDeLaPartie = () => {
  resultatJ1.textContent = 0;
  resultatJ2.textContent = 0;
  enCoursJ1.textContent = 0;
  enCoursJ2.textContent = 0;
  /* Comme nous ne savons pas quel joueur est actif à la fin du jeu on réinitialise Les animations de couleur */
  joueur1.classList.remove('JoueurGagnant');
  joueur2.classList.remove('JoueurGagnant');
  joueur1.classList.remove('joueurActif1');
  joueur2.classList.remove('joueurActif2');
  /* Initialisation du score à zéro */
  resultatEnCours = 0;
  joueurActif = 0;
  resultat = [0,0];
  enJeu = true;
  
  /* FONCTIONS : Interactive */
  changementDeNom();
  musiqueStart();
  modalGagnant.style.visibility = 'hidden';
}

/* Initialisation de la partie */
boiteDeDialogue();
initialisationDeLaPartie();


/* ------------------------------- */
/* FONCTION : Changement de joueur */
/* ------------------------------- */
const switchPlayer = () => {
  document.getElementById(`enCours-${joueurActif}`).textContent = 0;
  /* Opérateur ternaire, le joueur actif est égal à 0 ? si oui il prend la valeur '1' : sinon il prend la valeur '0' */
  joueurActif = joueurActif === 0 ? 1 : 0;
  resultatEnCours = 0;
  /* Basculement vers la classe joueurActif pour afficher visuellement le changement de joueur */
  joueur1.classList.toggle('joueurActif1');
  joueur2.classList.toggle('joueurActif2');
};

/* --------------- */
/* BOUTON : LANCER */
/* --------------- */
/* Fonctionalités du Lancé de dés */
btnLancer.addEventListener('click', () => {
  if(enJeu) {
    /* Générer un nombre aléatoire */
    /* Math.random() crée un nombre entre 0 et 0.99... que l'on multipliera par 6 (les 6 faces de dé) et ajoût de math.trunc pour arrondir chaque valeur à des nombres entiers en tronquant les décimales*/
    /* A ce stade les valeurs seront comprises entre 1 et 5 */
    /* Ajout de + 1  pour faire 6 */
    const deAleatoire = Math.trunc(Math.random() * 6) + 1;
    /* Lier les images de dés aux nombres aléatoires */
    deDOM.src = `images/BRO-Dice-${deAleatoire}.png`;
    /* Vérifier si le lancé de dé est 1, si oui passer à l'autre joueur */
    if (deAleatoire !== 1) {
      /* Ajouter le résultat du dé au score actuel */
      resultatEnCours = resultatEnCours + deAleatoire;
      document.getElementById(`enCours-${joueurActif}`).textContent = resultatEnCours;
    } else {
      /* Passer à l'autre joueur */
        switchPlayer();
      }
    }
  }
);

/* ---------------- */
/* BOUTON : RETENIR */
/* ---------------- */
btnRetenir.addEventListener('click', () => {
  if(enJeu) {
    /* Ajout du résultat courant pour le joueur actif */
    resultat[joueurActif] += resultatEnCours;
    document.getElementById(`resultat-${joueurActif}`).textContent = resultat[joueurActif];
    /* Vérifier que le resultat est >= 100 */
    if(resultat[joueurActif] >= 100){
      /* Si la condition est vraie alors le jeu est fini */
      enJeu = false;
      document.querySelector(`.joueur-${joueurActif}`).classList.add('JoueurGagnant');
      document.querySelector(`.joueur-${joueurActif}`).classList.remove('joueurActif1');
      document.querySelector(`.joueur-${joueurActif}`).classList.remove('joueurActif2');
      visible = true;
      boiteDeDialogue();
    } else {
        /* Si la condition est fausse alors on change de joueur */
        switchPlayer();
      }
    }
  }
);

/* ------------------------ */
/* BOUTON : NOUVELLE PARTIE */
/* ------------------------ */
/* Réinitialisation de tous les résultats de tous les joueurs avec le boutton "Nouvelle partie" */
btnNouvellePartie.addEventListener('click', () => {
  initialisationDeLaPartie();
});
