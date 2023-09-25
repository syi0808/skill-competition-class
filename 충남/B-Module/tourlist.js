const tourlists = document.getElementsByClassName('tourlist-accordion-wrapper');

[...tourlists].forEach((tourlist) => {
  const header = tourlist.getElementsByClassName('tourlist-accordion-header')[0];
  const contentWraper = tourlist.getElementsByClassName('tourlist-accordion-content-wrapper')[0];
  const content = tourlist.getElementsByClassName('tourlist-accordion-content')[0];
  const icon = tourlist.getElementsByClassName('tourlist-accordion-icon')[0];

  header.addEventListener('click', () => {
    // 열릴 때
    if (!contentWraper.style.height || contentWraper.style.height === '0px') {
      closeAllTourlists();
      contentWraper.style.height = `${content.clientHeight}px`;
      icon.innerHTML = '닫기';

      // 닫힐 때
    } else {
      contentWraper.style.height = '0px';
      icon.innerHTML = '열기';
    }
  });
});

function closeAllTourlists() {
  [...tourlists].forEach((tourlist) => {
    const contentWraper = tourlist.getElementsByClassName('tourlist-accordion-content-wrapper')[0];
    const icon = tourlist.getElementsByClassName('tourlist-accordion-icon')[0];

    contentWraper.style.height = '0px';
    icon.innerHTML = '열기';
  });
}
