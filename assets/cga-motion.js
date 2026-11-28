/* CGA motion layer (site-wide, loaded from lang.js): scroll progress bar + cursor spotlight on cards.
   Fully disabled for prefers-reduced-motion; spotlight only on fine-pointer (mouse) devices. */
(function () {
  'use strict';
  if (window.__cgaMotion) { return; } window.__cgaMotion = 1;
  var mm = window.matchMedia ? function (q) { return window.matchMedia(q).matches; } : function () { return false; };
  if (mm('(prefers-reduced-motion: reduce)')) { return; }
  var css = '#cgaProg{position:fixed;left:0;top:0;height:3px;width:100%;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,#0e7ea0,#4bbdd8,#9be7ff);z-index:2147483000;pointer-events:none;opacity:0;transition:opacity .3s}'
    + '#cgaProg.on{opacity:1}'
    + '.cga-spot{isolation:isolate}.cga-spot-rel{position:relative}'
    + '.cga-spot::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(260px circle at var(--mx,50%) var(--my,50%),var(--spot,rgba(14,126,160,.10)),transparent 65%);z-index:-1}'
    + '.cga-spot:hover::after{opacity:1}'
    + '.cl-band .cga-spot{--spot:rgba(155,231,255,.14)}';
  var st = document.createElement('style'); st.id = 'cga-motion-css'; st.textContent = css; document.head.appendChild(st);

  function ready(f) { if (document.readyState !== 'loading') { f(); } else { document.addEventListener('DOMContentLoaded', f); } }
  ready(function () {
    /* 1. scroll progress */
    var bar = document.createElement('div'); bar.id = 'cgaProg'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar);
    var raf = 0;
    function upd() { raf = 0; var h = document.documentElement, max = h.scrollHeight - h.clientHeight; if (max < 400) { bar.classList.remove('on'); return; } var p = Math.min(1, Math.max(0, (h.scrollTop || document.body.scrollTop) / max)); bar.style.transform = 'scaleX(' + p.toFixed(4) + ')'; bar.classList.toggle('on', p > 0.005); }
    window.addEventListener('scroll', function () { if (!raf) { raf = requestAnimationFrame(upd); } }, { passive: true });
    window.addEventListener('resize', function () { if (!raf) { raf = requestAnimationFrame(upd); } }, { passive: true });
    upd();

    /* 2. cursor spotlight (mouse only) */
    if (!mm('(hover: hover) and (pointer: fine)')) { return; }
    var SEL = '.card,.tm-card,.cat-card,.cg-card,.cl-dl,.cl-st';
    function mark(rootEl) { Array.prototype.forEach.call((rootEl || document).querySelectorAll(SEL), function (el) { if (!el.classList.contains('cga-spot')) { try { if (getComputedStyle(el).position === 'static') { el.classList.add('cga-spot-rel'); } } catch (x) {} el.classList.add('cga-spot'); } }); }
    mark();
    setTimeout(mark, 2500);
    document.addEventListener('pointermove', function (e) {
      var el = e.target && e.target.closest ? e.target.closest('.cga-spot') : null;
      if (!el) { if (e.target && e.target.closest && e.target.closest(SEL)) { mark(); } return; }
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  });
})();

/* CGA motion v2 (28 Nov 2026): scroll reveal, hero entrance, number count-up, smooth anchors, card hover lift.
   Uses the individual `translate` property so existing transform-based hovers are never overridden.
   Off for prefers-reduced-motion, print, and browsers without IntersectionObserver. */
(function () {
  'use strict';
  if (window.__cgaAnim2) { return; } window.__cgaAnim2 = 1;
  try {
    var mm = window.matchMedia ? function (q) { return window.matchMedia(q).matches; } : function () { return false; };
    if (mm('(prefers-reduced-motion: reduce)') || !('IntersectionObserver' in window) || window.top !== window.self) { return; }
    if (!window.CSS || !CSS.supports || !CSS.supports('translate', '0 10px')) { return; }
    var EASE = 'cubic-bezier(.2,.7,.2,1)';
    var css = 'html{scroll-behavior:smooth}'
      + '.cga-rv{opacity:0;translate:0 26px;transition:opacity .75s ' + EASE + ',translate .75s ' + EASE + ';transition-delay:var(--cga-d,0s)}'
      + '.cga-rv.cga-in{opacity:1;translate:none}'
      + '.cga-rv-z{translate:none;scale:.94;transition:opacity .75s ' + EASE + ',scale .75s ' + EASE + ';transition-delay:var(--cga-d,0s)}'
      + '.cga-rv-z.cga-in{scale:none}'
      + '@keyframes cgaUp{from{opacity:0;translate:0 18px}to{opacity:1;translate:none}}'
      + '.cga-hero-in{animation:cgaUp .9s ' + EASE + ' both;animation-delay:var(--cga-d,0s)}'
      + '.cg-card:not(.cga-rv),.cg-step:not(.cga-rv),.cg-off:not(.cga-rv){transition:translate .35s ' + EASE + ',box-shadow .35s ' + EASE + ',border-color .35s}'
      + '@media (hover:hover){.cg-card:hover,.cg-step:hover,.cg-off:hover{translate:0 -6px;box-shadow:0 22px 44px -28px rgba(0,59,87,.45)}'
      + '.cg-btn{transition:translate .25s ' + EASE + ',box-shadow .25s,background .25s,border-color .25s,color .25s}.cg-btn:hover{translate:0 -2px;box-shadow:0 12px 24px -14px rgba(0,59,87,.55)}}'
      + '@media print{.cga-rv{opacity:1!important;translate:none!important;scale:none!important}}';
    var st = document.createElement('style'); st.id = 'cga-anim2-css'; st.textContent = css; document.head.appendChild(st);

    var SKIP = 'nav,header,.topbar,.mega,.dropdown,[class^="cm-"],[class*=" cm-"],.cga-mbar,.sticky-cta,.cg-slide,.cgc-item,[aria-hidden="true"],#cgaProg,form,.az-chip,[class*="aarzoo"],[class*="ticker"],[class*="marquee"]';
    function bad(el) { try { return !!el.closest(SKIP); } catch (e) { return true; } }
    function cs(el) { return window.getComputedStyle(el); }
    var vh = window.innerHeight || 800;

    /* 1. Hero entrance: first section's text and buttons, only where nothing animates already */
    var hero = document.querySelector('.cg-hero, .tm-hero, main section, body > section');
    if (hero && hero.getBoundingClientRect().top < vh) {
      var hk = hero.querySelectorAll('h1, .cg-kicker, .tm-lede, .cg-sub, .cg-btns, .cga-hcta, h1 + p');
      var hd = 0;
      Array.prototype.forEach.call(hk, function (el) {
        if (bad(el) || cs(el).animationName !== 'none') { return; }
        el.style.setProperty('--cga-d', (hd++ * 0.12) + 's');
        el.classList.add('cga-hero-in');
        el.addEventListener('animationend', function f() { el.classList.remove('cga-hero-in'); el.style.removeProperty('--cga-d'); el.removeEventListener('animationend', f); });
      });
    }

    /* 2. Scroll reveal */
    var SEL = 'section h2, section .cg-kicker, section .cg-sub, section [class*="card"], section .cg-step, section .cg-off, section .cg-prac, section .cg-g, section img, section blockquote, footer .ft-col, .cg-founder > *';
    var seen = [], groups = new Map();
    Array.prototype.forEach.call(document.querySelectorAll(SEL), function (el) {
      if (bad(el) || el === hero || (hero && hero.contains(el))) { return; }
      for (var i = 0; i < seen.length; i++) { if (seen[i].contains(el)) { return; } }
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 || r.width === 0 || r.height === 0) { return; }
      var c = cs(el);
      if (c.position === 'fixed' || c.position === 'sticky' || c.animationName !== 'none' || parseFloat(c.opacity) < 0.99) { return; }
      seen.push(el);
      var p = el.parentElement, n = groups.get(p) || 0; groups.set(p, n + 1);
      el.style.setProperty('--cga-d', Math.min(n, 5) * 0.08 + 's');
      if (el.tagName === 'IMG') { el.classList.add('cga-rv-z'); }
      el.classList.add('cga-rv');
    });
    function done(el) {
      el.classList.remove('cga-rv', 'cga-in', 'cga-rv-z'); el.style.removeProperty('--cga-d');
    }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        var el = en.target; io.unobserve(el);
        el.classList.add('cga-in');
        setTimeout(function () { done(el); }, 1300);
        countIn(el);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });
    seen.forEach(function (el) { io.observe(el); });
    /* Fallback: on scroll, reveal anything already in or above the viewport; reveal all at page end or after 25s */
    var tk = 0;
    function sweep(all) {
      tk = 0; var h = window.innerHeight || 800, left = 0;
      seen.forEach(function (el) {
        if (!el.classList.contains('cga-rv') || el.classList.contains('cga-in')) { return; }
        if (all || el.getBoundingClientRect().top < h * 0.97) { io.unobserve(el); el.classList.add('cga-in'); countIn(el); setTimeout(function () { done(el); }, 1300); } else { left++; }
      });
      if (!left) { window.removeEventListener('scroll', onSc); }
    }
    function onSc() {
      if (tk) { return; } tk = 1;
      setTimeout(function () { var de = document.documentElement; sweep(window.innerHeight + window.scrollY >= de.scrollHeight - 80); }, 120);
    }
    window.addEventListener('scroll', onSc, { passive: true });
    setTimeout(function () { sweep(true); }, 25000);
    /* Show everything before printing */
    window.addEventListener('beforeprint', function () { seen.forEach(done); });

    /* 3. Count-up for big standalone numbers (e.g. 2,650+ / 15+ / 98%) */
    var NUM = /^\s*(₹\s?)?(\d{1,3}(?:,\d{2,3})*|\d+)(\.\d+)?\s*(\+|%|K\+|L\+|Cr\+|x)?\s*$/;
    var counters = [];
    Array.prototype.forEach.call(document.querySelectorAll('section *, footer *'), function (el) {
      if (el.children.length || bad(el)) { return; }
      var t = el.textContent; if (!t || t.length > 14 || !NUM.test(t)) { return; }
      if (parseFloat(cs(el).fontSize) < 22) { return; }
      var m = t.match(NUM), v = parseFloat((m[2] + (m[3] || '')).replace(/,/g, ''));
      if (!(v >= 5) || v > 1e7 || /^(19|20)\d\d$/.test(m[2])) { return; }
      counters.push({ el: el, v: v, txt: t, pre: m[1] || '', suf: m[4] || '', dec: m[3] ? m[3].length - 1 : 0, comma: m[2].indexOf(',') >= 0 });
    });
    function fmt(c, x) {
      var s = c.dec ? x.toFixed(c.dec) : String(Math.round(x));
      if (c.comma) { s = Number(s).toLocaleString('en-IN', { minimumFractionDigits: c.dec, maximumFractionDigits: c.dec }); }
      return c.pre + s + c.suf;
    }
    function run(c) {
      if (c.ran) { return; } c.ran = 1;
      var w = c.el.getBoundingClientRect().width; if (w) { c.el.style.minWidth = w + 'px'; c.el.style.display = cs(c.el).display === 'inline' ? 'inline-block' : ''; }
      var t0 = null, D = 1400;
      function step(ts) {
        if (!t0) { t0 = ts; }
        var k = Math.min(1, (ts - t0) / D), e = 1 - Math.pow(1 - k, 3);
        c.el.textContent = k < 1 ? fmt(c, c.v * e) : c.txt;
        if (k < 1) { requestAnimationFrame(step); } else { c.el.style.minWidth = ''; }
      }
      requestAnimationFrame(step);
    }
    function countIn(scope) { counters.forEach(function (c) { if (scope.contains(c.el)) { run(c); } }); }
    if (counters.length) {
      var io2 = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { if (en.isIntersecting) { io2.unobserve(en.target); counters.forEach(function (c) { if (c.el === en.target) { run(c); } }); } });
      }, { threshold: 0.6 });
      counters.forEach(function (c) { io2.observe(c.el); });
    }
  } catch (e) { try { document.querySelectorAll('.cga-rv').forEach(function (el) { el.classList.remove('cga-rv'); }); } catch (x) {} }
})();
