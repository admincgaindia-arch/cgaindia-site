/* Portal self-registration: a client requests an account (name, PAN, mobile, email); CGA approves
   from email. Also lets a client check the status of their request. Sits under the login card. */
(function () {
  'use strict';
  var API = 'https://cga.app.n8n.cloud/webhook/cga-signup';
  var app = document.getElementById('cp-app');
  if (!app) { return; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function field(id, label, attrs) { return '<label class="cp-lbl" for="' + id + '">' + label + '</label><input class="cp-in" id="' + id + '" ' + attrs + '>'; }
  function post(body, msg, btn, onOk) {
    btn.disabled = true; msg.className = 'cp-msg'; msg.textContent = 'Bhej rahe hain...';
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json(); })
      .then(function (r) {
        btn.disabled = false;
        if (r && r.ok) { msg.className = 'cp-msg k'; msg.innerHTML = esc(r.msg || 'Ho gaya.'); if (onOk) { onOk(r); } }
        else { msg.className = 'cp-msg e'; msg.textContent = (r && r.error) || 'Nahi ho paya. Dobara try kariye.'; }
      })
      .catch(function () { btn.disabled = false; msg.className = 'cp-msg e'; msg.textContent = 'Network dikkat. Dobara try kariye.'; });
  }
  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
  function inject() {
    var em = document.getElementById('cp-em');
    if (!em || document.getElementById('cp-su')) { return; }
    var card = em.closest('.cp-card');
    if (!card) { return; }
    var box = document.createElement('div');
    box.id = 'cp-su';
    box.style.cssText = 'margin-top:1rem;border-top:1px dashed #c9d6de;padding-top:.9rem';
    box.innerHTML = '<p class="cp-meta" style="font-size:.9rem;margin:0 0 .5rem"><b>Account nahi hai?</b> CGA ke purane ya naye client, dono yahan se account bana sakte hain.</p>' +
      '<div class="cp-row" style="margin:0"><button type="button" class="cp-btn o s" id="cp-su-open">Naya account banaiye</button><button type="button" class="cp-btn o s" id="cp-st-open">Request ka status dekhiye</button></div>' +
      '<div id="cp-su-f" style="display:none;margin-top:.6rem">' +
      field('cp-su-name', 'Aapka naam *', 'maxlength="80" autocomplete="name"') +
      field('cp-su-firm', 'Firm / company ka naam (agar hai)', 'maxlength="100" autocomplete="organization"') +
      field('cp-su-pan', 'PAN *', 'maxlength="10" placeholder="ABCDE1234F" style="text-transform:uppercase;max-width:240px" autocomplete="off"') +
      field('cp-su-mob', 'Mobile (10 digit) *', 'type="tel" inputmode="numeric" maxlength="14" style="max-width:240px" autocomplete="tel"') +
      field('cp-su-em', 'Email (isi se login hoga) *', 'type="email" maxlength="120" autocomplete="email"') +
      field('cp-su-svc', 'CGA se kaunsi services lete hain? (optional)', 'maxlength="200" placeholder="jaise ITR, GST return, ROC"') +
      '<p class="cp-meta" style="font-size:.82rem;margin:.6rem 0 0">Request CGA team verify karegi. Approve hote hi email aayega.</p>' +
      '<div class="cp-row"><button type="button" class="cp-btn" id="cp-su-go">Request bhejiye</button></div><p class="cp-msg" id="cp-su-msg"></p></div>' +
      '<div id="cp-st-f" style="display:none;margin-top:.6rem">' +
      field('cp-st-em', 'Request wala email', 'type="email" maxlength="120" autocomplete="email"') +
      field('cp-st-pan', 'PAN', 'maxlength="10" placeholder="ABCDE1234F" style="text-transform:uppercase;max-width:240px" autocomplete="off"') +
      '<div class="cp-row"><button type="button" class="cp-btn" id="cp-st-go">Status dekhiye</button></div><p class="cp-msg" id="cp-st-msg"></p></div>';
    card.appendChild(box);
    function toggle(show, hide) { var a = document.getElementById(show), b = document.getElementById(hide); a.style.display = a.style.display === 'none' ? '' : 'none'; b.style.display = 'none'; }
    document.getElementById('cp-su-open').onclick = function () { toggle('cp-su-f', 'cp-st-f'); };
    document.getElementById('cp-st-open').onclick = function () { toggle('cp-st-f', 'cp-su-f'); };
    document.getElementById('cp-su-go').onclick = function () {
      var msg = document.getElementById('cp-su-msg');
      var b = { action: 'request', name: val('cp-su-name'), firm: val('cp-su-firm'), pan: val('cp-su-pan').toUpperCase(), mobile: val('cp-su-mob').replace(/[^0-9]/g, '').slice(-10), email: val('cp-su-em').toLowerCase(), services: val('cp-su-svc') };
      if (b.name.length < 2) { msg.className = 'cp-msg e'; msg.textContent = 'Apna naam daaliye.'; return; }
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(b.pan)) { msg.className = 'cp-msg e'; msg.textContent = 'PAN sahi format mein daaliye (jaise ABCDE1234F).'; return; }
      if (!/^[6-9][0-9]{9}$/.test(b.mobile)) { msg.className = 'cp-msg e'; msg.textContent = '10 digit mobile number daaliye.'; return; }
      if (!/^[^@ ]+@[^@ ]+\.[^@ ]+$/.test(b.email)) { msg.className = 'cp-msg e'; msg.textContent = 'Sahi email daaliye.'; return; }
      post(b, msg, this);
    };
    document.getElementById('cp-st-go').onclick = function () {
      var msg = document.getElementById('cp-st-msg');
      var b = { action: 'status', email: val('cp-st-em').toLowerCase(), pan: val('cp-st-pan').toUpperCase() };
      if (!b.email || !b.pan) { msg.className = 'cp-msg e'; msg.textContent = 'Email aur PAN dono daaliye.'; return; }
      post(b, msg, this, function (r) { if (r.status === 'APPROVED') { var e = document.getElementById('cp-em'); if (e) { e.value = b.email; } } });
    };
  }
  new MutationObserver(inject).observe(app, { childList: true, subtree: true });
  inject();
})();
