let data = [];
const recommendWrapper = document.getElementsByClassName('recommend-tourlist-wrapper')[0];

async function fetchData() {
  const response = await (await fetch('./assets/추천여행/recommend_tourlist.json')).json();

  data = response.data;
}

function render() {
  recommendWrapper.innerHTML = '';

  data.forEach((data, index) => {
    const userid = data.userid;
    const photoset = data.photoset;

    const div = document.createElement('div');

    div.setAttribute('class', 'recommend-tourlist');

    div.innerHTML = `
      <button onclick="play(${index})" class="recommend-play-button">재생하기</button>
      <img src="./assets/추천여행/${photoset[0].image}" />
      <span class="nickname">${userid}</span>
    `;

    recommendWrapper.appendChild(div);
  });
}

function play(index) {
  let currentPage = 0;

  const image = document.getElementsByClassName('recommend-tourlist')[index].getElementsByTagName('img')[0];

  const timer = setInterval(() => {
    currentPage += 1;

    if (currentPage > 4) {
      clearInterval(timer);
    }

    image.src = `./assets/추천여행/${data[index].photoset[currentPage % 5].image}`;
  }, 1000);
}

fetchData().then(() => {
  render();
});
