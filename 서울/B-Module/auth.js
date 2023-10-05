const user = {};
const users = [];

function showPurchaseModal() {
  document.getElementById('purchaseModal').style.display = 'block';
}

function closePurchaseModal() {
  document.getElementById('purchaseModal').style.display = 'none';
}

function login(e) {
  e.preventDefault();

  const name = e.srcElement.name.value;
  const phone = e.srcElement.phone.value;
  const password = e.srcElement.password.value;

  document.getElementsByTagName('header')[0].innerHTML = `
    ${name}님 환영합니다

    <button onclick="logout()">구매완료</button>
    <button onclick="openPurchaseUserCheckModal()">구매확인서</button>
  `;

  user.id = 1;
  user.name = name;
  user.phone = phone;
  user.password = password;

  users.push({ ...user });

  closePurchaseModal();
}

function logout() {
  document.getElementsByTagName('header')[0].innerHTML = `
    <button onclick="showPurchaseModal()">구매하기</button>
  `;
}
