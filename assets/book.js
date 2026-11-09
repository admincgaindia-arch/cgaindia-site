/* CGA consultation booking: pick day + slot + mode, book a free 15-min consultation. */
(function () {
  'use strict';
  var API = 'https://cga.app.n8n.cloud/webhook/cga-booking';
  var app = document.getElementById('bkApp');
  if (!app) { return; }
  var D = null, di = 0, slot = '', mode = 'phone', office = 'burari', done = null, plan = (location.hash || '').indexOf('paid') >= 0 ? 'p30' : 'free';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function v(id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; }
  function keep() { var o = {}; ['bkName', 'bkMob', 'bkEmail', 'bkTopic'].forEach(function (k) { o[k] = v(k); }); return o; }
  function paint(prev) {
    if (done) {
      var paid = done.amount > 0;
      app.innerHTML = '<div class="bk-done"><div class="bk-tick">&#10003;</div><h3>' + (paid ? 'Slot rakh liya gaya hai!' : 'Consultation book ho gayi!') + '</h3>' + (paid ? '<p class="bk-pay"><b>' + esc(done.plan_label) + '</b> &middot; &#8377;' + done.amount + ' + GST<br><button type="button" class="btn btn-gold" id="bkPay" style="margin-top:.6rem">Abhi &#8377;' + done.amount + ' pay kariye</button><br><span class="bk-muted">Payment ke baad GST invoice email par aayega. Payment na hone par slot cancel ho sakta hai.</span></p>' : '') + '<p><b>' + esc(done.when) + '</b><br>' + esc(done.mode) + ' &middot; ' + esc(done.where) + '</p><p class="bk-muted">Booking ID: ' + esc(done.booking_id) + '. CGA team time par sampark karegi.</p><div class="bk-cta"><a class="btn btn-gold" href="' + esc(done.gcal) + '" target="_blank" rel="noopener">Google Calendar mein jodiye</a><a class="btn bk-ghost" href="https://wa.me/919996647888?text=' + encodeURIComponent('Meri booking ' + done.booking_id + ' ke baare mein') + '" target="_blank" rel="noopener">WhatsApp</a></div></div>';
      var pb = document.getElementById('bkPay'); if (pb) { pb.onclick = payNow; }
      return;
    }
    if (!D) { app.innerHTML = '<p class="bk-muted">Khaali slots load ho rahe hain...</p>'; return; }
    if (!D.days.length) { app.innerHTML = '<p>Agle kuch din ke saare slots bhar gaye hain. <a href="https://wa.me/919996647888">WhatsApp kariye</a>.</p>'; return; }
    var day = D.days[di] || D.days[0];
    var PL = D.plans || { free: { l: 'Free 15-minute consultation', amt: 0 } };
    var h = '<p class="bk-step">Consultation chuniye</p><div class="bk-plans">' + Object.keys(PL).map(function (k) { var p = PL[k]; return '<button type="button" class="bk-plan' + (k === plan ? ' on' : '') + '" data-p="' + k + '"><b>' + (p.amt ? '&#8377;' + p.amt : 'Free') + '</b><span>' + esc(p.l) + '</span><small>' + (k === 'free' ? 'Situation samjhiye, raasta jaaniye' : (k === 'p30' ? 'Expert advice, aapke documents ke saath' : 'Poori planning / notice / case discussion')) + '</small></button>'; }).join('') + '</div>';
    var slots = plan === 'p60' ? (day.slots60 || []) : day.slots;
    h += '<p class="bk-step">1. Din chuniye</p><div class="bk-days">' + D.days.map(function (d, i) { return '<button type="button" class="bk-day' + (i === di ? ' on' : '') + '" data-d="' + i + '">' + esc(d.label) + '<small>' + d.slots.length + ' slots</small></button>'; }).join('') + '</div>';
    h += '<p class="bk-step">2. Samay chuniye (IST)' + (plan === 'p60' ? ' &middot; 1 ghanta' : '') + '</p><div class="bk-slots">' + (slots.length ? '' : '<span class="bk-muted">Is din 1 ghante ka khaali slot nahi hai. Doosra din chuniye.</span>') + slots.map(function (t) { return '<button type="button" class="bk-slot' + (t === slot ? ' on' : '') + '" data-t="' + t + '">' + t + '</button>'; }).join('') + '</div>';
    h += '<p class="bk-step">3. Baat kaise karein</p><div class="bk-modes">' + Object.keys(D.modes).map(function (k) { return '<label class="bk-mode' + (k === mode ? ' on' : '') + '"><input type="radio" name="bkm" value="' + k + '"' + (k === mode ? ' checked' : '') + '>' + esc(D.modes[k]) + '</label>'; }).join('') + '</div>';
    if (mode === 'office') { h += '<select id="bkOff" class="bk-in" style="max-width:320px">' + Object.keys(D.offices).map(function (k) { return '<option value="' + k + '"' + (k === office ? ' selected' : '') + '>' + esc(D.offices[k]) + '</option>'; }).join('') + '</select>'; }
    var p = prev || {};
    h += '<p class="bk-step">4. Aapki details</p><div class="bk-g"><div><label for="bkName">Naam *</label><input id="bkName" class="bk-in" maxlength="80" autocomplete="name" value="' + esc(p.bkName || '') + '"></div><div><label for="bkMob">Mobile *</label><input id="bkMob" class="bk-in" type="tel" inputmode="numeric" maxlength="14" autocomplete="tel" value="' + esc(p.bkMob || '') + '"></div><div><label for="bkEmail">Email (confirmation ke liye)</label><input id="bkEmail" class="bk-in" type="email" maxlength="120" autocomplete="email" value="' + esc(p.bkEmail || '') + '"></div><div><label for="bkTopic">Kis baare mein baat karni hai</label><input id="bkTopic" class="bk-in" maxlength="400" placeholder="jaise GST notice, company registration" value="' + esc(p.bkTopic || '') + '"></div></div>';
    h += '<button type="button" class="btn btn-gold" id="bkGo" style="width:100%;margin-top:1rem">' + (slot ? ((PL[plan] && PL[plan].amt) ? 'Book karke &#8377;' + PL[plan].amt + ' pay kariye: ' : 'Book kariye: ') + esc(day.label) + ', ' + slot : 'Pehle samay chuniye') + '</button><p class="bk-msg" id="bkMsg" aria-live="polite"></p>';
    app.innerHTML = h; wire(day);
  }
  function msg(t, bad) { var m = document.getElementById('bkMsg'); if (m) { m.textContent = t; m.className = 'bk-msg' + (bad ? ' bad' : ''); } }
  function load(prev, after) { fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'slots' }) }).then(function (r) { return r.json(); }).then(function (r) { D = r && r.ok ? r : { days: [], modes: {}, offices: {} }; if (di >= D.days.length) { di = 0; } paint(prev); if (after) { after(); } }).catch(function () { app.innerHTML = '<p>Slots load nahi ho paaye. <a href="https://wa.me/919996647888">WhatsApp kariye</a>.</p>'; }); }
  function wire(day) {
    Array.prototype.forEach.call(app.querySelectorAll('[data-p]'), function (b) { b.onclick = function () { var p = keep(); plan = b.getAttribute('data-p'); slot = ''; paint(p); }; });
    Array.prototype.forEach.call(app.querySelectorAll('[data-d]'), function (b) { b.onclick = function () { var p = keep(); di = Number(b.getAttribute('data-d')); slot = ''; paint(p); }; });
    Array.prototype.forEach.call(app.querySelectorAll('[data-t]'), function (b) { b.onclick = function () { var p = keep(); slot = b.getAttribute('data-t'); paint(p); }; });
    Array.prototype.forEach.call(app.querySelectorAll('input[name=bkm]'), function (r) { r.onchange = function () { var p = keep(); mode = r.value; paint(p); }; });
    var o = document.getElementById('bkOff'); if (o) { o.onchange = function () { office = o.value; }; }
    document.getElementById('bkGo').onclick = function () {
      var btn = this, body = { action: 'book', plan: plan, date: day.date, time: slot, mode: mode, office: office, name: v('bkName'), mobile: v('bkMob').replace(/[^0-9]/g, '').slice(-10), email: v('bkEmail'), topic: v('bkTopic') };
      if (!slot) { msg('Pehle samay chuniye.', true); return; }
      if (body.name.length < 2) { msg('Apna naam daaliye.', true); return; }
      if (!/^[6-9][0-9]{9}$/.test(body.mobile)) { msg('10 digit mobile number daaliye.', true); return; }
      btn.disabled = true; msg('Book ho raha hai...');
      fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(function (r) { return r.json(); }).then(function (r) {
        btn.disabled = false;
        if (r && r.ok) { done = r; done.payName = body.name; done.payMob = body.mobile; done.payMail = body.email; paint(); if (done.amount > 0) { payNow(); } if (app.scrollIntoView) { app.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }
        else if (r && r.taken) { var p = keep(); slot = ''; load(p, function () { msg(r.error, true); }); }
        else { msg((r && r.error) || 'Booking nahi ho payi. Dobara try kariye.', true); }
      }).catch(function () { btn.disabled = false; msg('Network dikkat. Dobara try kariye.', true); });
    };
  }
  function payNow() {
    if (!done || !(done.amount > 0)) { return; }
    try { var u = JSON.parse(localStorage.getItem('cgaPayUser') || '{}'); u.name = done.payName || u.name; u.mobile = done.payMob || u.mobile; if (done.payMail) { u.email = done.payMail; } localStorage.setItem('cgaPayUser', JSON.stringify(u)); } catch (e) {}
    if (window.CGAPay && window.CGAPay.open) { window.CGAPay.open({ service: done.plan_label + ' - Booking ' + done.booking_id, amount: done.amount, invoice: done.booking_id, tier: done.plan, lockService: true }); }
    else { location.href = 'https://wa.me/919996647888?text=' + encodeURIComponent('Booking ' + done.booking_id + ' ka payment karna hai: Rs ' + done.amount); }
  }
  paint(); load();
})();
