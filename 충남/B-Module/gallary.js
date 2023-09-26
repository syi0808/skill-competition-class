const items = document.getElementsByClassName('item');

[...items].forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });

  const button = item.getElementsByTagName('button')[0];

  button.addEventListener('click', (e) => {
    e.stopPropagation();

    document.getElementsByClassName('item-wrapper')[0].removeChild(item);
  });
});
