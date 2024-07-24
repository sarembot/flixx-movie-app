const globalState = {
  currentPage: window.location.pathname,
};

console.log(globalState.currentPage);

// Highlight active link
function highlightLink() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    if (link.getAttribute('href') === `.${globalState.currentPage}`) {
      link.classList.toggle('active');
    }
  });
}

// make fetch request to moviedb, get popular movies, display them on the page

async function fetchApiData(endpoint) {
  const API_KEY = '6969dc387a25455aada3bf89c5cbed31';
  const API_URL = 'https://api.themoviedb.org/3/';

  const res = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();

  return data;
}

// Display popular movies
async function displayPopularMovies() {
  const popularMovies = await fetchApiData('movie/popular');

  console.log(popularMovies.results);

  popularMovies.results.forEach((movie) => {
    const container = document.getElementById('popular-movies');
    const movieDiv = document.createElement('div');
    movieDiv.innerHTML = `<div class="card">
          <a href="movie-details.html?id=1">
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;

    container.appendChild(movieDiv);
    const movieTitle = document.querySelector('.card-title');
    const releaseDate = document.querySelector('.text-muted');

    movieTitle.innerText = movie.title;
    releaseDate.innerText = movie.release_date;
  });
}

// Init App
function init() {
  switch (globalState.currentPage) {
    case '/':
    case '/index.html':
      console.log('home');
      break;
    case '/shows.html':
      console.log('shows');
      break;
    case '/movie-details.html':
      console.log('movie details');
      break;
    case '/tv-details.html':
      console.log('tv details');
      break;
    case '/search.html':
      console.log('search');
      break;
  }

  highlightLink();
  displayPopularMovies();
}

document.addEventListener('DOMContentLoaded', init);
