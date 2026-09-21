/* CGA language switcher — folder based. Each language lives at /<code>/<page>. English is the root. */
(function () {
  var LANGS = [
    ['en', 'English'],
    ['hi', 'हिंदी'],
    ['bn', 'বাংলা'],
    ['mr', 'मराठी'],
    ['te', 'తెలుగు'],
    ['ta', 'தமிழ்'],
    ['gu', 'ગુજરાતી'],
    ['ur', 'اردو'],
    ['kn', 'ಕನ್ನಡ'],
    ['or', 'ଓଡ଼ିଆ'],
    ['ml', 'മലയാളം'],
    ['pa', 'ਪੰਜਾਬੀ'],
    ['as', 'অসমীয়া']
  ];
  var LIVE = 'en,hi';
  /* pages already translated, per language; empty string means all pages */
  var DONE = { hi: 'about.html,achievements.html,article-12ab-80g.html,article-itr-notice.html,article-pvtltd-vs-llp.html,bank-finance-news.html,case-laws.html,cga.html,clients.html,compliance-calendar.html,contact.html,crypto-tax.html,ecommerce-sellers.html,foreign-income.html,fssai-licence.html,gallery.html,govt-updates.html,gst-notice-sos.html,gst-registration.html,gst-return-filing.html,gujarat-startup-funding.html,health-check.html,index.html,insights.html,privacy.html' };
  var live = LIVE.split(',');
  var codes = {}; for (var i = 0; i < LANGS.length; i++) codes[LANGS[i][0]] = LANGS[i];

  var parts = location.pathname.split('/').filter(Boolean);
  var cur = 'en', page = parts.length ? parts[parts.length - 1] : '';
  if (parts.length > 1 && codes[parts[0]]) cur = parts[0];
  if (!page || page.indexOf('.') < 0) page = 'index.html';

  function has(code) {
    if (code === 'en') return true;
    var d = DONE[code];
    if (d == null || d === '') return true;
    return (',' + d + ',').indexOf(',' + page + ',') >= 0;
  }
  function urlFor(code) { return (code === 'en' ? '/' : '/' + code + '/') + page; }

  /* Link guard: on a translated page, a link to a page not yet translated opens the
     English page (no 404); a link to a translated page stays in the language folder.
     The click handler also covers links added later by scripts (health-check). */
  function fixLink(a) {
    if (cur === 'en' || !a || !a.getAttribute) return;
    var h = a.getAttribute('href');
    if (!h || h.indexOf(':') >= 0 || h.charAt(0) === '/' || h.charAt(0) === '#') return;
    if (h.indexOf('../') === 0) h = h.slice(3);
    var cut = h.search(/[#?]/), pg = cut < 0 ? h : h.slice(0, cut), tail = cut < 0 ? '' : h.slice(cut);
    if (!/^[A-Za-z0-9_-]+[.]html$/.test(pg)) return;
    var d = DONE[cur], ok = (d == null || d === '') || (',' + d + ',').indexOf(',' + pg + ',') >= 0;
    var want = (ok ? '/' + cur + '/' : '/') + pg + tail;
    if (a.getAttribute('href') !== want) a.setAttribute('href', want);
  }
  if (cur !== 'en') {
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (a) fixLink(a);
    }, true);
    var fixAll = function () { var as = document.querySelectorAll('a[href]'); for (var k = 0; k < as.length; k++) fixLink(as[k]); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fixAll); else fixAll();
  }

  var css = document.createElement('style');
  css.textContent = '.cga-lang{display:inline-flex;align-items:center;gap:.3rem;margin-left:auto;flex:0 0 auto}'
    + '.cga-lang select{appearance:none;background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.35);'
    + 'border-radius:4px;font:inherit;font-size:.78rem;font-weight:600;padding:.12rem 1.4rem .12rem .5rem;cursor:pointer}'
    + '.cga-lang select option{color:#111;background:#fff}'
    + '.cga-lang svg{margin-left:-1.25rem;pointer-events:none;opacity:.8}'
    + '@media(max-width:700px){.topbar .tb-left a:nth-child(3){display:none}}';
  document.head.appendChild(css);

  var box = document.createElement('div');
  box.className = 'cga-lang';
  var sel = document.createElement('select');
  sel.setAttribute('aria-label', 'Choose language / भाषा चुनें');
  var shown = 0;
  for (var j = 0; j < LANGS.length; j++) {
    var L = LANGS[j];
    if (live.indexOf(L[0]) < 0) continue;
    if (!has(L[0]) && L[0] !== cur) continue;
    var o = document.createElement('option');
    o.value = L[0]; o.textContent = L[1];
    if (L[0] === cur) o.selected = true;
    sel.appendChild(o); shown++;
  }
  if (shown < 2) return;
  sel.onchange = function () {
    try { localStorage.setItem('cga_lang', sel.value); } catch (e) {}
    location.href = urlFor(sel.value);
  };
  box.appendChild(sel);
  var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  arrow.setAttribute('width', '10'); arrow.setAttribute('height', '10'); arrow.setAttribute('viewBox', '0 0 10 10');
  arrow.innerHTML = '<path d="M1 3l4 4 4-4" fill="none" stroke="#fff" stroke-width="1.6"/>';
  box.appendChild(arrow);

  function mount() {
    var bar = document.querySelector('.topbar .wrap');
    if (bar) bar.appendChild(box);
    else { box.style.position = 'fixed'; box.style.top = '8px'; box.style.right = '8px'; box.style.zIndex = 99; document.body.appendChild(box); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
