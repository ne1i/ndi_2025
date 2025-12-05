// === CODE POUR LE TERMINAL (uniquement si les éléments existent) ===
const touchBtn = document.getElementById('btn-touch');
const mkdirBtn = document.getElementById('btn-mkdir');
const lsBtn = document.getElementById('btn-ls');
const backBtn = document.getElementById('btn-back');

const doc1Button = document.getElementById('doc1-btn');
const popup1 = document.getElementById('popup-doc1');
const doc2Button = document.getElementById('doc2-btn');
const popup2 = document.getElementById('popup-doc2');
const popupClose1 = document.getElementById('popup-close1');
const popupClose2 = document.getElementById('popup-close2');

const folderBtn = document.getElementById('folder-btn');
const doc1Btn = document.getElementById('doc1-btn');

const homeButtonsCommandes = document.querySelectorAll('#Commandes .HOME_content');
const folderButtonsCommandes = document.querySelectorAll('#Commandes .FOLDER_content');
const folderButtonsTerminal = document.querySelectorAll('#Terminal .folder');
const doc1Terminal = document.querySelectorAll('#Terminal .doc1');
const docsFolderTerminal = document.querySelectorAll('#Terminal .docs_folder');

function hide(list) {
    list.forEach(el => el.classList.add('hidden'));
}

function show(list) {
    list.forEach(el => el.classList.remove('hidden'));
}

function hideAllTerminal() {
    hide(folderButtonsTerminal);
    hide(doc1Terminal);
    hide(docsFolderTerminal);
}

// Vérifier si les éléments du terminal existent avant d'ajouter les event listeners
if (touchBtn && doc1Terminal.length > 0) {
    touchBtn.addEventListener('click', () => {
        show(doc1Terminal);
    });
}

if (mkdirBtn && folderButtonsTerminal.length > 0) {
    mkdirBtn.addEventListener('click', () => {
        show(folderButtonsTerminal);
    });
}

if (folderBtn && homeButtonsCommandes.length > 0 && folderButtonsCommandes.length > 0) {
    folderBtn.addEventListener('click', () => {
        hideAllTerminal();
        hide(homeButtonsCommandes);
        show(folderButtonsCommandes);
    });
}

if (lsBtn && docsFolderTerminal.length > 0) {
    lsBtn.addEventListener('click', () => {
        show(docsFolderTerminal);
    });
}

if (backBtn && homeButtonsCommandes.length > 0 && folderButtonsCommandes.length > 0) {
    backBtn.addEventListener('click', () => {
        show(homeButtonsCommandes);
        hide(folderButtonsCommandes);
        show(doc1Terminal);
        show(folderButtonsTerminal);
        hide(docsFolderTerminal);
        hide([backBtn]);
    });
}

if (doc1Button && popup1) {
    doc1Button.addEventListener('click', () => {
        popup1.classList.remove('hidden');
    });
}

if (doc2Button && popup2) {
    doc2Button.addEventListener('click', () => {
        popup2.classList.remove('hidden');
    });
}

// fermer le pop-up quand on clique sur le bouton ×
if (popupClose1 && popup1) {
    popupClose1.addEventListener('click', () => {
        popup1.classList.add('hidden');
    });
}

if (popupClose2 && popup2) {
    popupClose2.addEventListener('click', () => {
        popup2.classList.add('hidden');
    });
}


// === CODE POUR LES CARTES (uniquement si les éléments existent) ===
const p1 = document.querySelector(".Problème1");
const p2 = document.querySelector(".Problème2");
const p3 = document.querySelector(".Problème3");

// Solutions
const s1 = document.querySelector(".Solution1");
const s2 = document.querySelector(".Solution2");
const s3 = document.querySelector(".Solution3");

// Réponses
const r1 = document.getElementById("reponse1");
const r2 = document.getElementById("reponse2");
const r3 = document.getElementById("reponse3");

// Croix
const close1 = document.getElementById("close-reponse1");
const close2 = document.getElementById("close-reponse2");
// >>> pas de close3, normal (fin)

// Vérifier si les éléments des cartes existent
if (p1 && p2 && p3 && s1 && s2 && s3 && r1 && r2 && r3) {
    // Masquer tout
    function hideAll() {
        p1.classList.add("hidden");
        p2.classList.add("hidden");
        p3.classList.add("hidden");

        s1.classList.add("hidden");
        s2.classList.add("hidden");
        s3.classList.add("hidden");

        r1.classList.add("hidden");
        r2.classList.add("hidden");
        r3.classList.add("hidden");
    }

    // Afficher problème 1 au début
    hideAll();
    p1.classList.remove("hidden");
    s1.classList.remove("hidden");

    // --- ÉTAPE 1 ---
    // Solutions du problème 1 → affichent réponse 1
    const solution1_1 = document.querySelector("#solution1_1");
    const solution1_2 = document.querySelector("#solution1_2");

    if (solution1_1 && solution1_2 && r1) {
        solution1_1.onclick = solution1_2.onclick = () => {
            r1.classList.remove("hidden");
        };
    }

    // Croix → fermer réponse + passer au problème 2
    if (close1 && r1 && p2 && s2) {
        close1.onclick = () => {
            r1.classList.add("hidden");

            hideAll();
            p2.classList.remove("hidden");
            s2.classList.remove("hidden");
        };
    }

    // --- ÉTAPE 2 ---
    // Solutions du problème 2 → affichent réponse 2
    const solution2_1 = document.querySelector("#solution2_1");
    const solution2_2 = document.querySelector("#solution2_2");

    if (solution2_1 && solution2_2 && r2) {
        solution2_1.onclick = solution2_2.onclick = () => {
            r2.classList.remove("hidden");
        };
    }

    // Croix → fermer réponse + passer au problème 3
    if (close2 && r2 && p3 && s3) {
        close2.onclick = () => {
            r2.classList.add("hidden");

            hideAll();
            p3.classList.remove("hidden");
            s3.classList.remove("hidden");
        };
    }

    // --- ÉTAPE 3 ---
    // Solutions du problème 3 → affichent réponse 3
    const solution3_1 = document.querySelector("#solution3_1");
    const solution3_2 = document.querySelector("#solution3_2");

    if (solution3_1 && solution3_2 && r3) {
        solution3_1.onclick = solution3_2.onclick = () => {
            r3.classList.remove("hidden");
        };
    }
}
