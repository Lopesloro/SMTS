(function () {
  var toggle = document.querySelector('.header-toggle');
  var nav = document.querySelector('.header-nav');
  var headerMain = document.querySelector('.header-main');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function onScroll() {
    if (headerMain) {
      headerMain.classList.toggle('is-scrolled', window.scrollY > 10);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('.has-megamenu').forEach(function (item) {
    var link = item.querySelector(':scope > a');
    if (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 968) {
          e.preventDefault();
          item.classList.toggle('is-open');
        }
      });
    }
  });

})();
