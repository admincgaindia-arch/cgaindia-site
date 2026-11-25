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
