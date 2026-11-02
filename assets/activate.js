/* Old-client portal activation: PAN + registered mobile + email. Adds a small panel under the
   portal login card. On success it fills the login email so the client can request the OTP. */
(function () {
  'use strict';
  var API = 'https://cga.app.n8n.cloud/webhook/cga-activate';
  var app = document.getElementById('cp-app');
  if (!app) { return; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function inject() {
    var em = document.getElementById('cp-em');
    if (!em || document.getElementById('cp-act')) { return; }
    var card = em.closest('.cp-card');
    if (!card) { return; }
    var box = document.createElement('div');
    box.id = 'cp-act';
    box.style.cssText = 'margin-top:1rem;border-top:1px dashed #c9d6de;padding-top:.9rem';
    box.innerHTML = '<button type="button" class="cp-btn o s" id="cp-act-open">Purane client hain? Portal activate kariye</button>' +
      '<div id="cp-act-f" style="display:none;margin-top:.6rem"><p class="cp-meta" style="font-size:.88rem;margin:.2rem 0 .4rem">CGA ke saath pehle kaam karwa chuke hain? Apna PAN aur CGA ke record wala mobile daaliye, aur wo email jis par login karna chahte hain.</p>' +
      '<label class="cp-lbl" for="cp-act-pan">PAN</label><input class="cp-in" id="cp-act-pan" maxlength="10" autocomplete="off" placeholder="ABCDE1234F" style="text-transform:uppercase;max-width:240px">' +
      '<label class="cp-lbl" for="cp-act-mob">Registered mobile</label><input class="cp-in" id="cp-act-mob" type="tel" inputmode="numeric" maxlength="14" placeholder="98XXXXXXXX" style="max-width:240px">' +
      '<label class="cp-lbl" for="cp-act-em">Email (login ke liye)</label><input class="cp-in" id="cp-act-em" type="email" autocomplete="email" placeholder="aapka@email.com">' +
      '<div class="cp-row"><button type="button" class="cp-btn" id="cp-act-go">Activate kariye</button></div><p class="cp-msg" id="cp-act-msg"></p></div>';
    card.appendChild(box);
    document.getElementById('cp-act-open').onclick = function () {
      var f = document.getElementById('cp-act-f'); f.style.display = f.style.display === 'none' ? '' : 'none';
    };
    document.getElementById('cp-act-go').onclick = function () {
      var b = this, msg = document.getElementById('cp-act-msg');
      var pan = document.getElementById('cp-act-pan').value.trim().toUpperCase();
      var mob = document.getElementById('cp-act-mob').value.replace(/[^0-9]/g, '').slice(-10);
      var mail = document.getElementById('cp-act-em').value.trim().toLowerCase();
      msg.className = 'cp-msg';
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) { msg.className = 'cp-msg e'; msg.textContent = 'PAN sahi format mein daaliye (jaise ABCDE1234F).'; return; }
      if (!/^[6-9][0-9]{9}$/.test(mob)) { msg.className = 'cp-msg e'; msg.textContent = '10 digit mobile number daaliye.'; return; }
      if (!/^[^@ ]+@[^@ ]+\.[^@ ]+$/.test(mail)) { msg.className = 'cp-msg e'; msg.textContent = 'Sahi email daaliye.'; return; }
      b.disabled = true; msg.textContent = 'Record check ho raha hai...';
      fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pan: pan, mobile: mob, email: mail }) })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          b.disabled = false;
          if (r && r.ok) {
            msg.className = 'cp-msg k'; msg.innerHTML = esc(r.msg || 'Activate ho gaya.');
            var e = document.getElementById('cp-em'); if (e) { e.value = r.email || mail; e.scrollIntoView({ behavior: 'smooth', block: 'center' }); e.focus(); }
          } else { msg.className = 'cp-msg e'; msg.textContent = (r && r.error) || 'Activate nahi ho paya. Dobara try kariye.'; }
        })
        .catch(function () { b.disabled = false; msg.className = 'cp-msg e'; msg.textContent = 'Network dikkat. Dobara try kariye.'; });
    };
  }
  new MutationObserver(inject).observe(app, { childList: true, subtree: true });
  inject();
})();
