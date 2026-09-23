/**
 * Points the install button at the right store. The build renders every
 * call to action for the Chrome Web Store; on Edge, and only when the
 * button carries an Edge href, the label and link swap. A "Coming soon"
 * span has no href and is never touched, whatever the browser.
 *
 * Detection prefers the User-Agent Client Hints brand list, which names
 * Edge and Brave directly; the user agent string is the fallback and only
 * tells Edge apart, because Brave's string is Chrome's verbatim.
 */
(function () {
  function detect() {
    var data = navigator.userAgentData;
    if (data && Array.isArray(data.brands)) {
      var brands = data.brands.map(function (b) {
        return b.brand;
      });
      if (brands.indexOf('Microsoft Edge') !== -1) return 'edge';
      if (brands.indexOf('Brave') !== -1) return 'brave';
      if (brands.indexOf('Google Chrome') !== -1) return 'chrome';
      return 'chromium';
    }
    var ua = navigator.userAgent;
    if (/Edg\//.test(ua)) return 'edge';
    if (/Chrome\//.test(ua)) return 'chrome';
    return 'other';
  }

  var EDGE_LOGO = '/assets/logos/microsoft-edge.svg';

  var browser = detect();

  if (browser === 'edge') {
    var buttons = document.querySelectorAll('a[data-cta][data-edge-href]');
    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].setAttribute('href', buttons[i].getAttribute('data-edge-href'));
      // Icon and label are swapped separately: the button's own textContent
      // would replace the logo along with the words.
      var icon = buttons[i].querySelector('.btn__icon');
      if (icon) icon.setAttribute('src', EDGE_LOGO);
      var label = buttons[i].querySelector('.btn__label');
      if (label) label.textContent = 'Add to Edge';
    }
  }

  if (window.LoupewireSite && window.LoupewireSite.track) {
    window.LoupewireSite.track('browser_detected', { browser: browser });
  }
})();
