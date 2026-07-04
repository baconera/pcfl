 =========================================================================
   SITE HEADER — EDIT IN ONE PLACE
   -------------------------------------------------------------------------
   This is the single source of the header/navigation for the whole site.
   Edit the HTML between the backticks below and it updates on every page.
   (Logo, nav links, dropdowns, "join now" button, etc.)

   Navigation styles live in /nav.css (injected below so they load on every
   page and survive style.css regeneration). Behaviour (dropdowns, mobile
   accordion, scroll shadow) lives in /script.js.
   ========================================================================= */
(function () {
  /* Load the navigation stylesheet (after style.css so these rules win). */
  (function ensureNavCss() {
    if (document.querySelector('link[data-afl-nav]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/nav.css?v=2';
    link.setAttribute('data-afl-nav', '');
    document.head.appendChild(link);
  })();

  var caret =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

  var HEADER_HTML = `
    <header class="primary-header">
      <div class="container">
        <div class="nav-wrapper">
          <a href="/" class="logo-black"><img src="/images/afltypeblack.png" alt="logo"></a>
          <button class="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded="false">
            <img class="hamburger" src="/images/hamburger.png" alt="" aria-hidden="true">
            <img class="close" src="/images/close.png" alt="" aria-hidden="true">
            <span class="visually-hidden">menu</span>
          </button>
          <nav class="primary-navigation" id="primary-navigation" aria-label="Primary">
            <ul role="list" class="nav-list">
              <li class="nav-item">
                <a class="nav-link" href="/mainpages/standings/" data-section="standings">standings</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/teams/" data-section="teams">teams</a>
              </li>

              <li class="nav-item has-dropdown">
                <a class="nav-link" href="/scores/scores12/" data-section="scores">scores</a>
                <button class="nav-caret" type="button" aria-expanded="false" aria-controls="nav-menu-scores" aria-label="Toggle scores menu">${caret}</button>
                <div class="nav-dropdown" id="nav-menu-scores">
                  <ul role="list" class="nav-dropdown-list">
                    <li><a href="/scores/scores12/">Series I</a></li>
                    <li><a href="/scores/scores34/">Series II</a></li>
                    <li><a href="/scores/scores56/">Series III</a></li>
                    <li><a href="/scores/scores78/">Series IV</a></li>
                    <li><a href="/scores/scores910/">Series V</a></li>
                    <li><a href="/scores/scores1112/">Series VI</a></li>
                  </ul>
                </div>
              </li>

              <li class="nav-item has-dropdown has-mega">
                <a class="nav-link" href="/stats/qb/" data-section="stats">stats</a>
                <button class="nav-caret" type="button" aria-expanded="false" aria-controls="nav-menu-stats" aria-label="Toggle stats menu">${caret}</button>
                <div class="nav-dropdown nav-mega" id="nav-menu-stats">
                  <div class="nav-mega-col">
                    <p class="nav-group-title">offense</p>
                    <ul role="list" class="nav-dropdown-list">
                      <li><a href="/stats/qb/">Quarterbacks</a></li>
                      <li><a href="/stats/rb/">Running Backs</a></li>
                      <li><a href="/stats/wr/">Wide Receivers</a></li>
                      <li><a href="/stats/te/">Tight Ends</a></li>
                      <li><a href="/stats/c/">Centers</a></li>
                    </ul>
                  </div>
                  <div class="nav-mega-col">
                    <p class="nav-group-title">defense</p>
                    <ul role="list" class="nav-dropdown-list">
                      <li><a href="/stats/de/">Defensive Ends</a></li>
                      <li><a href="/stats/lb/">Linebackers</a></li>
                      <li><a href="/stats/db/">Defensive Backs</a></li>
                    </ul>
                  </div>
                  <div class="nav-mega-col">
                    <p class="nav-group-title">special teams</p>
                    <ul role="list" class="nav-dropdown-list">
                      <li><a href="/stats/k/">Kickers</a></li>
                    </ul>
                    <p class="nav-group-title">record book</p>
                    <ul role="list" class="nav-dropdown-list">
                      <li><a href="/alltime/">All-Time Stats</a></li>
                    </ul>
                  </div>
                </div>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="/mainpages/rulebook/" data-section="rulebook">rulebook</a>
              </li>

              <li class="nav-item has-dropdown">
                <a class="nav-link" href="/mainpages/legacy/legacyscores/" data-section="legacy">legacy</a>
                <button class="nav-caret" type="button" aria-expanded="false" aria-controls="nav-menu-legacy" aria-label="Toggle legacy menu">${caret}</button>
                <div class="nav-dropdown" id="nav-menu-legacy">
                  <ul role="list" class="nav-dropdown-list">
                    <li><a href="/mainpages/legacy/legacyscores/">Legacy</a></li>
                    <li><a href="/mainpages/legacy/champions/">Champions &amp; Awards</a></li>
                    <li><a href="/mainpages/awards/">Award Tracker</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
          <a href="https://discord.gg/afl" class="button | display-sm-none display-md-inline-flex">join now</a>
        </div>
      </div>
    </header>
  `;

  var slot = document.getElementById('site-header');
  if (slot) {
    slot.outerHTML = HEADER_HTML;
  }

  /* ---- Highlight the current section / page ---- */
  (function markActive() {
    var path = location.pathname;
    var sections = [
      { name: 'standings', test: /^\/mainpages\/standings/ },
      { name: 'teams', test: /^\/(teams|team)(\/|$)/ },
      { name: 'scores', test: /^\/(scores|matchup)(\/|$)/ },
      { name: 'stats', test: /^\/(stats|player|alltime)(\/|$)/ },
      { name: 'rulebook', test: /^\/mainpages\/rulebook/ },
      { name: 'legacy', test: /^\/(mainpages\/legacy|mainpages\/awards|docs)(\/|$)/ }
    ];
    var current = null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].test.test(path)) { current = sections[i].name; break; }
    }
    if (current) {
      var parent = document.querySelector('.nav-link[data-section="' + current + '"]');
      if (parent) {
        parent.classList.add('is-active');
        parent.setAttribute('aria-current', 'page');
      }
    }
    /* Exact-match a dropdown sub-link for the current page. */
    var subs = document.querySelectorAll('.nav-dropdown-list a');
    subs.forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && (path === href || path === href.replace(/\/$/, ''))) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'page');
      }
    });
  })();
})();
