const windows = document.getElementById("windows");

for (let child of windows.children) {
    child.addEventListener("mouseenter", () => {
        for (let sibling of windows.children) {
            if (sibling !== child) {
                sibling.classList.add("opacity-0", "pointer-events-none");
            }
        }
    });

    child.addEventListener("mouseleave", () => {
        for (let sibling of windows.children) {
            if (sibling !== child) {
                sibling.classList.remove("opacity-0", "pointer-events-none");
            }
        }
    });
}
