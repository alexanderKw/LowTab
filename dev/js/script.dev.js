const tabLinks = document.querySelectorAll('.tabs-links li a');
const tabItems = document.querySelectorAll('.tabs-item');

tabItems.forEach(tab => {
  tabLinks.forEach(tabLi => {
    tabLi.addEventListener('click', e => {
      e.preventDefault();

      for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove('active');
      }

      tabLi.classList.add('active');

      if (tabLi.getAttribute('href') == tab.getAttribute('id')) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  });
});
