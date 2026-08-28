(function () {
  'use strict';

  var $ = function (selector, context) {
    return (context || document).querySelector(selector);
  };
  var $$ = function (selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  };

  var root = document.documentElement;
  var themeBtn = $('#themeToggle');
  var navToggle = $('#navToggle');
  var navMenu = $('#navMenu');
  var backdrop = $('#menuBackdrop');
  var header = $('#siteHeader');
  var toTop = $('#toTop');

  function setTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.setAttribute('aria-pressed', String(theme === 'paper'));
      themeBtn.title = theme === 'paper' ? 'Switch to dark theme' : 'Switch to light theme';
    }
    var themeMeta = $('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', theme === 'paper' ? '#f4efe5' : '#0f0e0c');
    if (persist !== false) {
      try { localStorage.setItem('cn-theme', theme); } catch (e) {}
    }
  }

  try {
    var savedTheme = localStorage.getItem('cn-theme');
    if (savedTheme === 'paper' || savedTheme === 'ink') {
      setTheme(savedTheme, false);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('paper', false);
    }
  } catch (e) {}

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'paper' ? 'ink' : 'paper');
    });
  }

  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    if (navToggle) {
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    if (backdrop) backdrop.setAttribute('aria-hidden', String(!open));
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      setMenu(!document.body.classList.contains('menu-open'));
    });
  }
  if (backdrop) backdrop.addEventListener('click', function () { setMenu(false); });
  if (navMenu) {
    $$('.nav-link', navMenu).forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
  }
  window.addEventListener('resize', function () {
    if (window.innerWidth > 820) setMenu(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setMenu(false);
  });

  var spySections = $$('section[data-spy]');
  var navLinks = $$('.nav-link');
  var ticking = false;

  function updateScrollUI() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 10);
    if (toTop) toTop.classList.toggle('show', y > 650);

    var currentId = '';
    var probe = y + (header ? header.offsetHeight : 0) + 160;
    spySections.forEach(function (section) {
      if (section.offsetTop <= probe) currentId = section.id;
    });
    if (y + window.innerHeight >= document.documentElement.scrollHeight - 3 && spySections.length) {
      currentId = spySections[spySections.length - 1].id;
    }
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }, { passive: true });
  updateScrollUI();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var revealEls = $$('[data-reveal]');
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -25px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  var typewriterEl = $('#typewriter-text');
  if (typewriterEl) {
    var phrases = [
      'Building useful software.',
      'Turning ideas into interfaces.',
      'Learning fast. Shipping better.',
      'Clean code. Bold ideas.',
      'My code works... eventually.'
    ];

    if (reducedMotion) {
      typewriterEl.textContent = phrases[0];
    } else {
      var phraseIndex = 0;
      var charIndex = phrases[0].length;
      var deleting = true;

      function typeEffect() {
        var phrase = phrases[phraseIndex];
        if (deleting) {
          charIndex -= 1;
          typewriterEl.textContent = phrase.slice(0, Math.max(0, charIndex));
        } else {
          charIndex += 1;
          typewriterEl.textContent = phrase.slice(0, charIndex);
        }

        var delay = deleting ? 34 : 72;
        if (!deleting && charIndex >= phrase.length) {
          deleting = true;
          delay = 2200;
        } else if (deleting && charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          delay = 420;
        }
        window.setTimeout(typeEffect, delay);
      }
      window.setTimeout(typeEffect, 1500);
    }
  }

  var profileImg = $('#profileImg');
  if (profileImg) {
    profileImg.addEventListener('error', function fallback() {
      profileImg.removeEventListener('error', fallback);
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">' +
        '<rect width="800" height="1000" fill="#17140f"/>' +
        '<circle cx="400" cy="360" r="150" fill="none" stroke="#e7b75a" stroke-width="3"/>' +
        '<text x="400" y="402" font-family="monospace" font-size="112" fill="#e7b75a" text-anchor="middle">CN</text>' +
        '<path d="M190 820c55-142 142-214 210-214s155 72 210 214" fill="none" stroke="#e7b75a" stroke-width="3"/>' +
        '<text x="400" y="905" font-family="monospace" font-size="24" fill="#a69c8b" text-anchor="middle">CHRISTIAN NUWAGABA</text>' +
        '</svg>';
      profileImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
  }

  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
