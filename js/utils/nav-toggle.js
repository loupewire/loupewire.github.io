/**
 * Narrow-screen nav. The button exists in the markup for every width; CSS
 * shows it only under 768px and only when `html.js` is present, so a page
 * without JavaScript never hides the nav behind a button that cannot open.
 */
(function () {
  var button = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('site-nav');
  if (!button || !nav) return;

  function setOpen(open) {
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      nav.setAttribute('data-open', '');
    } else {
      nav.removeAttribute('data-open');
    }
  }

  button.addEventListener('click', function () {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });

  // A navigation within the page (an anchor) should close the menu.
  nav.addEventListener('click', function (event) {
    var target = event.target;
    if (target && target.closest && target.closest('a')) setOpen(false);
  });
})();
