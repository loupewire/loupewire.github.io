/**
 * Swaps the poster for the YouTube player on click. Until then the page has
 * made no request to YouTube: the poster is a local image and the link
 * inside the facade is an ordinary link to the watch page, which is what
 * a visitor without JavaScript gets.
 */
(function () {
  var facades = document.querySelectorAll('[data-video-facade]');

  function activate(facade) {
    var id = facade.getAttribute('data-youtube-id');
    if (!id) return;
    var iframe = document.createElement('iframe');
    iframe.src =
      'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
    iframe.title = 'Loupewire intro video';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading', 'eager');
    facade.replaceChildren(iframe);
    if (window.LoupewireSite && window.LoupewireSite.track) {
      window.LoupewireSite.track('video_play', { video: id });
    }
  }

  for (var i = 0; i < facades.length; i += 1) {
    (function (facade) {
      var link = facade.querySelector('.video-facade__link');
      if (!link) return;
      link.addEventListener('click', function (event) {
        event.preventDefault();
        activate(facade);
      });
    })(facades[i]);
  }
})();
