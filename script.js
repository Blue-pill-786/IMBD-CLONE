

const apiBaseUrl ="https://api.themoviedb.org/3";
const apiKey = "2820b9899ffd7cccc2d4c6d6bedfdd7c";
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

const moviesGrid = document.getElementById("movies-grid");

const searchInput = document.getElementById("search-input");

const searchForm =document.getElementById("search-form");

const categoryTitle = document.getElementById("category-title");

const favorite = document.getElementById("favourites");

const favoritesContainer = document.getElementById("favorites-container");


async function fetchMoviesNowPlaying(){
    const response = await fetch(`${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`);
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    console.log(movies);
    displayMovies(movies);
}
async function searchMovies(query){
    const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${query}`);
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    displayMovies(movies);
}

function displayMovies(movies){
    moviesGrid.innerHTML = movies
    .map(
        movie => 
        `<div class="movie-card">
            <img src ="${imageBaseUrl}${movie.poster_path}"/>
            <p><i class="glyphicon glyphicon-thumbs-up"></i>${movie.vote_average}</i></p>
            <i class="fa-solid fa-star" id="like-button"  onclick="addToFavorites(${movie.id})"(${movie.poster_path})"></i>
            <h1>${movie.title}</h1>
            <p>${movie.release_date}</p>
            </div>
            `
            
        ).join("");
}

// Define an array to store the favorite movies
let favorites = [];



  function displayFavorites() {
    favoritesContainer.innerHTML = favorites
      .map(
        favorite => `
          <div class="favorite-item">
          <img src="${imageBaseUrl}${favorite.poster_path}">
            <p>${favorite.title}</p>
            
          </div>
        `
      )
      .join("");
}

function displayFavoritese() {
  favoritesContainer.innerHTML = favorites
    .map(
      favorite => `
     
        <div class="favorite-item-side">
        <img src="${imageBaseUrl}${favorite.poster_path}">
          <p>${favorite.title}</p>
          <i class="fa-solid fa-trash-can " onClick="removeFromFavorites(${favorite.id})"></i>
        </div>
        
      `
    )
    .join("");
}


function removeFromFavorites(movieId) {
  let indexToRemove = favorites.findIndex((item) => item.id === parseInt(movieId));
  if (indexToRemove >= 0) {
    var removedItem = favorites[indexToRemove];
    favorites.splice(indexToRemove, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("The Movie has been Removed from Favorite List");
    displayFavoritese();
  }
}

function addToFavorites(movieId) {
  // Check if the movie is already in favorites
  const existingMovie = favorites.find(favMovie => favMovie.id === movieId);

  if (!existingMovie) {
    // Retrieve the movie details using the TMDb API
    fetch(`${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(movie => {
        favorites.push(movie);
        console.log(`Added '${movie.title}' to favorites.`);
        alert("The Movie has been added to Favorite List");
        displayFavoritese();
      })
      .catch(error => {
        console.log(`Error fetching movie details: ${error}`);
      });
  } else {
    console.log(`Movie with ID ${movieId} is already in favorites.`);
    alert("The Movie is already in Favorite List");
  }
}
        
function handleSearchFormSubmit(event){
    event.preventDefault();
    categoryTitle.innerHTML="Search Results"
    const searchQuery = searchInput.value;
    searchMovies(searchQuery);
    
}







searchForm.addEventListener("submit", handleSearchFormSubmit);



fetchMoviesNowPlaying();
