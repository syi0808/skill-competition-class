const items = document.getElementsByClassName('item');
const itemWrapper = document.getElementsByClassName('item-wrapper')[0];

function resetActiveItems() {
  [...items].forEach((item) => {
    item.classList.remove('active-item');
  });
}

[...items].forEach((item, index) => {
  item.addEventListener('click', () => {
    resetActiveItems();

    item.classList.add('active-item');

    itemWrapper.style.transform = `translateX(${-200 + -400 * index}px)`;
  });
});
