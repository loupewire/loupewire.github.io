/**
 * Home page behaviour that is not a component: the "Watch the intro" button
 * scrolls to the video and reports it, so the funnel from hero to play can
 * be read in analytics.
 */
(function () {
  var watch = document.querySelector('.hero__actions a[href="#video"]');
  if (!watch) return;
  watch.addEventListener('click', function () {
    if (window.LoupewireSite && window.LoupewireSite.track) {
      window.LoupewireSite.track('watch_intro_click', { page: window.location.pathname });
    }
  });
})();
