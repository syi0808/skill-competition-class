function renderPopular() {
  const soaps = purchases.reduce((prev, purchase) => {
    purchase.cart.forEach((soap) => {
      if (prev[soap.soapName]) {
        prev[soap.soapName].count += soap.count;
      } else {
        prev[soap.soapName] = { ...soap };
      }
    });

    return prev;
  }, {});
  const sortedSoaps = Object.entries(soaps)
    .map(([_, soap]) => soap)
    .sort((a, b) => b.count - a.count);

  document.getElementById('popular').innerHTML = sortedSoaps
    .map(
      (soap, index) => `
  <div>
    ${index + 1}위
    <img width="200" src="./assets/img/${soap.Image}" />
    <span>${soap.soapName}</span>
    <span>${soap.count}개</span>
  </div>
  `
    )
    .join('');
}
