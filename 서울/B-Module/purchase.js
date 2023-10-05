let purchases = [];

function submitPurchase() {
  purchases.push({
    user: { ...user },
    cart: [...cart],
  });

  cart = [];

  renderCart();
  renderPopular();
}

function openPurchaseDetailModal() {
  document.getElementById('purchaseDetailModal').style.display = 'block';
}

function closePurchaseDetailModal() {
  document.getElementById('purchaseDetailModal').style.display = 'none';
}

function openPurchaseUserCheckModal() {
  document.getElementById('purchaseUserCheckModal').style.display = 'block';
}

function closePurchaseUserCheckModal() {
  document.getElementById('purchaseUserCheckModal').style.display = 'none';
}

function renderPurchaseDetailModal(user) {
  const purchasesByUser = purchases.filter(
    ({ user: { phone, password } }) => phone === user.phone && password === user.password
  );

  document.getElementById('purchaseDetailModal').innerHTML = purchasesByUser
    .map((purchase) => {
      const cart = purchase.cart;
      const totalPrice = cart.reduce((prev, soap) => prev + soap.count * Number(soap.price.slice(0, -1)), 0);
      const tenPercentForTotalPrice = Math.round(totalPrice * 0.1);

      return `
        영수증
    
        ${cart
          .map(
            (soap) => `
            <p>
              <span>${soap.soapName}</span>
              <span>${soap.count}</span>
              <span>${soap.count * Number(soap.price.slice(0, -1))}</span>
            </p>
          `
          )
          .join('')}
    
        <p>총 금액: ${totalPrice}</p>
        <p>할인금액: ${tenPercentForTotalPrice} (10% 적용)</p>
        <p>결제 금액: ${totalPrice - tenPercentForTotalPrice}</p>
        `;
    })
    .join('<hr>');

  document.getElementById('purchaseDetailModal').innerHTML += `
      <button onclick="printPurchaseDetail()">출력하기</button>
      <button onclick="closePurchaseDetailModal()">닫기</button>
    `;

  openPurchaseDetailModal();
}

function printPurchaseDetail() {
  const printContent = document.getElementById('purchaseDetailModal').innerHTML;
  const originalContent = document.body.innerHTML;
  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
}

function purchaseCheckUser(e) {
  e.preventDefault();

  const phone = e.srcElement.phone.value;
  const password = e.srcElement.password.value;
  const user = users.find((user) => user.phone === phone && user.password === password);

  if (user) {
    renderPurchaseDetailModal(user);

    closePurchaseUserCheckModal();
  }
}
