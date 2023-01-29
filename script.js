const filter = ["created", "edited"];
const baseUrl = "https://swapi.dev/api";

const menuBar = document.getElementById("menuBar");
const content = document.getElementById("content");

fetch(baseUrl)
    .then(response => {
        return response.json();
    })
    .then(data => {

        for (const key in data) {
            let menuItem = document.createElement("a");

            menuItem.innerText = key;
            menuItem.href = data[key];
            menuItem.className = "menuItem";
            menuItem.addEventListener("click", menuClick);

            menuBar.appendChild(menuItem);
        }
    })
    .catch(error => {
        console.log(error)
    });

async function menuClick(e) {
    e.preventDefault();

    document.querySelector(".active")?.classList.remove("active");
    e.target.classList.add("active");

    const data = await getData(e.target.href);
    showData(data);
};

async function getData(url) {
    const response = await fetch(url);
    return await response.json();
};

function showData(data) {

    content.innerHTML = "";

    data.results.forEach(item => {

        const card = document.createElement("div");
        card.className = "card";

        for (const [key, value] of Object.entries(item)) {

            try {
                if (typeof value === "object" || filter.includes(key) || value.includes("https")) {
                    continue;
                }
                else {
                    const p = document.createElement("p");
                    p.innerHTML = `${titleCase(key)}: ${value}`;

                    card.appendChild(p);
                    card.dataset.url = item.url;
                    card.addEventListener("click", () => {
                        showAllData(item);
                    });

                    content.appendChild(card);
                }
            } catch (error) {
                //console.log(error);
            }

        }
    });
};

async function showAllData(data) {

    clearContent(content);

    const card = document.createElement("div");
    card.className = "card";
    content.appendChild(card);

    for (const [key, value] of Object.entries(data)) {

        if (typeof value === "object") {

            const title = document.createElement("p");
            title.innerHTML = key;

            const indented = document.createElement("div");
            indented.className = "indented";
            indented.appendChild(title);

            for (const item in value) {

                const p = document.createElement("p");

                p.innerHTML = value[item];
                indented.appendChild(p);
            }

            card.appendChild(indented);
        }
        else {
            const p = document.createElement("p");
            p.innerHTML = `${key}: ${value}`;

            card.appendChild(p);
        }
    }
};

function clearContent(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

}

// STYLING/EXTRA
const titleCase = (s) =>
    s.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
        .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase());


window.onscroll = () => {
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    let scrollPercentRounded = Math.round(scrollPercent * 100);

    document.getElementById(
        "scroller"
    ).style.background = `linear-gradient(to bottom, rgb(249, 226, 43) ${scrollPercentRounded}%, #0000 ${scrollPercentRounded}%)`;
};

if (document.querySelector(".active") == null) {
    let p = document.createElement("p");
    p.innerHTML = "da da da da da da da da da da da da da da da da da!<br><br>da da da da da da da da da da da da da da da da da!";
    p.className = "dadada";

    let dadadaContainer = document.getElementById("dadadaContainer");
    dadadaContainer.appendChild(p);
}

/*var myAudio = document.getElementById("myAudio");
let isPlaying = false;

function togglePlay() {
    isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function () {
    isPlaying = true;
};

myAudio.onpause = function () {
    isPlaying = false;
};
*/