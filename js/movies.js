const api = "http://localhost:8000/api/v1/titles"


async function bestMovie() {
    let bestMovieRequest = await fetch(`${api}?sort_by=-imdb_score`);
    let bestMovieJson = await bestMovieRequest.json();

    let bestMovieInfoRequest = await fetch(`${api}/${bestMovieJson.results[0].id}`);
    let bestMovieInfoJson = await bestMovieInfoRequest.json();

    let bestMovie = document.querySelector(".best_movie div");

    bestMovie.innerHTML = `
        <img src="${bestMovieInfoJson.image_url}" alt="${bestMovieInfoJson.title}"/>
        <h1>${bestMovieInfoJson.title}</h1>
        <button id="best_movie_button_info">Plus sur ce film</button>
        <p>${bestMovieInfoJson.long_description}</p>
    `;
    document.getElementById("best_movie_button_info").onclick = function () {
        createModal(bestMovieInfoJson);
    }
}

async function getMoviesByCategory(genre, id) {

    if (genre === 'best_movies') {
        let movies = await fetch(`${api}/?sort_by=-imdb_score&page_size=7`);
        let moviesJson = await movies.json();
        let dataMovies = moviesJson.results;
        let section = document.querySelector(`#${id}`);
        for (let movie of dataMovies) {
            let movieDiv = document.createElement('div');
            movieDiv.innerHTML = `
        <a id="${movie.id}">
        <img src="${movie.image_url}" alt="${movie.title}"/>
        </a>
    `;
            section.appendChild(movieDiv);
            let movieDetailsJson = await movieDetails(movie)
            document.getElementById(`${movie.id}`).onclick = function () {
                createModal(movieDetailsJson);
            }

        }
    } else {
        let movies = await fetch(`${api}/?genre=${genre}&sort_by=-imdb_score&page_size=7`);
        let moviesJson = await movies.json();
        let dataMovies = moviesJson.results;
        let section = document.querySelector(`#${id}`);
        for (let movie of dataMovies) {
            let movieDiv = document.createElement('div');
            movieDiv.innerHTML = `
        <a id="${movie.id}">
        <img src="${movie.image_url}" alt="${movie.title}"/>
        </a>
    `;
            section.appendChild(movieDiv);
            let movieDetailsJson = await movieDetails(movie)
            document.getElementById(`${movie.id}`).onclick = function () {
                createModal(movieDetailsJson);
            }
        }
    }
}


async function movieDetails(dataMovie) {
    let movieRequest = await fetch(`${dataMovie.url}`)
    let movieRequestDetails = await movieRequest.json();
    return movieRequestDetails;
}

function createModal(movieDetails) {
    let modal = document.querySelector(".modal");
    let modalBody = document.querySelector('.modal_body');
    let closeButton = document.querySelector('.close_button');

    modal.style.display = "block"
    modalBody.innerHTML = `
    <h2>${movieDetails.title}</h2>
    <img src="${movieDetails.image_url}" alt="${movieDetails.title}"/>
    <p>Genre : ${movieDetails.genres}</p>
    <p>Date de sortie : ${movieDetails.date_published}</p>
    <p>Note : ${movieDetails.rated}</p>
    <p>Score imdb : ${movieDetails.imdb_score}</p>
    <p>Réalisateur : ${movieDetails.directors}</p>
    <p>Durée : ${movieDetails.duration} mn</p>
    <p>Pays d'origine : ${movieDetails.countries}</p>
    <p>Résultats au box office  : ${movieDetails.worldwide_gross_income}</p>
    <p>Acteurs : ${movieDetails.actors}</p>
    <p>Résumé : ${movieDetails.long_description}</p>
    `
    closeButton.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

bestMovie();
getMoviesByCategory("best_movies", "best_movies");
getMoviesByCategory("mystery", "mystery");
getMoviesByCategory("comedy", "comedy");
getMoviesByCategory("thriller", "thriller");
