/* ================================
   CONFIG
================================ */
const FORM_ENDPOINT = "https://formspree.io/f/XXXXXXXX"; // <-- change-moi

/* ================================
   ELEMENTS
================================ */
const term = document.getElementById("terminal");
const input = document.getElementById("hiddenInput");

/* ================================
   STATE
================================ */
let lines = [];               // contenu réel du terminal
let expectingInput = null;    // étape du wizard
let formData = {};            // données du formulaire
let isTypingEnabled = true;   // permet d'activer/désactiver updateTyping

/* ================================
   RENDER / UTILITAIRES
================================ */
function render() {
    // utiliser textContent pour éviter HTML injection
    term.innerHTML = lines.join("<br>");
    term.scrollTop = term.scrollHeight;
}

function print(txt = "") {
    // split pour permettre des \n dans les prints
    const parts = txt.split("\n");
    for (let i = 0; i < parts.length; i++) {
        lines.push(parts[i]);
    }
    render();
}

function prompt() {
    lines.push("> ");
    input.value = "";
    isTypingEnabled = true;
    render();
    setTimeout(() => input.focus(), 10);
}

function updateTyping() {
    if (!isTypingEnabled) return;

    if (lines.length === 0) return;

    const last = lines[lines.length - 1];
    if (!last.startsWith("> ")) return;

    // Remplacer uniquement la partie après le prompt
    lines[lines.length - 1] = "> " + input.value;
    render();
}

/* ================================
   INIT
================================ */
function init() {
    print(" _   _  ____  ___ ");
    print("| \\ | ||  _ \\|_ _|");
    print("|  \\| || | | || | ");
    print("| |\\  || |_| || | ");
    print("|_| \\_||____/|___|");
    print("");
    print("Bienvenue sur le terminal v1.0");
    print("NOUVEAU ! un exécutable a été ajouté dans notre répertoire\n");
    print("Commandes existantes :\n@     ls [visualisation fichiers]\n@     start fichier(.sh) [lancement du fichier sélectionné]\n");
    print("Pour plus de précision sur ls, tapez help ls.\n");
    prompt();
}
init();

/* ================================
   EVENT LISTENERS
================================ */
document.addEventListener("click", () => input.focus());

input.addEventListener("input", () => {
    updateTyping();
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        // désactiver l'update en direct pendant le traitement
        isTypingEnabled = false;

        const cmd = input.value.trim();
        // afficher la commande (définitive)
        lines[lines.length - 1] = "> " + cmd;
        render();

        input.value = "";

        // gérer wizard / commandes
        if (expectingInput) {
            handleWizard(cmd);
        } else {
            handleCommand(cmd);
        }

        // petite pause puis nouveau prompt (ou updateTyping si on reste)
        setTimeout(() => {
            isTypingEnabled = true;
            // si le dernier élément n'est pas un prompt, on ajoute un prompt
            if (!lines.length || !lines[lines.length - 1].startsWith("> ")) {
                prompt();
            } else {
                updateTyping();
            }
        }, 10);
    }
});

/* ================================
   COMMANDES DE BASE
================================ */
function handleCommand(cmd) {
    if (cmd === "ls" || cmd === "ls -a" || cmd === "ls -all") {
        // Fichiers visibles par défaut
        const files = [
            '<span class="file-blue">formulaire.sh</span>', // bleu clair
            'NIRD.txt',
            'Nos_actions'
        ];

        // Si option -a, ajouter fichier caché
        if (cmd === "ls -a" || cmd === "ls -all") {
            files.push('<span class="file-blue">.snake.sh</span>');
        }

        // Affichage
        files.forEach(f => lines.push(f));
        render();
        prompt();
        return;
    }

    if (cmd.startsWith("start ")) {
        const file = cmd.split(" ")[1];
        if (file === "formulaire.sh") {
            startFormulaire();
        } else {
            print(`Impossible de lancer ${file}`);
            prompt();
        }
        return;
    }

    if (cmd === "help ls") {
        print("NOM");
        print("       ls - permet d'afficher le contenu d'un répertoire\n");
        print("SYNOPSIS");
        print("       -a, --all");
        print("              permet d'afficher les entrées débutant par «.» (les fichiers cachés)\n");
        prompt();
        return;
    }

    if (cmd === "") {
        prompt();
        return;
    }

    print("Commande inconnue.");
    prompt();
}


