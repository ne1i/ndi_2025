const alphabet = "abcdefghijklmnopqrstuvwxyz#1234567890";
const h1Element = document.getElementById("corpo");
const corpos = [
    "Zindows",
    "closed-source",
    "planned obsolescence",
];
let corposIndex = 0;

let previousTimestamp = null;
let elapsedSeconds = 0;
const secondsPerCharacterReveal = 0.1;
let framesToSkip = 2;
let randomChangeCounter = 0;

// Texte caché dynamique
let hiddenText = corpos[corposIndex];

// Fonction d'animation
const animationLoop = (currentTimestamp) => {
    if (!previousTimestamp) previousTimestamp = currentTimestamp;
    const secondsSinceLastFrame = (currentTimestamp - previousTimestamp) / 1000;
    previousTimestamp = currentTimestamp;

    elapsedSeconds += secondsSinceLastFrame;
    const charactersToReveal = Math.min(Math.floor(elapsedSeconds / secondsPerCharacterReveal), hiddenText.length);

    if (randomChangeCounter > 0) {
        randomChangeCounter -= 1;
    } else {
        randomChangeCounter = framesToSkip;
        let animatedText = "";
        for (let i = 0; i < hiddenText.length; i++) {
            if (i < charactersToReveal) {
                animatedText += hiddenText[i];
            } else {
                animatedText += alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
        // Si le texte est "planned obsolescence", ajouter <br>
        h1Element.innerText = animatedText;
    }

    if (charactersToReveal < hiddenText.length) {
        window.requestAnimationFrame(animationLoop);
    } else {
        // Texte final
        h1Element.innerText = hiddenText;
    }
};

// Fonction pour démarrer/restart l'animation
const startAnimation = () => {
    hiddenText = corpos[corposIndex];
    corposIndex = (corposIndex + 1) % corpos.length;

    previousTimestamp = null;
    elapsedSeconds = 0;
    randomChangeCounter = 0;
    window.requestAnimationFrame(animationLoop);
};

// Lancer la première animation
startAnimation();

// Redémarrer automatiquement toutes les 3 secondes
setInterval(startAnimation, 3000);
