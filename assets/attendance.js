/* CGA Staff Attendance widget for the portal (staff / senior / admin). */
(function () {
  'use strict';
  var API = 'https://cga.app.n8n.cloud/webhook/cga-attendance';
  var S = null; try { S = JSON.parse(localStorage.getItem('cga_portal_session') || 'null'); } catch (e) { S = null; }
  if (!S || !S.token || ['staff', 'senior', 'admin'].indexOf(String(S.role || '').toLowerCase()) < 0) { return; }
  var isAll = ['senior', 'admin'].indexOf(String(S.role).toLowerCase()) >= 0;
  var ST = null, TD = null, mode = 'office', busy = false, msgTxt = '', msgBad = false;
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function call(body) { body.token = S.token; return fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(function (r) { return r.json(); }); }
  function hrs(a, b) { if (!a || !b) { return ''; } var p = a.split(':'), q = b.split(':'); var m = (q[0] * 60 + +q[1]) - (p[0] * 60 + +p[1]); return m > 0 ? (m / 60).toFixed(1) + ' ghante' : ''; }
  var MI = { office: '&#127970;', wfh: '&#127968;', client: '&#128188;', field: '&#128205;' };
  var css = '.at-card{background:#fff;border:1px solid #e3ebf0;border-radius:18px;padding:1rem 1.2rem;margin:0 0 1rem;box-shadow:0 8px 24px rgba(16,42,67,.06)}.at-h{display:flex;justify-content:space-between;align-items:center;gap:.6rem;flex-wrap:wrap}.at-h b{font-size:1.05rem;color:#00293d}' +
    '.at-modes{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:.5rem;margin:.8rem 0}.at-m{border:1.5px solid #dfe8ee;background:#fff;border-radius:12px;padding:.6rem;font:inherit;font-weight:700;cursor:pointer;color:#00293d}.at-m.on{border-color:#005176;background:#f0f8fb;box-shadow:0 0 0 3px rgba(0,81,118,.12)}' +
    '.at-in{width:100%;box-sizing:border-box;border:1px solid #c9d6de;border-radius:10px;padding:.6rem .7rem;font:inherit;margin-bottom:.6rem}.at-go{width:100%;border:0;border-radius:12px;padding:.75rem;font:inherit;font-weight:800;color:#fff;background:linear-gradient(90deg,#059669,#10b981);cursor:pointer}.at-go.out{background:linear-gradient(90deg,#b45309,#f59e0b)}.at-go:disabled{opacity:.6}' +
    '.at-st{display:flex;align-items:center;gap:.7rem;margin-top:.7rem}.at-dot{width:12px;height:12px;border-radius:50%;background:#10b981;box-shadow:0 0 0 4px rgba(16,185,129,.2)}.at-msg{margin:.5rem 0 0;font-weight:700;color:#005176;font-size:.9rem}.at-msg.bad{color:#b3261e}' +
    '.at-cnt{display:flex;flex-wrap:wrap;gap:.5rem;margin:.7rem 0}.at-c{border-radius:12px;padding:.45rem .8rem;font-weight:800;font-size:.9rem}.at-tw{overflow-x:auto}.at-t{width:100%;border-collapse:collapse;font-size:.88rem}.at-t th{text-align:left;background:#f3f7f9;padding:.45rem .5rem;color:#00293d}.at-t td{padding:.45rem .5rem;border-top:1px solid #eef3f6}' +
    '.at-b{display:inline-block;border-radius:999px;padding:.1rem .55rem;font-weight:800;font-size:.75rem}.at-row{display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;margin-top:.7rem}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  function widget() {
    if (!ST) { return '<div class="at-card"><div class="at-h"><b>&#128337; Attendance</b><span style="color:#5b6b75">Load ho raha hai...</span></div></div>'; }
    var h = '<div class="at-card" id="atCard"><div class="at-h"><b>&#128337; Aaj ki attendance</b><span style="color:#5b6b75;font-size:.85rem">Late ke baad: ' + esc(ST.late_after) + '</span></div>';
    if (ST.inNow) {
      h += '<div class="at-st"><span class="at-dot"></span><div><b>Check-in: ' + esc(ST.first.time) + '</b>' + (ST.first.late ? ' <span class="at-b" style="background:#fef3c7;color:#92400e">Late</span>' : '') + '<br><span style="color:#5b6b75">' + (MI[ST.first.mode] || '') + ' ' + esc((ST.modes || {})[ST.first.mode] || ST.first.mode) + (ST.first.place ? ' &middot; ' + esc(ST.first.place) : '') + '</span></div></div><button type="button" class="at-go out" id="atOut" style="margin-top:.8rem"' + (busy ? ' disabled' : '') + '>Check-out kariye</button>';
    } else if (ST.first) {
      h += '<div class="at-st"><span class="at-dot" style="background:#94a3b8;box-shadow:none"></span><div><b>Aaj ka kaam: ' + esc(ST.first.time) + ' &ndash; ' + esc(ST.lastOut ? ST.lastOut.time : '') + '</b> ' + esc(hrs(ST.first.time, ST.lastOut && ST.lastOut.time)) + '<br><span style="color:#5b6b75">Dobara kaam shuru karna ho to neeche se check-in kariye.</span></div></div>' + form();
    } else { h += form(); }
    h += '<p class="at-msg' + (msgBad ? ' bad' : '') + '" id="atMsg">' + esc(msgTxt) + '</p></div>';
    if (isAll) { h += teamBox(); }
    return h;
  }
  function form() {
    var M = ST.modes || {};
    var f = '<div class="at-modes">' + Object.keys(M).map(function (k) { return '<button type="button" class="at-m' + (k === mode ? ' on' : '') + '" data-am="' + k + '">' + (MI[k] || '') + ' ' + esc(M[k]) + '</button>'; }).join('') + '</div>';
    if (mode === 'office') { f += '<select class="at-in" id="atPlace">' + (ST.offices || []).map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select>'; }
    else if (mode === 'client') { f += '<input class="at-in" id="atPlace" maxlength="80" placeholder="Client ka naam">'; }
    else if (mode === 'field') { f += '<input class="at-in" id="atPlace" maxlength="80" placeholder="Kahan gaye hain (jaise GST office, court, bank)">'; }
    return f + '<button type="button" class="at-go" id="atIn"' + (busy ? ' disabled' : '') + '>&#10004; Check-in kariye</button><p style="font-size:.78rem;color:#5b6b75;margin:.4rem 0 0">Location sirf check-in / check-out ke samay li jaati hai.</p>';
  }
  function teamBox() {
    if (!TD) { return '<div class="at-card"><b>&#128101; Aaj kaun kahan</b><p style="color:#5b6b75">Load ho raha hai...</p></div>'; }
    var c = TD.counts || {};
    var chips = [['In', c.in, '#dcfce7', '#14532d'], ['Out', c.out, '#e2e8f0', '#334155'], ['Absent', c.absent, '#fee2e2', '#7f1d1d'], ['WFH', c.wfh, '#e0f2fe', '#0c4a6e'], ['Client / Field', c.field, '#ede9fe', '#4c1d95'], ['Late', c.late, '#fef3c7', '#92400e']].map(function (x) { return '<span class="at-c" style="background:' + x[2] + ';color:' + x[3] + '">' + x[0] + ': ' + (x[1] || 0) + '</span>'; }).join('');
    var SC = { in: ['In', '#dcfce7', '#14532d'], out: ['Out', '#e2e8f0', '#334155'], absent: ['Absent', '#fee2e2', '#7f1d1d'] };
    var rows = (TD.list || []).slice().sort(function (a, b) { var o = { in: 0, out: 1, absent: 2 }; return o[a.state] - o[b.state]; }).map(function (x) { var s = SC[x.state], f = x.first; return '<tr><td><b>' + esc(x.name) + '</b></td><td><span class="at-b" style="background:' + s[1] + ';color:' + s[2] + '">' + s[0] + '</span>' + (f && f.late ? ' <span class="at-b" style="background:#fef3c7;color:#92400e">Late</span>' : '') + '</td><td>' + (f ? esc(f.time) + (x.lastOut ? ' &ndash; ' + esc(x.lastOut.time) : '') : '-') + '</td><td>' + (f ? (MI[f.mode] || '') + ' ' + esc(f.place || ({ office: 'Office', wfh: 'WFH', client: 'Client', field: 'Field' })[f.mode] || f.mode) : '-') + '</td><td>' + (f && f.map ? '<a href="' + esc(f.map) + '" target="_blank" rel="noopener">Map</a>' : '') + '</td></tr>'; }).join('');
    var m = new Date(Date.now() + 19800000).toISOString().slice(0, 7);
    return '<div class="at-card"><div class="at-h"><b>&#128101; Aaj kaun kahan (' + esc(TD.now || '') + ')</b><button type="button" class="cp-btn o s" id="atRef">&#8635;</button></div><div class="at-cnt">' + chips + '</div><div class="at-tw"><table class="at-t"><thead><tr><th>Naam</th><th>Status</th><th>Samay</th><th>Kahan</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="at-row"><input type="month" class="at-in" id="atMonth" value="' + m + '" style="max-width:180px;margin:0"><button type="button" class="cp-btn s" id="atCsv">&#11015; Monthly report (Excel / CSV)</button></div></div>';
  }
  function mount() {
    var app = document.getElementById('cp-app'); if (!app) { return; }
    var hero = app.querySelector('.cp-hero'); if (!hero) { return; }
    var box = document.getElementById('atWrap');
    if (!box) { box = document.createElement('div'); box.id = 'atWrap'; hero.parentNode.insertBefore(box, hero.nextSibling); }
    box.innerHTML = widget(); wire(box);
  }
  function locate(cb) { if (!navigator.geolocation) { cb({}); return; } var done = false; var t = setTimeout(function () { if (!done) { done = true; cb({}); } }, 9000); navigator.geolocation.getCurrentPosition(function (p) { if (done) { return; } done = true; clearTimeout(t); cb({ lat: p.coords.latitude, lng: p.coords.longitude, acc: p.coords.accuracy }); }, function () { if (done) { return; } done = true; clearTimeout(t); cb({}); }, { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }); }
  function act(kind) {
    var place = document.getElementById('atPlace'); var body = { action: kind, mode: mode, place: place ? place.value.trim() : '' };
    busy = true; msgTxt = 'Location le rahe hain...'; msgBad = false; mount();
    locate(function (loc) {
      body.lat = loc.lat; body.lng = loc.lng; body.acc = loc.acc;
      call(body).then(function (r) { busy = false; if (r && r.ok) { msgTxt = r.msg + (loc.lat ? '' : ' (location nahi mili)'); msgBad = false; load(); } else { msgTxt = (r && r.error) || 'Dobara try kariye.'; msgBad = true; mount(); } }).catch(function () { busy = false; msgTxt = 'Network dikkat.'; msgBad = true; mount(); });
    });
  }
  function csv() {
    var m = (document.getElementById('atMonth') || {}).value || '';
    call({ action: 'month', month: m }).then(function (r) {
      if (!r || !r.ok) { return; }
      var q = function (v) { v = String(v == null ? '' : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
      var L = ['Summary - ' + r.month, 'Naam,Present din,Late,WFH,Client/Field,Kul ghante'].concat(r.summary.map(function (s) { return [s.name, s.present, s.late, s.wfh, s.field, s.hours].map(q).join(','); }), ['', 'Detail', 'Naam,Date,In,Out,Ghante,Mode,Jagah,Late,Map']).concat(r.detail.map(function (d) { return [d.name, d.date, d.in, d.out, d.hours, d.mode, d.place, d.late, d.map].map(q).join(','); }));
      var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['\ufeff' + L.join('\n')], { type: 'text/csv' })); a.download = 'CGA-Attendance-' + r.month + '.csv'; document.body.appendChild(a); a.click(); a.parentNode.removeChild(a);
    });
  }
  function wire(box) {
    Array.prototype.forEach.call(box.querySelectorAll('[data-am]'), function (b) { b.onclick = function () { mode = b.getAttribute('data-am'); mount(); }; });
    var i = document.getElementById('atIn'); if (i) { i.onclick = function () { act('in'); }; }
    var o = document.getElementById('atOut'); if (o) { o.onclick = function () { if (confirm('Check-out karein?')) { act('out'); } }; }
    var r = document.getElementById('atRef'); if (r) { r.onclick = load; }
    var c = document.getElementById('atCsv'); if (c) { c.onclick = csv; }
  }
  function load() {
    call({ action: 'status' }).then(function (r) { if (r && r.ok) { ST = r; mount(); } }).catch(function () {});
    if (isAll) { call({ action: 'today' }).then(function (r) { if (r && r.ok) { TD = r; mount(); } }).catch(function () {}); }
  }
  var obs = new MutationObserver(function () { var app = document.getElementById('cp-app'); if (app && app.querySelector('.cp-hero') && !document.getElementById('atWrap')) { mount(); } });
  function start() { var app = document.getElementById('cp-app'); if (!app) { return; } obs.observe(app, { childList: true, subtree: true }); load(); mount(); }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start); } else { start(); }
})();
