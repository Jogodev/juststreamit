const api = "http://localhost:8000/api/v1/titles"

async function bestMovie() {
    let bestMovieRequest = await fetch(`${api}?sort_by=-imdb_score`);
    let bestMovieJson = await bestMovieRequest.json();

    let bestMovieInfoRequest = await fetch(`${api}/${bestMovieJson.results[0].id}`);
    let bestMovieInfoJson = await bestMovieInfoRequest.json();
    console.log(bestMovieInfoJson)

    let bestMovie = document.querySelector(".best_movie div");

    bestMovie.innerHTML = `
        <img src="${bestMovieInfoJson.image_url}" alt=""/>
        <h1>${bestMovieInfoJson.title}</h1>
        <button class="bestmovie_button_info">Info</button>
        <p>${bestMovieInfoJson.long_description}</p>
    `;
}

bestMovie();
