/* CGA Instant Fee Quote: reads data/fee-quote.json (built weekly from service pages). */
(function () {
  'use strict';
  var app = document.getElementById('fqApp');
  if (!app) { return; }
  var D = null, G = 0, S = null, T = null, Q = '';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function inr(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }
  function wa(t) { return 'https://wa.me/919996647888?text=' + encodeURIComponent(t); }
  function paint() {
    if (!D) { app.innerHTML = '<p class="fq-muted">Fees load ho rahi hai...</p>'; return; }
    var h = '<div class="fq-search"><input id="fqQ" type="search" placeholder="Service dhoondhiye: jaise ITR, GST, company, trademark..." value="' + esc(Q) + '"></div>';
    var list = [];
    if (Q) { var q = Q.toLowerCase(); D.groups.forEach(function (g) { g.s.forEach(function (s) { if ((s.n + ' ' + s.p).toLowerCase().indexOf(q) >= 0) { list.push(s); } }); }); }
    else {
      h += '<div class="fq-chips">' + D.groups.map(function (g, i) { return '<button type="button" class="fq-chip' + (i === G ? ' on' : '') + '" data-g="' + i + '">' + esc(g.g) + '</button>'; }).join('') + '</div>';
      list = D.groups[G].s;
    }
    h += '<div class="fq-svcs">' + (list.length ? list.map(function (s) { var lo = s.t.filter(function (t) { return t.from; }).map(function (t) { return t.from; }); return '<button type="button" class="fq-svc' + (S && S.p === s.p ? ' on' : '') + '" data-s="' + esc(s.p) + '"><b>' + esc(s.n) + '</b><span>' + (lo.length ? inr(Math.min.apply(null, lo)) + ' se shuru' : 'Fixed quote') + '</span></button>'; }).join('') : '<p class="fq-muted">Is naam se koi service nahi mili. WhatsApp par poochhiye.</p>') + '</div>';
    if (S) {
      h += '<h3 class="fq-h">' + esc(S.n) + ': aapka case kaunsa hai?</h3><div class="fq-tiers">' + S.t.map(function (t, i) { return '<button type="button" class="fq-tier' + (T === i ? ' on' : '') + '" data-t="' + i + '"><span class="fq-code">' + esc(t.c) + '</span><b>' + esc(t.n) + '</b><small>' + esc(t.f) + '</small><em>' + (t.from ? inr(t.from) + ' se' : 'Quote') + '</em></button>'; }).join('') + '</div>';
      if (T != null) {
        var t = S.t[T], gst = t.from ? Math.round(t.from * 0.18) : 0;
        h += '<div class="fq-res"><div class="fq-res-top"><div><span class="fq-muted">' + esc(S.n) + ' &middot; ' + esc(t.c) + '</span><h3>' + esc(t.n) + '</h3></div>' +
          (t.from ? '<div class="fq-price"><span>Shuruati fees</span><b>' + inr(t.from) + '</b><small>+ GST 18% ' + inr(gst) + ' = <b>' + inr(t.from + gst) + '</b></small></div>' : '<div class="fq-price"><span>Fees</span><b style="font-size:1.2rem">Fixed quote</b><small>Scope dekh kar likhit quote, kaam se pehle</small></div>') + '</div>' +
          (t.i && t.i.length ? '<p class="fq-lbl">Isme shamil hai</p><ul class="fq-inc">' + t.i.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') +
          '<p class="fq-muted">' + (t.from ? 'Ye "se shuru" fees hai. Exact fees aapke documents aur scope dekhne ke baad fix hoti hai, aur kaam shuru hone se pehle likhit mein milti hai. Government fees / stamp duty (jahan lagti hai) alag.' : 'Is kaam ki fees aapke case par depend karti hai. WhatsApp par details bhejiye, team likhit quote bhejegi.') + '</p>' +
          '<div class="fq-cta"><a class="btn btn-gold" href="' + esc(S.p) + '#fees">Abhi shuru kariye</a><a class="btn fq-ghost" href="' + wa('Namaste, mujhe ' + S.n + ' (' + t.c + ' - ' + t.n + ') ka quote chahiye.') + '" target="_blank" rel="noopener">WhatsApp par quote lijiye</a><a class="btn fq-ghost" href="' + esc(S.p) + '">Service ki poori jaankari</a></div></div>';
      }
    }
    if (D.updated) { h += '<p class="fq-muted" style="margin-top:1rem">Fees list update: ' + esc(D.updated) + '</p>'; }
    var had = document.activeElement && document.activeElement.id === 'fqQ';
    app.innerHTML = h;
    if (had) { var qi = document.getElementById('fqQ'); qi.focus(); qi.setSelectionRange(qi.value.length, qi.value.length); }
    wire();
  }
  function find(p) { var r = null; D.groups.forEach(function (g) { g.s.forEach(function (s) { if (s.p === p) { r = s; } }); }); return r; }
  function wire() {
    var q = document.getElementById('fqQ'); if (q) { q.oninput = function () { Q = this.value.trim(); paint(); }; }
    Array.prototype.forEach.call(app.querySelectorAll('[data-g]'), function (b) { b.onclick = function () { G = Number(b.getAttribute('data-g')); S = null; T = null; paint(); }; });
    Array.prototype.forEach.call(app.querySelectorAll('[data-s]'), function (b) { b.onclick = function () { S = find(b.getAttribute('data-s')); T = S && S.t.length === 1 ? 0 : null; paint(); var h = app.querySelector('.fq-h'); if (h && h.scrollIntoView) { h.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }; });
    Array.prototype.forEach.call(app.querySelectorAll('[data-t]'), function (b) { b.onclick = function () { T = Number(b.getAttribute('data-t')); paint(); var r = app.querySelector('.fq-res'); if (r && r.scrollIntoView) { r.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } }; });
  }
  paint();
  fetch('data/fee-quote.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) {
    D = d;
    var want = (location.hash || '').replace('#', '');
    if (want) { var s = find(want + '.html') || find(want); if (s) { S = s; D.groups.forEach(function (g, i) { if (g.s.indexOf(s) >= 0) { G = i; } }); } }
    paint();
  }).catch(function () { app.innerHTML = '<p class="fq-muted">Fees load nahi ho payi. <a href="https://wa.me/919996647888">WhatsApp par poochhiye</a>.</p>'; });
})();
