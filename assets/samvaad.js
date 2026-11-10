/* CGA Samvaad subscribe / unsubscribe */
(function () {
  'use strict';
  var API = 'https://cga.app.n8n.cloud/webhook/cga-samvaad';
  function $(id) { return document.getElementById(id); }
  function msg(t) { var m = $('saMsg'); if (m) { m.textContent = t; } }
  var q = new URLSearchParams(location.search), u = q.get('u');
  if (u) {
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'unsubscribe', token: u }) }).then(function (r) { return r.json(); }).then(function (r) {
      var box = document.createElement('div'); box.style.cssText = 'background:#fff4e0;border:1px solid #f0d9a8;border-radius:12px;padding:1rem;margin:1rem auto;max-width:860px;text-align:center;font-weight:700';
      box.textContent = r && r.ok ? 'Aap CGA Samvaad se unsubscribe ho gaye hain. Dobara chahiye to neeche se subscribe kar sakte hain.' : 'Unsubscribe link sahi nahi hai. Kripya admin@cgaindia.com par likhiye.';
      var s = document.querySelector('.sa'); if (s) { s.insertBefore(box, s.firstChild); }
    }).catch(function () {});
  }
  var go = $('saGo'); if (!go) { return; }
  go.onclick = function () {
    var email = ($('saEmail').value || '').trim(), name = ($('saName').value || '').trim();
    if (!/^[^@ ]+@[^@ ]+[.][^@ ]+$/.test(email)) { msg('Sahi email daaliye.'); return; }
    go.disabled = true; msg('Jod rahe hain...');
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'subscribe', email: email, name: name, kind: $('saKind').value }) }).then(function (r) { return r.json(); }).then(function (r) { go.disabled = false; msg(r && r.ok ? 'Shukriya! Agla ank aapke email par aayega.' : ((r && r.error) || 'Dobara try kariye.')); }).catch(function () { go.disabled = false; msg('Network dikkat. Dobara try kariye.'); });
  };
})();
