async function getSoapsBySearch(search) {
  await sleep(500);

  const { data } = await (await fetch('./assets/soap.json')).json();

  const computedData = data.map((data, index) => ({ ...data, index })).filter((soap) => soap.soapName.includes(search));

  return {
    data: computedData,
    totalCount: computedData.length,
  };
}

async function onInputSearch(e) {
  const searchValue = e.target.value;

  if (searchValue === '') {
    await sleep(500);

    document.getElementsByClassName('autocomplete-wrapper')[0].innerHTML = '';

    return;
  }

  const { data } = await getSoapsBySearch(searchValue);

  document.getElementsByClassName('autocomplete-wrapper')[0].innerHTML = data
    .map(
      (data) => `
    <span onclick="autocomplete('${data.soapName}')">${data.soapName}</span>
  `
    )
    .join('');
}

function autocomplete(soapName) {
  document.getElementById('search').value = soapName;
}

async function submitSearch(e) {
  e.preventDefault();

  const searchValue = e.srcElement.search.value;

  if (searchValue === '') {
    alert('검색어를 입력해주세요');

    return;
  }

  const { data } = await getSoapsBySearch(searchValue);

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
}
