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

// Fetch data
async function fetchApiData(endpoint) {
  const API_KEY = '6969dc387a25455aada3bf89c5cbed31';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const res = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await res.json();

  hideSpinner();

  return data;
}

// Spinner Toggles
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Toggle between TV/Movies on home

// Display popular movies
async function displayPopularMovies() {
  const popularMovies = await fetchApiData('movie/popular');

  popularMovies.results.forEach((movie) => {
    const container = document.getElementById('popular-movies');
    const movieDiv = document.createElement('div');
    movieDiv.innerHTML = `<div class="card">
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
              class="card-img-top"
              alt="Movie Title"
            />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;

    container.appendChild(movieDiv);
  });
}
// Display movie details

async function displayMovieDetails() {
  const movieId = window.location.search;
  const popularMovies = await fetchApiData('movie/popular');
  const container = document.querySelector('#movie-details');
  const div = document.createElement('div');

  // Format budget in movie details
  const formatBudget = (num) => {
    const numArr = Array.from(num.toString());
    numArr.forEach((digit) => {
      console.log(digit);
    });
  };

  popularMovies.results.forEach((movie) => {
    if (`?id=${movie.id}` === movieId) {
      console.log(movie);

      div.innerHTML = `
      <div class="details-top">
          <div>

          ${
            movie.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
            class="card-img-top"
            alt="Movie Title"
          />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
          }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${String(movie.vote_average).slice(0, -2)}
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
            ${movie.overview}
            </p>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${formatBudget(
              Math.floor(Math.random() * 10000000 + 1000000)
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
            <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">Company 1, Company 2, Company 3</div>
        </div>
      `;
    }
    container.appendChild(div);
  });
}

// Display TV Shows
async function displayPopularShows() {
  const shows = await fetchApiData('tv/popular');

  shows.results.forEach((show) => {
    const container = document.getElementById('popular-shows');
    const showDiv = document.createElement('div');
    showDiv.innerHTML = `
        <div class="card">
          <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path
              ? `<img
              src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
        </div>
    `;

    container.appendChild(showDiv);
  });
}

// Init App
function init() {
  switch (globalState.currentPage) {
    case '/':
    case '/index.html':
      console.log('home');
      displayPopularMovies();
      break;
    case '/shows.html':
      console.log('shows');
      displayPopularShows();
      break;
    case '/movie-details.html':
      console.log('movie details');
      displayMovieDetails();
      break;
    case '/tv-details.html':
      console.log('tv details');
      break;
    case '/search.html':
      console.log('search');
      break;
  }

  highlightLink();
}

document.addEventListener('DOMContentLoaded', init);
