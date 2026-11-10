/* CGA Tax Help Desk - first 50 free consultations */
(function () {
  'use strict';
  var API = 'https://cga.app.n8n.cloud/webhook/cga-helpdesk';
  function $(id) { return document.getElementById(id); }
  function seats(n) { Array.prototype.forEach.call(document.querySelectorAll('.hd-left'), function (el) { el.textContent = n; }); var bar = $('hdBar'); if (bar) { bar.style.width = Math.max(4, (50 - n) * 2) + '%'; } }
  fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'count' }) }).then(function (r) { return r.json(); }).then(function (r) { if (r && r.ok) { seats(r.left); } }).catch(function () {});
  var go = $('hdGo'); if (!go) { return; }
  function msg(t, bad) { var m = $('hdMsg'); m.textContent = t; m.className = 'hd-msg' + (bad ? ' bad' : ''); }
  go.onclick = function () {
    var b = { action: 'register', name: $('hdName').value.trim(), mobile: $('hdMob').value.replace(/[^0-9]/g, '').slice(-10), email: $('hdEmail').value.trim(), city: $('hdCity').value.trim(), category: $('hdCat').value, topic: $('hdTopic').value.trim() };
    if (b.name.length < 2) { msg('Apna naam likhiye.', true); return; }
    if (!/^[6-9][0-9]{9}$/.test(b.mobile)) { msg('10 digit mobile number daaliye.', true); return; }
    if (!$('hdOk').checked) { msg('CGA team ke call / WhatsApp ke liye sahmati dijiye.', true); return; }
    go.disabled = true; msg('Bhej rahe hain...');
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) }).then(function (r) { return r.json(); }).then(function (r) {
      go.disabled = false;
      if (r && r.ok) { if (typeof r.left === 'number') { seats(r.left); } $('hdForm').innerHTML = '<div class="hd-done"><div class="hd-tick">&#10003;</div><h3>' + (r.waitlist ? 'Waitlist mein naam jud gaya' : 'Aapki seat pakki!') + '</h3><p>' + (r.msg || '') + '</p><a class="btn btn-gold" href="https://wa.me/919996647888?text=' + encodeURIComponent('Namaste, maine Tax Help Desk par register kiya hai. Naam: ' + b.name) + '" target="_blank" rel="noopener">Abhi WhatsApp kariye</a></div>'; if (window.gtag) { window.gtag('event', 'generate_lead', { form: 'tax_help_desk' }); } if (window.fbq) { window.fbq('track', 'Lead'); } }
      else { msg((r && r.error) || 'Dobara try kariye.', true); }
    }).catch(function () { go.disabled = false; msg('Network dikkat. WhatsApp kariye: 9996647888', true); });
  };
})();
