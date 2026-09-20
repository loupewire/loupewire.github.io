/**
 * Guide page behaviour: the table of contents follows the reader, and the
 * sidebar collapses on narrow screens. Both are conveniences; the markup
 * works without them.
 */
(function () {
  var nav = document.querySelector('[data-guide-nav]');
  var wide = window.matchMedia('(min-width: 960px)');

  // On a phone the sidebar starts closed so the article is the first thing
  // on screen; on a wide screen it is always open, because the summary is
  // hidden and a closed <details> would hide the list with no way to open it.
  //
  // The initial close happens in an inline script beside the markup, before
  // first paint. This function is what keeps the state right afterwards, when
  // the viewport crosses the breakpoint.
  function syncSidebar() {
    if (!nav) return;
    if (wide.matches) {
      nav.open = true;
    } else if (!nav.hasAttribute('data-user-toggled')) {
      nav.open = false;
    }
  }
  if (nav) {
    nav.addEventListener('toggle', function () {
      if (!wide.matches) nav.setAttribute('data-user-toggled', '');
    });
    syncSidebar();
    wide.addEventListener('change', syncSidebar);
  }

  var links = document.querySelectorAll('.guide__toc a[href^="#"]');
  if (links.length === 0 || typeof IntersectionObserver === 'undefined') return;

  var byId = {};
  var headings = [];
  for (var i = 0; i < links.length; i += 1) {
    var id = links[i].getAttribute('href').slice(1);
    var heading = document.getElementById(id);
    if (!heading) continue;
    byId[id] = links[i];
    headings.push(heading);
  }

  var current = null;
  function mark(id) {
    if (current === id) return;
    if (current && byId[current]) byId[current].removeAttribute('aria-current');
    if (byId[id]) byId[id].setAttribute('aria-current', 'true');
    current = id;
  }

  // The heading nearest the top of the viewport, among those that have
  // scrolled past it, is the section being read.
  var observer = new IntersectionObserver(
    function () {
      var top = 96;
      var active = headings[0];
      for (var j = 0; j < headings.length; j += 1) {
        if (headings[j].getBoundingClientRect().top - top <= 0) active = headings[j];
      }
      if (active) mark(active.id);
    },
    { rootMargin: '-96px 0px -60% 0px', threshold: [0, 1] }
  );
  for (var k = 0; k < headings.length; k += 1) observer.observe(headings[k]);
})();
