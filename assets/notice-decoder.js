/* CGA AI Notice Decoder: upload a GST / Income Tax notice, get a plain-language summary. */
(function () {
  'use strict';
  var API = 'https://cga.app.n8n.cloud/webhook/cga-notice-decoder';
  var box = document.getElementById('ndApp');
  if (!box) { return; }
  var MAX = 5 * 1024 * 1024;
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  var file = null;
  function say(t, bad) { var m = $('ndMsg'); m.textContent = t; m.className = 'nd-msg' + (bad ? ' bad' : ''); }
  function shrink(f) {
    return new Promise(function (ok) {
      if (!/^image\//.test(f.type) || f.size < 1200000) { ok(f); return; }
      var img = new Image(), url = URL.createObjectURL(f);
      img.onload = function () {
        var s = Math.min(1, 2000 / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        c.toBlob(function (b) { URL.revokeObjectURL(url); ok(b ? new File([b], 'notice.jpg', { type: 'image/jpeg' }) : f); }, 'image/jpeg', 0.85);
      };
      img.onerror = function () { ok(f); };
      img.src = url;
    });
  }
  function toB64(f) { return new Promise(function (ok, no) { var r = new FileReader(); r.onload = function () { ok(String(r.result).split(',')[1] || ''); }; r.onerror = no; r.readAsDataURL(f); }); }
  $('ndFile').addEventListener('change', function () {
    var f = this.files && this.files[0];
    if (!f) { file = null; $('ndFileName').textContent = ''; return; }
    if (['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].indexOf(f.type) < 0) { say('Sirf PDF, JPG, PNG ya WEBP file chuniye.', true); this.value = ''; return; }
    file = f; $('ndFileName').textContent = f.name + ' (' + Math.round(f.size / 1024) + ' KB)'; say('');
  });
  var SEV = { low: ['Kam jokhim', '#17773f', '#e6f6ec'], medium: ['Dhyan dijiye', '#8a5a00', '#fff4e0'], high: ['Gambhir', '#b3261e', '#fdecea'], urgent: ['Turant kaarwai', '#ffffff', '#b3261e'] };
  function list(a) { return Array.isArray(a) && a.length ? '<ul>' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '<p class="nd-muted">-</p>'; }
  function render(r) {
    if (r.is_notice === false) { $('ndRes').innerHTML = '<div class="nd-card"><h3>Ye notice jaisa nahi lag raha</h3><p>' + esc(r.summary) + '</p><p>Saaf photo (poora page, roshni mein) ya PDF dobara bhejiye, ya <a href="https://wa.me/919996647888" target="_blank" rel="noopener">WhatsApp par bhejiye</a>.</p></div>'; return; }
    var sv = SEV[String(r.severity || '').toLowerCase()] || ['Jaanch zaroori', '#005176', '#e3f3f9'];
    var dl = r.reply_deadline ? esc(r.reply_deadline) + (r.days_left != null ? ' <span class="nd-pill" style="background:' + (r.days_left <= 7 ? '#fdecea;color:#b3261e' : '#e6f6ec;color:#17773f') + '">' + (r.days_left < 0 ? (-r.days_left) + ' din nikal gaye' : r.days_left + ' din baaki') + '</span>' : '') : 'Notice mein saaf nahi';
    var rows = [['Kis vibhag ka', r.authority], ['Notice', r.notice_type], ['Section / rule', r.section], ['Reference / DIN', r.reference_no], ['Notice ki date', r.notice_date], ['Period', r.period], ['Amount', r.amount_demanded]].filter(function (x) { return x[1]; }).map(function (x) { return '<tr><td>' + x[0] + '</td><td><b>' + esc(x[1]) + '</b></td></tr>'; }).join('');
    var wa = 'https://wa.me/919996647888?text=' + encodeURIComponent('Namaste, mujhe notice ka reply karwana hai: ' + (r.notice_type || '') + (r.reply_deadline ? ' (deadline ' + r.reply_deadline + ')' : ''));
    $('ndRes').innerHTML = '<div class="nd-card">' +
      '<div class="nd-top"><span class="nd-sev" style="color:' + sv[1] + ';background:' + sv[2] + '">' + sv[0] + '</span><span class="nd-muted">AI confidence: ' + esc(r.confidence || '-') + '</span></div>' +
      '<h3>' + esc(r.notice_type || 'Aapka notice') + '</h3><p class="nd-sum">' + esc(r.summary) + '</p>' +
      '<div class="nd-dead"><span>Reply ki last date</span><b>' + dl + '</b></div>' +
      '<table class="nd-tbl">' + rows + '</table>' +
      (r.severity_reason ? '<p class="nd-muted">' + esc(r.severity_reason) + '</p>' : '') +
      '<h4>Kya karna chahiye</h4>' + list(r.what_to_do) + '<h4>Ye documents taiyar rakhiye</h4>' + list(r.documents_needed) +
      (r.if_ignored ? '<h4>Reply na dene par</h4><p>' + esc(r.if_ignored) + '</p>' : '') +
      '<div class="nd-cta"><a class="btn btn-gold" href="' + wa + '" target="_blank" rel="noopener">CGA se reply karwaiye</a><a class="btn nd-ghost" href="contact.html">Free consultation</a></div>' +
      '<p class="nd-disc">Ye AI dwara banayi gayi general samajh hai, legal opinion nahi. Dates aur amount original notice se zaroor milaiye. Har case alag hota hai.</p></div>';
    $('ndRes').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  $('ndGo').addEventListener('click', function () {
    var btn = this, name = $('ndName').value.trim(), mob = $('ndMob').value.replace(/[^0-9]/g, '').slice(-10), em = $('ndEmail').value.trim(), city = $('ndCity').value.trim(), txt = $('ndText').value.trim();
    if (!file && txt.length < 40) { say('Notice ki photo / PDF chuniye, ya notice ka text paste kariye.', true); return; }
    if (name.length < 2) { say('Apna naam daaliye.', true); return; }
    if (!/^[6-9][0-9]{9}$/.test(mob)) { say('10 digit mobile number daaliye.', true); return; }
    if (!$('ndOk').checked) { say('Consent box tick kariye.', true); return; }
    btn.disabled = true; $('ndRes').innerHTML = '';
    say('AI aapka notice padh raha hai... 20-40 second lagenge. Page band na kariye.');
    var body = { name: name, mobile: mob, email: em, city: city, consent: true, text: file ? '' : txt };
    (file ? shrink(file).then(function (f) { if (f.size > MAX) { throw new Error('big'); } body.mime = f.type; return toB64(f); }).then(function (b) { body.b64 = b; }) : Promise.resolve())
      .then(function () { return fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); })
      .then(function (r) { return r.json(); })
      .then(function (r) { btn.disabled = false; if (r && r.ok && r.result) { say('Ho gaya! Summary neeche hai. CGA team bhi aapse sampark karegi.'); render(r.result); } else { say((r && r.error) || 'Abhi notice padh nahi paaye. Dobara try kariye.', true); } })
      .catch(function (e) { btn.disabled = false; say(e && e.message === 'big' ? 'File 5 MB se badi hai. Chhoti photo ya PDF bhejiye.' : 'Network dikkat. Dobara try kariye ya WhatsApp kariye: +91 99966 47888.', true); });
  });
})();
