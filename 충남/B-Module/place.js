const imagePaths = [
  'assets/천안8경_목록/1경 독립기념관.jpg',
  'assets/천안8경_목록/2경 유관순열사 사적지.png',
  'assets/천안8경_목록/3경 천안삼거리공원.png',
  'assets/천안8경_목록/4경 태조산왕건길과 청동대좌불.jpg',
  'assets/천안8경_목록/5경 아라리오조각광장.png',
  'assets/천안8경_목록/6경 성성호수공원.png',
  'assets/천안8경_목록/7경 광덕산.jpg',
  'assets/천안8경_목록/8경 국보 봉선홍경사갈기비.png',
];
const placeWrapper = document.getElementsByClassName('place-wrapper')[0];
let currentPlace = 0;
let PLACE_COUNT = 8;

async function createPlaces() {
  const data = (await (await fetch('./assets/천안8경_목록/천안8경메뉴_목록.txt')).text()).split('\r\n\r\n');

  for (let i = 0; i < 8; i++) {
    const item = document.createElement('div');
    item.setAttribute('class', 'place-item');

    item.innerHTML = `
      <img width="100%" height="100%" class="place-image" src="${imagePaths[i]}" />
      ${data[i]}
    `;

    placeWrapper.appendChild(item);
  }
}

function nextPlace() {
  const prevItem = document.getElementsByClassName('place-item')[currentPlace];

  currentPlace = (currentPlace + 1) % PLACE_COUNT;

  const item = document.getElementsByClassName('place-item')[currentPlace];

  prevItem.classList.remove('place-active');
  item.classList.add('place-active');
}

function prevPlace() {
  const prevItem = document.getElementsByClassName('place-item')[currentPlace];

  currentPlace = currentPlace - 1;

  if (currentPlace < 0) {
    currentPlace = PLACE_COUNT - 1;
  }

  const item = document.getElementsByClassName('place-item')[currentPlace];

  prevItem.classList.remove('place-active');
  item.classList.add('place-active');
}

createPlaces();
