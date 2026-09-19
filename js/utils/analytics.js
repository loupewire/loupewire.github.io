/**
 * The one place the site talks to Google Analytics. Every call is guarded:
 * with a content blocker, or before the snippet has loaded, `gtag` does not
 * exist and the page must behave exactly the same.
 *
 * Events, reused from MarkView so the two properties read alike:
 *   install_extension_click  { button_location, page }
 *   browser_detected         { browser }   (sent by browser-detect.js)
 */
/* global gtag */
(function () {
  function track(name, params) {
    if (typeof gtag === 'undefined') return;
    gtag('event', name, params || {});
  }

  window.LoupewireSite = window.LoupewireSite || {};
  window.LoupewireSite.track = track;

  document.addEventListener('click', function (event) {
    var target = event.target;
    var cta = target && target.closest ? target.closest('a[data-cta]') : null;
    if (!cta) return;
    track('install_extension_click', {
      button_location: cta.getAttribute('data-cta'),
      page: window.location.pathname,
    });
  });
})();
