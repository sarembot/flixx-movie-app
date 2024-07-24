const globalState = {
  currentPage: window.location.pathname,
};

console.log(globalState.currentPage);

// Highlight active link
function highlightLink() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    console.log(link.getAttribute('href'));

    if (link.getAttribute('href') === `.${globalState.currentPage}`) {
      link.classList.toggle('active');
    }
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
}

document.addEventListener('DOMContentLoaded', init);
