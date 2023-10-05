let cart = [];

async function addCartByIndex(index) {
  const data = await getSoapByIndex(index);
  const cartIndex = cart.findIndex((soap) => soap.soapName === data.soapName);

  // 카드에 똑같은 비누가 있을 때
  if (cartIndex !== -1) {
    cart[cartIndex].count += 1;
  } else {
    cart.push({ ...data, count: 1 });
  }

  renderCart();
}

function renderCart() {
  const totalPrice = cart.reduce((prev, soap) => prev + Number(soap.price.slice(0, -1)) * soap.count, 0);

  document.getElementById('cart-total-count').innerHTML = `${cart.reduce((prev, soap) => prev + soap.count, 0)}개`;

  if (totalPrice > 30000) {
    document.getElementById('cart-total-price').innerHTML = `${totalPrice}원 x / ${Math.round(
      totalPrice * (9 / 10)
    )}원 o`;
  } else {
    document.getElementById('cart-total-price').innerHTML = `${totalPrice}원`;
  }

  renderCartDetail();
}

function increaseSoapByIndexToCart(index) {
  cart[index].count += 1;

  renderCart();
}

function decreaseSoapByIndexToCart(index) {
  cart[index].count -= 1;

  if (cart[index].count < 1) {
    cart.splice(index, 1);
  }

  renderCart();
}

function renderCartDetail() {
  document.getElementById('cartDetailModal').innerHTML = cart
    .map(
      (soap, index) => `
  <div>
    <span>${soap.soapName}</span>
    <span>${soap.price}</span>
    <span>${soap.count}</span>
    <button onclick="increaseSoapByIndexToCart(${index})">+</button>
    <button onclick="decreaseSoapByIndexToCart(${index})">-</button>
  </div>
  `
    )
    .join('');

  document.getElementById('cartDetailModal').innerHTML += "<button onclick='closeCartDetailModal()'>닫기</button>";
}

function openCartDetailModal() {
  document.getElementById('cartDetailModal').style.display = 'block';

  renderCartDetail();
}

function closeCartDetailModal() {
  document.getElementById('cartDetailModal').style.display = 'none';
}
