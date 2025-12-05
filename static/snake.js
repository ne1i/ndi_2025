const settings = document.getElementById("settings")
const snakeParent = document.getElementById("snake")

const sprite = "assets/settings.svg"
const arch = "assets/arch.svg"


let cells = [] // first one is head
let active
let direction // 0 bottom, 1 right, 2 up, 3 left
let lastEffectiveDirection // pour éviter un demi tour total
let size

let interval = 400 // ms
let expected

const rect = settings?.getBoundingClientRect()
const initX = rect?.x
const initY = rect?.y

const tileSize = 48
const maxX = Math.floor(window.innerWidth / tileSize)
const maxY = Math.floor(window.innerHeight / tileSize)

let pomme = { x: 7, y: 7 };
let futurCell = null;

document.addEventListener("keydown", e => checkKey(e));

function randint(max) {
    return Math.floor(Math.random() * max);
}

function checkKey(e) {
    if (!active) return

    switch (e.key) {
        case "ArrowDown":
            if (lastEffectiveDirection !== 2) direction = 0
            break
        case "ArrowRight":
            if (lastEffectiveDirection !== 1) direction = 3
            break
        case "ArrowUp":
            if (lastEffectiveDirection !== 0) direction = 2
            break
        case "ArrowLeft":
            if (lastEffectiveDirection !== 3) direction = 1
            break
    }
}

function draw() {
    if (snakeParent == null) return // prcq typescript lol

    snakeParent.innerHTML = "";
    let i = 0;

    for (const cell of cells) {
        i++;

        const x = tileSize * (cell.coords.x)
        const y = tileSize * (cell.coords.y)

        let el = document.createElement("img")
        el.src = sprite
        el.style.position = "absolute"
        el.style.right = x + "px"
        el.style.top = y + "px"
        if (i > 1) el.style.filter = "brightness(50%)";
        snakeParent.appendChild(el)
    }

    const x = tileSize * pomme.x;
    const y = tileSize * pomme.y;
    let el = document.createElement("img")
    el.src = arch;
    el.style.position = "absolute"
    el.style.right = x + "px"
    el.style.top = y + "px"
    el.width = tileSize
    el.height = tileSize
    snakeParent.appendChild(el);

}

function getHeadNext(current) {
    let delta = { x: 1, y: 0 }
    let ret = { x: 0, y: 0 }

    switch (direction) {
        case 0:
            delta = { x: 0, y: 1 }
            break
        case 1:
            delta = { x: 1, y: 0 }
            break
        case 2:
            delta = { x: 0, y: -1 }
            break
        case 3:
            delta = { x: -1, y: 0 }
            break
    }

    ret.x = current.x + delta.x
    ret.y = current.y + delta.y

    return ret
}

function start() {
    settings.classList.add("hidden");

    let head = { coords: { x: 0, y: 0 }, nextCoords: { x: 1, y: 0 } }

    cells.push(head)
    active = true
    direction = 0
    size = 1
    expected = Date.now() + interval
    setTimeout(tick, interval)
}

function move() {
    // update cells
    lastEffectiveDirection = direction;
    cells[0].coords = getHeadNext(cells[0].coords)
    for (let i = 1; i < size; i++) {
        cells[i].coords = { ...cells[i].nextCoords }
        cells[i].nextCoords = { ...cells[i - 1].coords }
    }

    // check mort
    for (let i = 1; i < size; i++) {
        if (
            cells[i].coords.x === cells[0].coords.x &&
            cells[i].coords.y === cells[0].coords.y
        ) {
            die()
        }
    }
    if (
        cells[0].coords.x > maxX ||
        cells[0].coords.y > maxY ||
        cells[0].coords.x < 0 ||
        cells[0].coords.y < 0
    ) {
        die()
    }

    if (futurCell) {

        size++;
        cells.push(futurCell);
        if (interval > 100)
            interval = interval * 0.95

    }

    // +1 score (next tick)
    if (cells[0].coords.x === pomme.x && cells[0].coords.y === pomme.y) {
        futurCell = { coords: cells[cells.length - 1].coords, nextCoords: cells[cells.length - 1].nextCoords }
        pomme.x = randint(maxX);
        pomme.y = randint(maxY);
    }
    else {
        futurCell = null;
    }



}

function die() {
    active = false
}

function tick() {
    var dt = Date.now() - expected // reajust

    move()
    draw()

    expected += interval

    // except if dead
    if (active) {
        setTimeout(tick, Math.max(0, interval - dt))
    }
}

const setting = document.getElementById("settings");
settings.addEventListener("click", () => {
    start();
})

const snake_button = document.getElementById("doc3-btn");
snake_button.addEventListener("click", () => {
    start();
})