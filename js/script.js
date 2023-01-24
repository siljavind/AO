const keyFilter = ["created", "edited", "url"];
const valueFilter = ["https://"];
const baseUrl = "https://swapi.dev/api/"
// const endpoints = [
//     "posts",
//     "comments",
//     "albums",
//     "photos",
//     "todos",
//     "users"
// ];

const menuBar = document.getElementById("menuBar");
const content = document.getElementById("content");

fetch(baseUrl)
    .then(response => {
        return response.json();
    })
    .then(data => {

        for (const key in data) {
            let menuItem = document.createElement("a");
            menuItem.className = "menuItem";
            menuItem.innerText = key;
            menuItem.href = data[key];
            menuItem.addEventListener("click", menuClick);
            menuBar.appendChild(menuItem);
        }

    })
    .catch(error => {
        console.log(error)
    });

function buildMenu() {
    endpoints.forEach(endpoint => {
        const menuItem = document.createElement("a");

        menuItem.className = "menuItem";
        menuItem.addEventListener("click", menuClick);
        menuItem.href = baseUrl + endpoint;
        menuItem.innerText = endpoint;

        menuBar.appendChild(menuItem);
    })

};

async function menuClick(e) {
    e.preventDefault();

    const data = await getData(e.target.href);
    showData(data, e.target.href);
};

async function getData(url) {
    const response = await fetch(url);
    return await response.json();
};

function showData(data, menuURL) {

    content.innerHTML = "";

    data.results.forEach(item => {
        console.log(item);
        const card = document.createElement("div");
        card.className = "card";

        for (const [key, value] of Object.entries(item)) {
            console.log(value)
            if (typeof value === "object" || keyFilter.includes(key) || value?.includes('https')) {
                continue;
            }
            else {
                const p = document.createElement("p");
                p.innerHTML = `<span class="keyStyle">${titleCase(key)}:</span> ${value}`;

                card.dataset.url = `${menuURL}/${item.id}`;

                card.appendChild(p);

                card.addEventListener("click",
                    showAllData(data);
            });
    /*card.addEventListener("click", async () => {
        const data = await getData(card.dataset.url);
        showAllData(data);
    });*/

    content.appendChild(card);

}

        }

    });

    /*data.forEach(item => {

        const card = document.createElement("div");
        card.className = "card";

        for (const [key, value] of Object.entries(item)) {
            if (typeof value === "object" || filter.includes(key)) {
                console.log(value);
                continue;
            }
            else {
                const p = document.createElement("p");
                p.innerHTML = `<span class="keyStyle">${titleCase(key)}:</span> ${value}`;

                card.dataset.url = `${menuURL}/${item.id}`;

                card.appendChild(p);
                content.appendChild(card);

                if (menuURL.endsWith("photos")) {
                    card.addEventListener("click", () => {
                        const subCard = document.createElement("div");
                        subCard.className = "card";

                        const img = document.createElement("img");
                        img.src = item.url;
                        console.log(item.url);

                        subCard.appendChild(img);

                        clearContent(content);
                        const card = document.createElement("div");
                        card.className = "card";

                        content.appendChild(subCard);
                    });
                }
                else {
                    card.addEventListener("click", async () => {
                        const data = await getDataFromURL(card.dataset.url);
                        showAllData(data);
                    });
                }

            }

            /*else if (key === "id" && menuURL.endsWith("users")) {

                card.dataset.url = `${menuURL}/${value}`;

                console.log(card.dataset.url);

                card.addEventListener("click", async () => {
                    const data = await getDataFromURL(card.dataset.url);
                    showAllData(data);
                });
            }*/


                /*if (menuURL.endsWith("photos")) {
            
                    card.addEventListener("click", () => {
                        const subCard = document.createElement("div");
                        subCard.className = "card";
            
                        const img = document.createElement("img");
                        img.src = `${menuURL}/${item.id}`;
            
                        subCard.appendChild(img);
                        clearContent(content);
                        const card = document.createElement("div");
                        card.className = "card";
            
                        content.appendChild(subCard);
                    });
                }
            
            
            
            
            }
            
            
                })*/


            };

function showAllData(data) {
    console.log(data);
    clearContent(content);
    const card = document.createElement("div");
    card.className = "card";
    content.appendChild(card);

    for (const [key, value] of Object.entries(data)) {

        if (typeof value === "object") {

            const subCategory = document.createElement("div");
            subCategory.className = "subCategory";
            const category = document.createElement("p");

            category.innerHTML = key;

            subCategory.appendChild(category);

            for (const [subKey, subValue] of Object.entries(value)) {

                const p = document.createElement("p");
                p.innerHTML = `${subKey}: ${subValue}`;
                subCategory.appendChild(p);
            }

            card.appendChild(subCategory);
        }
        else {
            const p = document.createElement("p");
            p.innerHTML = `<span class="keyStyle">${key}</span>: ${value}`;
            card.appendChild(p);
        }
    }
};

/*function showImage() {
    card.addEventListener("click", () => {
        const subCard = document.createElement("div");
        subCard.className = "card";
 
        const img = document.createElement("img");
        img.src = `${menuURL}/${item.id}`;
 
        subCard.appendChild(img);
        clearContent(content);
        const card = document.createElement("div");
        card.className = "card";
 
        content.appendChild(subCard);
    });
}*/

function clearContent(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

}

//buildMenu();














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



/*if (menuURL.endsWith("photos")) {
                    card.addEventListener("click", () => {
                        const subCard = document.createElement("div");
                        subCard.className = "card";

                        const img = document.createElement("img");
                        img.src = item.url;
                        console.log(item.url);

                        subCard.appendChild(img);

                        clearContent(content);
                        const card = document.createElement("div");
                        card.className = "card";

                        content.appendChild(subCard);
                    });
                }*/