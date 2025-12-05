function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function justdoit() {
    await sleep(8000); // wait for 1 second
    window.location.replace("/zindows.html"); // redirect
}

justdoit();
