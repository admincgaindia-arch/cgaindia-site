/* CGA Partner Network: partner registration + client referral */
(function () {
  var wrap = document.getElementById('ptForms');
  if (!wrap) { return; }
  var STATES = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'];
  [].slice.call(wrap.querySelectorAll('select[name=state]')).forEach(function (sel) { STATES.forEach(function (s) { var o = document.createElement('option'); o.value = s; o.textContent = s; sel.appendChild(o); }); });
  var tabs = [].slice.call(wrap.querySelectorAll('.pt-tab'));
  var panes = [].slice.call(wrap.querySelectorAll('.pt-pane'));
  function show(k) { tabs.forEach(function (t) { t.classList.toggle('on', t.getAttribute('data-k') === k); t.setAttribute('aria-selected', t.getAttribute('data-k') === k ? 'true' : 'false'); }); panes.forEach(function (p) { p.style.display = p.getAttribute('data-k') === k ? '' : 'none'; }); }
  tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.getAttribute('data-k')); }); });
  if (location.hash === '#refer') { show('refer'); }
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem('cga_partner') || 'null'); } catch (e) {}
  if (saved) {
    var rf = wrap.querySelector('form[data-kind=refer]');
    ['partner_name', 'partner_mobile', 'partner_type', 'org'].forEach(function (k) { var el = rf.querySelector('[name=' + k + ']'); if (el && saved[k]) { el.value = saved[k]; } });
  }
  [].slice.call(wrap.querySelectorAll('form')).forEach(function (f) {
    var kind = f.getAttribute('data-kind');
    var msg = wrap.querySelector('.pt-msg');
    var btn = f.querySelector('button[type=submit]');
    var label = btn.textContent;
    function say(t, ok) { msg.innerHTML = t; msg.className = 'pt-msg ' + (ok ? 'ok' : 'err'); msg.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      var data = { kind: kind };
      [].slice.call(f.elements).forEach(function (el) { if (el.name && el.type !== 'checkbox') { data[el.name] = el.value.trim(); } });
      var pm = (data.partner_mobile || '').replace(/[^0-9]/g, '');
      if (pm.length < 10) { say('Apna 10 digit mobile number daaliye.', false); return; }
      if (kind === 'refer' && (data.client_mobile || '').replace(/[^0-9]/g, '').length < 10) { say('Client ka 10 digit mobile number daaliye.', false); return; }
      btn.disabled = true; btn.textContent = 'Bhej rahe hain...';
      fetch('https://cga.app.n8n.cloud/webhook/cga-partner', { method: 'POST', body: JSON.stringify(data) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d || !d.ok) { throw new Error('x'); }
          try { localStorage.setItem('cga_partner', JSON.stringify({ partner_name: data.partner_name, partner_mobile: data.partner_mobile, partner_type: data.partner_type || '', org: data.org || '' })); } catch (x) {}
          try { if (window.gtag) { window.gtag('event', 'generate_lead', { method: kind === 'refer' ? 'partner_referral' : 'partner_signup' }); } } catch (x) {}
          var id = String(d.id || '').replace(/[^A-Z0-9-]/g, '');
          if (kind === 'refer') {
            say('<b>Shukriya! Client ki details mil gayi.</b> Referral ID: <b>' + id + '</b>. Hamari team 2 ghante ke andar (office samay mein) client ko call karegi, aur aapko WhatsApp par status batayegi. <a href="#refer" class="pt-again">Ek aur client refer kariye</a>', true);
            f.reset(); if (saved || data.partner_name) { ['partner_name', 'partner_mobile', 'partner_type', 'org'].forEach(function (k) { var el = f.querySelector('[name=' + k + ']'); if (el && data[k]) { el.value = data[k]; } }); }
          } else {
            f.style.display = 'none';
            say('<b>Welcome to CGA Partner Network!</b> Partner ID: <b>' + id + '</b>. Hamari partner desk 1 working day mein aapse sampark karegi. Abhi se client refer kar sakte hain: <a href="#refer" class="pt-go">Client refer kariye &rarr;</a>', true);
            var go = msg.querySelector('.pt-go'); if (go) { go.addEventListener('click', function (ev) { ev.preventDefault(); show('refer'); }); }
            var rf2 = wrap.querySelector('form[data-kind=refer]');
            ['partner_name', 'partner_mobile', 'partner_type', 'org'].forEach(function (k) { var el = rf2.querySelector('[name=' + k + ']'); if (el && data[k]) { el.value = data[k]; } });
          }
          btn.disabled = false; btn.textContent = label;
        })
        .catch(function () {
          btn.disabled = false; btn.textContent = label;
          say('Abhi submit nahi ho paaya. Thodi der baad try kariye, ya <a href="https://wa.me/919996647888?text=' + encodeURIComponent('CGA Partner: ' + (data.partner_name || '') + ' ' + (kind === 'refer' ? '- client refer karna hai: ' + (data.client_name || '') + ' ' + (data.client_mobile || '') + ' (' + (data.service || '') + ')' : '- partner banna hai')) + '" target="_blank" rel="noopener">WhatsApp par bhejiye</a>.', false);
        });
    });
  });
})();
