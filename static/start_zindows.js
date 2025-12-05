function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function justdoit() {
    await sleep(8000); // wait for 1 second
    window.location.replace("/zindows.html"); // redirect
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



async function startZindows() {
    if (getCookie("zindows") != "true") {
        setCookie("zindows", "false", 1);
    }

    if (getCookie("zindows") == "false") {

        setCookie("zindows", "true", 1)
        justdoit()
    }
}
startZindows();