let intersectionObserver;

async function sleep(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

// MP비누, CP 비누, HP 비누, 리배칭 비누, 굽는 비누
async function getSoapsByCategory(category, page) {
  await sleep(1000);

  const { data } = await (await fetch('./assets/soap.json')).json();

  const computedData = data.map((data, index) => ({ ...data, index })).filter((soap) => soap.category === category);

  return {
    data: computedData.slice(0, page * 4),
    totalCount: computedData.length,
  };
}

async function renderList(category, page) {
  const { data, totalCount } = await getSoapsByCategory(category, page);

  document.getElementById('list').innerHTML = data
    .map(
      (soap) => `
    <div class="list-item">
      <img src="./assets/img/${soap.Image}" />
      <span>${soap.soapName}</span>
      <span>${soap.release}</span>
      <span>${soap.price}</span>
      <button onclick="showDetailModalByIndex(${soap.index})">상세보기</button>
      <button onclick="addCartByIndex(${soap.index})">장바구니</button>
    </div>
  `
    )
    .join('');

  if (page * 4 < totalCount) {
    document.getElementById('list').innerHTML += `
      <div id="getNextList">
        로딩중...
      </div>
    `;

    setupIntersectionObserver(category, page + 1);
  }
}

function setupIntersectionObserver(category, page) {
  if (intersectionObserver) {
    intersectionObserver.disconnect();
  }

  intersectionObserver = new IntersectionObserver(
    (intersects) => {
      // 만약 div가 보였다면
      if (intersects.every((intersect) => intersect.isIntersecting)) {
        renderList(category, page);
      }
    },
    { threshold: 1 }
  );

  intersectionObserver.observe(document.getElementById('getNextList'));
}

renderList('MP비누', 1);
