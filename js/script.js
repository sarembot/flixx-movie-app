const globalState = {
  currentPage: window.location.pathname,
};

console.log(globalState.currentPage);

// Init App
function init() {
  switch (globalState.currentPage) {
    case '/':
      console.log('home');
      break;
  }
}

document.addEventListener('DOMContentLoaded', init);
