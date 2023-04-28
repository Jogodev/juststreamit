const api_url = "http://localhost:8000/api/v1/titles";

async function bestMovie(){
    let bestMovie = await fetch(`${api_url}?sort_by=imdb_score`);
    let bestMovieJson = await bestMovie.json();

const article = bestMovieJson
const myTitle = document.createElement("h2");
myTitle.innerText = article.rating
const sectionBestMovie = document.querySelector(".best_movie");
sectionBestMovie.appendChild(myTitle);
}

