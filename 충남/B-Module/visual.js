const visualContainer = document.getElementsByClassName('visual-container')[0];
const visualWrapper = document.getElementsByClassName('visual-wrapper')[0];
const ITEM_COUNT = 3;
let currentPosition = 0;

let timer = setInterval(visualNext, 2000);

function visualPrev() {
  if (timer) {
    clearInterval(timer);
  }

  currentPosition = currentPosition - 1;

  if (currentPosition < 0) {
    currentPosition = ITEM_COUNT - 1;
  }
}

function visualNext() {
  if (timer) {
    clearInterval(timer);
  }

  currentPosition = (currentPosition + 1) % ITEM_COUNT;

  renderVisualCarousel();
}

function setVisual(nextPage) {
  if (timer) {
    clearInterval(timer);
  }

  currentPosition = nextPage - 1;

  renderVisualCarousel();
}

function renderVisualCarousel() {
  visualWrapper.style.left = `-${currentPosition * 100}%`;

  timer = setInterval(visualNext, 2000);
}
