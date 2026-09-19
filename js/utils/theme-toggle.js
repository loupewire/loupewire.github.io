/**
 * Theme toggle. The boot script in <head> already stamped the attribute
 * before first paint; this only flips it on click and remembers the choice
 * under the same key the boot script reads.
 *
 * The key and attribute are literals here and in site/build.mjs (themeBoot),
 * and tests/site/build.test.ts fails if the two drift apart.
 */
(function () {
  var STORAGE_KEY = 'loupewire-site-theme';
  var ATTRIBUTE = 'data-loupewire-theme';
  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) return;

  var label = toggle.querySelector('.visually-hidden');
  var themeColor = document.querySelector('meta[name="theme-color"]');

  function current() {
    return root.getAttribute(ATTRIBUTE) === 'dark' ? 'dark' : 'light';
  }

  function reflect() {
    var theme = current();
    toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    if (label) {
      label.textContent = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    }
    if (themeColor) {
      // The two page backgrounds: --loupewire-bg in dark.css and light.css.
      themeColor.setAttribute('content', theme === 'dark' ? '#101418' : '#fafaf8');
    }
  }

  toggle.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute(ATTRIBUTE, next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage may be blocked; the choice then lasts for this page only.
    }
    reflect();
  });

  reflect();
})();
