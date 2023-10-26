const API_KEY = "326fa3febbd94a4093d59a1c62bda5e0"; 
const url = "https://newsapi.org/v2/everything?q=";

// for homepage / landing page
window.addEventListener("load", () => fetchNews("India"));

// reloading when clicked on logo  
function reload() {
    window.location.reload();
}

// for getting news from api / Requesting
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&sortBy=publishedAt&apiKey=${API_KEY}`); // fetch is asycnchronoius thus await
    const data = await res.json(); // changing into json format
    bindData(data.articles); // .articles has all the data
}

// for creating cards 
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
``
    cardsContainer.innerHTML = "";  // pehle se cards khule huye hai to usi ke niche aur card ajauenge 

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true); // cloning template of card
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

// for filling news data in cards created
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    // clicking on card and ridercting it to org news feature
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

// NavBar feature
let curSelectedNav = null; // variable for active Navbar
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active"); // deactivating previous NavBar
    curSelectedNav = navItem; // upadting navBar
    curSelectedNav.classList.add("active"); // activating New Nabar
}


// Search Bar Feature
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return; // doing nothing if seach clicked on empty searchBar
    fetchNews(query);
    
    // if currently in any navBar category then deactivate it 
    curSelectedNav?.classList.remove("active"); 
    curSelectedNav = null;
});

