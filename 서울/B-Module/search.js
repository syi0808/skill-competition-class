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

function submitSearch(e) {
  e.preventDefault();
}

// submitSearch 실행시에 renderList 함수 따로 짜기
// getSoapsBySearchWithPage도 필요할듯
