function closePopup1() {
  document.querySelector(".pp1").style.display = "none";

  document.querySelector(".pp2").style.display = "block";
  document.querySelector(".pp2").style.marginLeft = "20vw";
  document.querySelector(".pp2").style.marginTop = "20vh";
}

function closePopup2() {
  document.getElementById("close-a-2").setAttribute("onclick", "");
  document.getElementById("close-azd-2").setAttribute("onclick", "");

  document.querySelector(".planche1").style.display = "block";
  document.querySelector(".pp3").style.display = "block";
  document.querySelector(".pp3").style.marginLeft = "-30vw";
  document.querySelector(".pp3").style.marginTop = "-40vh";

  setTimeout(() => {
    document.querySelector(".pp4").style.display = "block";
    document.querySelector(".pp4").style.marginLeft = "20vw";
    document.querySelector(".pp4").style.marginTop = "-70vh";
  }, 5000);
}

function closePopup4() {
  document.querySelector(".pp4").style.display = "none";
  document.querySelector(".pp4").setAttribute("class", "noaznd");
  document.documentElement.style.cursor = "url(assets/curseur.png) 0 20, auto";
  document.querySelectorAll("button").forEach((button) => {
    button.style.cursor = "url(assets/curseur.png) 0 20, auto";
  });
  document.getElementById("planche1").setAttribute("onclick", "planche()");
}

function planche() {
  document.querySelector(".planche1").style.display = "none";
  document.querySelector(".pp3").style.display = "none";
  document.documentElement.style.cursor = "default";

  document.querySelectorAll("button").forEach((button) => {
    button.style.cursor = "default";
  });

  document.getElementById("close-a-2").setAttribute("onclick", "b()");
  document.getElementById("close-azd-2").setAttribute("onclick", "b()");
}

function b() {
  document.querySelector(".pp2").style.display = "none";
  document.querySelector(".pp6bis").style.display = "block";
}

function a() {
  effectGlitch(5);
  setTimeout(() => {
    document.querySelector(".azdoijijf").innerHTML = "<b>NON LE SUPER <span class='rainbow'>Arch Linux - Antivirus</span> ME SUPPRIME !</b>";
    document.querySelector(".akzjdajzjazdi").setAttribute("onclick", "aklzjd()");
  }, 5000);
}

function aklzjd() {
  document.querySelector(".pp6bis").style.display = "none";
  document.querySelector(".pp6").style.display = "block";
}

async function closePopup6() {
  document.querySelector(".pp6").style.display = "none";
  await sleep(1000);
  window.location.replace("/");
}











function spawnGlitch(pop) {
  const x = Math.floor(Math.random() * 70); // entre 0 et 99
  const y = Math.floor(Math.random() * 70); // entre 0 et 99

  const popup = document.getElementById(pop);
  popup.style.left = x + 2 + "vw";
  popup.style.top = y + 4 + "vh";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function effectGlitch(durre) {

  const popup = document.getElementById("popup");

  const startTime = Date.now();
  const endTime = startTime + durre * 1000;

  let i = 0;
  while (Date.now() < endTime) {
    const clone = popup.cloneNode(true);
    clone.style.display = "block";
    clone.id = "p" + i;
    document.body.appendChild(clone);
    spawnGlitch(clone.id);

    setTimeout(() => {
      clone.remove();
    }, 70);

    await sleep(1);
    i++;
  }
}