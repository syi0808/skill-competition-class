const items = document.getElementsByClassName('item');

const intersectionObserver = new IntersectionObserver(
  (items) => {
    items.forEach((item) => {
      const child = item.target.getElementsByClassName('item-child')[0];
      //  화면에 div가 들어왔을 때
      if (item.isIntersecting) {
        child.classList.add('active');
      }
      // 화면에 div가 안들어왔을 때
      else {
        child.classList.remove('active');
      }
    });
  },
  {
    threshold: 1,
  }
);

[...items].forEach((item) => {
  intersectionObserver.observe(item);
});
