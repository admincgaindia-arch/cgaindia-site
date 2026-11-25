/* CGA Live (homepage) - live deadline countdown + today's self-updating feed.
   Data: data/compliance-rules.json, data/case-laws.json, data/govt-updates.json,
   data/finance-news.json, judgments/manifest.json, data/events.json (all refreshed daily by n8n). */
(function () {
  'use strict';
  var root = document.getElementById('cga-live');
  if (!root) { return; }
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var IST = 19800000;
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var KEY = ['gstr1m', 'gstr3bm', 'tdsdep', 'pf', 'pmt06', 'tdsret', 'advtax', 'gstr9', 'gstr9c', 'cmp08', 'itr12', 'itr34', 'itraud', 'itrco', 'taxaudit', 'aoc4', 'mgt7', 'dir3', 'dpt3', 'llp11', 'llp8', 'msme1', 'gstr4', 'form16a'];
  var LAW = { IT: 'Income Tax', GST: 'GST', MCA: 'MCA / ROC', LAB: 'Labour', OTH: 'Other' };
  var WIN = { M: 31, Q: 92, H: 183, A: 365 };

  function istParts(ms) { var d = new Date(ms + IST); return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() }; }
  function todayStr() { var p = istParts(Date.now()); return p.y + '-' + ('0' + p.m).slice(-2) + '-' + ('0' + p.d).slice(-2); }
  /* end of the due day (23:59:59 IST) in epoch ms; clamps 31 Feb -> last day of month */
  function dueEnd(y, m, d) { var last = new Date(Date.UTC(y, m, 0)).getUTCDate(); if (d > last) { d = last; } return { ms: Date.UTC(y, m - 1, d, 23, 59, 59) - IST, y: y, m: m, d: d }; }
  function occs(it, y) {
    var a = [], k;
    if (it.q === 'M' && it.day) { for (k = 1; k <= 12; k++) { a.push(dueEnd(y, k, (it.sp === 'tds' && k === 4) ? 30 : it.day)); } }
    else if (it.dt) { for (k = 0; k < it.dt.length; k++) { var p = String(it.dt[k]).split('-'); a.push(dueEnd(y, +p[0], +p[1])); } }
    return a;
  }
  function nextDue(it, ovr) {
    if (it.q === 'E') { return null; }
    if (ovr && ovr[it.id] && ovr[it.id].date) { var o = ovr[it.id].date.split('-'); var x = dueEnd(+o[0], +o[1], +o[2]); return x.ms >= Date.now() ? x : null; }
    var now = Date.now(), y = istParts(now).y, list = occs(it, y).concat(occs(it, y + 1));
    list.sort(function (a, b) { return a.ms - b.ms; });
    for (var i = 0; i < list.length; i++) { if (list[i].ms >= now) { return list[i]; } }
    return null;
  }
  function esc(s) { return String(s == null ? '' : s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function get(u) { return fetch(u + (u.indexOf('?') < 0 ? '?' : '&') + 'v=' + todayStr(), { cache: 'no-cache' }).then(function (r) { if (!r.ok) { throw new Error(u); } return r.json(); }).catch(function () { return null; }); }

  var dlBox = root.querySelector('[data-live="deadlines"]');
  var feedBox = root.querySelector('[data-live="feed"]');
  var stampBox = root.querySelector('[data-live="stamp"]');
  var cards = [];

  function renderDeadlines(rules) {
    if (!rules || !rules.items || !dlBox) { return; }
    var ovr = rules.overrides || {}, seen = {}, rows = [];
    rules.items.forEach(function (it) {
      if (KEY.indexOf(it.id) < 0) { return; }
      var n = nextDue(it, ovr); if (!n) { return; }
      var k = it.f.replace(/\s*\(.*\)$/, '') + n.ms; if (seen[k]) { return; } seen[k] = 1;
      rows.push({ it: it, n: n });
    });
    rows.sort(function (a, b) { return a.n.ms - b.n.ms; });
    rows = rows.slice(0, 6);
    if (!rows.length) { return; }
    var C = 2 * Math.PI * 34;
    dlBox.innerHTML = rows.map(function (r, i) {
      return '<a class="cl-dl" href="compliance-calendar.html" style="--i:' + i + '">'
        + '<svg class="cl-ring" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="34" class="cl-ring-bg"/><circle cx="40" cy="40" r="34" class="cl-ring-fg" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + C.toFixed(1) + '"/></svg>'
        + '<span class="cl-days"><b>0</b><small>din</small></span>'
        + '<span class="cl-dl-t"><em>' + esc(LAW[r.it.l] || r.it.l) + '</em><strong>' + esc(r.it.f) + '</strong><span>' + r.n.d + ' ' + MON[r.n.m - 1] + ' ' + r.n.y + '</span><code class="cl-cd" aria-live="off">--</code></span></a>';
    }).join('');
    var els = dlBox.querySelectorAll('.cl-dl');
    cards = rows.map(function (r, i) { return { el: els[i], ms: r.n.ms, win: (WIN[r.it.q] || 31) * 86400000, C: C }; });
    tick(true);
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tick(first) {
    var now = Date.now();
    cards.forEach(function (c) {
      var left = Math.max(0, c.ms - now), s = Math.floor(left / 1000);
      var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
      c.el.querySelector('.cl-cd').textContent = d + 'd ' + pad(h) + 'h ' + pad(m) + 'm ' + pad(sec) + 's';
      var dEl = c.el.querySelector('.cl-days b');
      if (first || dEl.getAttribute('data-done')) { dEl.textContent = d; }
      c.el.classList.toggle('is-near', d <= 3);
      if (first) {
        var frac = Math.min(1, left / c.win), ring = c.el.querySelector('.cl-ring-fg');
        c.target = (c.C * (1 - frac)).toFixed(1); c.days = d;
        if (RM) { ring.style.strokeDashoffset = c.target; dEl.setAttribute('data-done', '1'); }
        else { dEl.textContent = '0'; }
      }
    });
  }
  function animateIn() {
    cards.forEach(function (c, i) {
      var ring = c.el.querySelector('.cl-ring-fg'), dEl = c.el.querySelector('.cl-days b');
      setTimeout(function () { ring.style.strokeDashoffset = c.target; countUp(dEl, c.days, 900, function () { dEl.setAttribute('data-done', '1'); }); }, 120 * i);
    });
  }
  function countUp(el, to, dur, cb) {
    if (RM || !to) { el.textContent = to; if (cb) { cb(); } return; }
    var t0 = null;
    function f(t) { if (!t0) { t0 = t; } var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(to * e).toLocaleString('en-IN'); if (p < 1) { requestAnimationFrame(f); } else if (cb) { cb(); } }
    requestAnimationFrame(f);
  }
  function dayItems(feed, key) { var t = todayStr(); var day = (feed && feed.days || []).filter(function (x) { return x.date === t; })[0]; return day ? (day[key] || []) : []; }
  function renderFeed(cl, gu, fn, jm, ev) {
    if (!feedBox) { return; }
    var nJ = jm && jm.items ? Object.keys(jm.items).length : 0;
    var stats = [
      { n: dayItems(cl, 'cases').length, l: 'Case laws aaj', h: 'case-laws.html' },
      { n: dayItems(gu, 'items').length, l: 'Govt updates aaj', h: 'govt-updates.html' },
      { n: dayItems(fn, 'items').length, l: 'Bank &amp; finance news aaj', h: 'bank-finance-news.html' },
      { n: nJ, l: 'Judgments library mein', h: 'case-law-search.html' },
      { n: ev && ev.count ? ev.count : 0, l: 'Professional events', h: 'events.html' }
    ].filter(function (s) { return s.n > 0; });
    var heads = dayItems(gu, 'items').concat(dayItems(fn, 'items')).map(function (x) { return x.headline; }).filter(Boolean).slice(0, 8);
    feedBox.innerHTML = '<div class="cl-stats">' + stats.map(function (s) { return '<a class="cl-st" href="' + s.h + '"><b data-n="' + s.n + '">0</b><span>' + s.l + '</span></a>'; }).join('') + '</div>'
      + (heads.length ? '<a class="cl-head" href="govt-updates.html"><span class="cl-tag">Abhi aaya</span><span class="cl-rot" aria-live="polite">' + esc(heads[0]) + '</span></a>' : '');
    var stamps = [cl, gu, fn].map(function (x) { return x && x.last_updated ? Date.parse(x.last_updated) : 0; }).filter(Boolean);
    if (stampBox && stamps.length) { var t = new Date(Math.max.apply(null, stamps) + IST), isToday = t.toISOString().slice(0, 10) === todayStr(); stampBox.textContent = (isToday ? 'Aaj ' : t.getUTCDate() + ' ' + MON[t.getUTCMonth()] + ', ') + pad(t.getUTCHours()) + ':' + pad(t.getUTCMinutes()) + ' IST par apne aap update hua'; }
    if (heads.length > 1) {
      var i = 0, rot = feedBox.querySelector('.cl-rot');
      setInterval(function () { if (document.hidden) { return; } i = (i + 1) % heads.length; rot.classList.add('out'); setTimeout(function () { rot.textContent = heads[i]; rot.classList.remove('out'); }, RM ? 0 : 320); }, 4200);
    }
  }
  function onView(cb) {
    if (!('IntersectionObserver' in window)) { cb(); return; }
    var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { io.disconnect(); cb(); } }, { threshold: 0.25 });
    io.observe(root);
  }

  Promise.all([get('data/compliance-rules.json'), get('data/case-laws.json'), get('data/govt-updates.json'), get('data/finance-news.json'), get('judgments/manifest.json'), get('data/events.json')]).then(function (r) {
    renderDeadlines(r[0]);
    renderFeed(r[1], r[2], r[3], r[4], r[5]);
    root.classList.add('is-ready');
    setInterval(function () { if (!document.hidden) { tick(false); } }, 1000);
    onView(function () {
      root.classList.add('is-in');
      animateIn();
      Array.prototype.forEach.call(root.querySelectorAll('.cl-st b'), function (b, i) { setTimeout(function () { countUp(b, +b.getAttribute('data-n'), 1100); }, 90 * i); });
    });
  });
})();
