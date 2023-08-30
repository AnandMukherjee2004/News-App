let API_KEY = "57be0234429248feb7ad8cfdd9ba023d";
let url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("world"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    let res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    let data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    let cardsContainer = document.getElementById("cards-container");
    let newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        let cardClone = newsCardTemplate.content.cloneNode(true);
        fillData(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillData(cardClone, article) {
    let newsImg = cardClone.querySelector('#news-img');
    let newsTitle = cardClone.querySelector('#news-title');
    let newsSource = cardClone.querySelector('#news-source');
    let newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    let date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"

    });

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelected = null;

function onNavItemClick(id) {
    fetchNews(id);
    let navItem = document.getElementById(id);
    curSelected?.classList.remove("active");
    curSelected = navItem;
    curSelected.classList.add("active");
}

let searchBtn = document.getElementById("search-btn");
let inputText = document.getElementById("news-input");

searchBtn.addEventListener("click", () => {
    let query = inputText.value;

    if (!query) return;
    fetchNews(query);
    curSelected.classList.remove("active")
})

inputText.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault;
        searchBtn.click();
    }
})