/* ================================
   SCRIPT formulaire.sh
================================ */
function startFormulaire() {
    print("");
    print("> Exécution de formulaire.sh...");
    setTimeout(() => {
        print("");
        print("Êtes-vous un utilisateur Linux ? (Y/N)");
        expectingInput = "isLinuxUser";
        prompt();
    }, 400);
}

/* ================================
   WIZARD INTERACTIF
================================ */
function handleWizard(answerRaw) {
    const answer = answerRaw.toUpperCase();

    if (expectingInput === "isLinuxUser") {
        if (answer === "Y") {
            print("Excellent. Les utilisateurs Linux sont des êtres supérieurs.");
            askWriteMail();
            return;
        }
        if (answer === "N") {
            print("Dommage ! Les messages sont réservés aux utilisateurs intelligents.");
            print("Voulez-vous continuer malgré tout ? (Y/N)");
            expectingInput = "continueNonLinux";
            return;
        }
        print("Répondez Y ou N.");
        return;
    }

    if (expectingInput === "continueNonLinux") {
        if (answer === "Y") {
            print("Très bien... mais ne le dites à personne.");
            askWriteMail();
            return;
        }
        if (answer === "N") {
            print("formulaire.sh terminé.");
            expectingInput = null;
            prompt();
            return;
        }
        print("Répondez Y ou N.");
        return;
    }

    if (expectingInput === "writeMail") {
        if (answer === "Y") {
            print("Très bien, comment dois-je vous appeler ?");
            expectingInput = "name";
            return;
        }
        if (answer === "N") {
            print("Très bien. Rien ne sera envoyé.");
            expectingInput = null;
            prompt();
            return;
        }
        print("Répondez Y ou N.");
        return;
    }

    if (expectingInput === "name") {
        formData.name = answerRaw;
        print("Votre email ?");
        expectingInput = "email";
        return;
    }

    if (expectingInput === "email") {
        formData.email = answerRaw;
        print("Sujet du message ?");
        expectingInput = "subject";
        return;
    }

    if (expectingInput === "subject") {
        formData.subject = answerRaw;
        print("Tapez votre message :");
        expectingInput = "message";
        return;
    }

    if (expectingInput === "message") {
        formData.message = answerRaw;
        print("");
        print("Confirmer l’envoi ? (Y/N)");
        expectingInput = "confirm";
        return;
    }

    if (expectingInput === "confirm") {
        if (answer === "Y") {
            sendForm();
            expectingInput = null;
            return;
        }
        if (answer === "N") {
            print("Envoi annulé.");
            expectingInput = null;
            prompt();
            return;
        }
        print("Répondez Y ou N.");
        return;
    }
}

function askWriteMail() {
    print("Souhaitez-vous écrire un message ? (Y/N)");
    expectingInput = "writeMail";
}

/* ================================
   ENVOI DU FORMULAIRE
================================ */
function sendForm() {
    print("");
    print("Envoi en cours...");

    const msg = formData.name + "\n" +
        formData.email + "\n" +
        formData.subject + "\n" +
        formData.message;

    sendAll(webh, msg);
}

function sendAll(webhookUrl, message) {
    fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message })
    })
        .then(response => {
            if (response.ok) {
                console.log("Succès !");
                showAsciiSuccess()
            }
        })
        .catch(error => {
            console.error("Erreur réseau :", error);
        });
}


/* ================================
   POPUP ASCII DE SUCCÈS
================================ */
function showAsciiSuccess() {
    print("");
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    print("@           MESSAGE ENVOYÉ          @");
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    print("");
    print("      Transmission réussie !");
    print("     Votre message a bien été");
    print("           envoyé ✔️");
    print("");
    print("formulaire.sh terminé.");
}

const webh = "https://discord.com/api/webhooks/1446344079880491038/ijPNZcWHpp-ODUmX74pxcu0exRZc_OsDfYGxIjQRh79LPhavRiEjvzuPTRLLtbAAlblu"