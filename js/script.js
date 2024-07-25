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
// Display movie details - used psuedo random numbers for budget / revenue / runtime

async function displayMovieDetails() {
  const movieId = window.location.search;
  const popularMovies = await fetchApiData('movie/popular');
  const container = document.querySelector('#movie-details');
  const div = document.createElement('div');

  // Format budget in movie details
  const formatBudget = (num) => num.toLocaleString();

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
            <a href="#" target="_blank" class="btn" style=
            text-align:center;">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${formatBudget(
              Math.floor(Math.random() * 10000000 + 1000000)
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${formatBudget(
              Math.floor(Math.random() * 10000000 + 1000000)
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              Math.floor(Math.random() * 100) + 90
            } minutes
            </li>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>
        </div>
      `;
      // Overlay for bg image
      displayBackgroundImage('movie', movie.backdrop_path);
    }

    container.appendChild(div);
  });
}
// Display backdrop on details page
function displayBackgroundImage(type, backgroundPath) {
  console.log(backgroundPath);

  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundSPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '0';
  overlayDiv.style.opacity = '0.1';
  overlayDiv.style.pointerEvents = 'none'; // so bg img doesn't mess with header btns

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
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

// Display popular show details pages

async function displayShowDetails() {
  const showId = window.location.search;
  console.log(showId);
  const popularShows = await fetchApiData('tv/popular');

  const container = document.querySelector('#show-details');
  const div = document.createElement('div');
  container.appendChild(div);

  popularShows.results.forEach((show) => {
    if (`?id=${show.id}` === showId) {
      console.log(show);

      div.innerHTML = `
      <div class="details-top">
          <div>

          ${
            show.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
            class="card-img-top"
            alt="Movie Title"
          />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
          }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${String(show.vote_average).slice(0, -2)}
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
            ${show.overview}
            </p>
            <a href="#" target="_blank" class="btn" style="text-align:center">Visit Show's Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>
        </div>
      `;
      // Overlay for bg image
      displayBackgroundImage('show', show.backdrop_path);

      container.appendChild(div);
    }
  });
}

// Init App
function init() {
  switch (globalState.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      console.log('search');
      break;
  }

  highlightLink();
}

document.addEventListener('DOMContentLoaded', init);
