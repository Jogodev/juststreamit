let api = "http://localhost:8000/api/v1/titles"


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
        console.log(dataMovies);
        let section = document.querySelector(`#${id}`);
        for (let movie of dataMovies) {
            let movieDiv = document.createElement('div');
            movieDiv.innerHTML = `
        <img src="${movie.image_url}" alt="${movie.title}"/>
        <h1>${movie.title}</h1>
        <button id="movie_button_info">Plus sur ce film</button>
    `;
            section.appendChild(movieDiv);
            document.getElementById("movie_button_info").onclick = function () {
                console.log('tio');
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
        <img src="${movie.image_url}" alt="${movie.title}"/
        <h1>${movie.title}</h1>
        <button id="movie_button_info">Plus sur ce film</button>
    `;
            section.appendChild(movieDiv);
            // let movieCardDetails = movieDetails(dataMovies);
            document.getElementById("movie_button_info").onclick = function () {
                console.log(movie);
                // createModal(movieCardDetails);
            }
        }
    }
}

// async function movieDetails(dataMovies) {
//     let movieRequest = await fetch(`${dataMovies.url}`)
//     let movieRequestDetails = movieRequest.json();
//     return movieRequestDetails;
// }

function createModal(movieDetails) {
    let modal = document.querySelector(".modal");
    let modalBody = document.querySelector('.modal_body');
    let closeButton = document.querySelector('.close_button');

    modal.style.display = "block"

    modalBody.innerHTML = `
    <h2>${movieDetails.title}</h2>
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
