/* CGA forms: contact enquiry (with service-wise documents checklist by email) and
   compliance-calendar reminder signup. Both post to the n8n "cga-enquiry" webhook. */
(function () {
  'use strict';
  var API = 'https://cga.app.n8n.cloud/webhook/cga-enquiry';
  var WA = 'https://wa.me/919996647888?text=';
  var css = document.createElement('style');
  css.textContent = '.cgf{background:#fff;border:1px solid #d5e6ee;border-radius:16px;padding:1.4rem 1.3rem;box-shadow:0 6px 24px rgba(0,41,61,.06)}' +
    '.cgf h2{margin:0 0 .3rem;font-size:1.35rem;color:#00293d}.cgf .sub{margin:0 0 1rem;color:#4b5d68;font-size:.95rem}' +
    '.cgf-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.2rem 1rem}' +
    '.cgf label{display:block;font-size:.8rem;font-weight:700;margin:.7rem 0 .28rem;color:#0c1b25}' +
    '.cgf input,.cgf select,.cgf textarea{width:100%;box-sizing:border-box;border:1px solid #c9d6de;border-radius:10px;padding:.65rem .75rem;font:inherit;font-size:.95rem;background:#fff;color:#0c1b25}' +
    '.cgf textarea{min-height:90px;resize:vertical}.cgf .full{grid-column:1/-1}' +
    '.cgf button{margin-top:1rem;background:#005176;color:#fff;border:0;border-radius:10px;padding:.8rem 1.3rem;font-weight:700;font-size:1rem;cursor:pointer}' +
    '.cgf button[disabled]{opacity:.6;cursor:wait}.cgf .hp{position:absolute;left:-9999px}' +
    '.cgf .msg{display:none;margin:1rem 0 0;padding:.8rem .9rem;border-radius:10px;font-size:.93rem}' +
    '.cgf .msg.ok{display:block;background:#e7f5fa;border-left:3px solid #005176;color:#00293d}.cgf .msg.er{display:block;background:#fdecea;border-left:3px solid #b3261e;color:#7a1712}' +
    '.cgf .fine{font-size:.8rem;color:#5b6b75;margin:.8rem 0 0}';
  document.head.appendChild(css);

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function post(body) {
    body.page = location.pathname;
    return fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(function (r) { return r.json(); });
  }
  function val(f, n) { var e = f.querySelector('[name="' + n + '"]'); return e ? e.value.trim() : ''; }
  function wire(f, build, waText) {
    var m = f.querySelector('.msg'), b = f.querySelector('button');
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      m.className = 'msg';
      var body = build();
      var mob = String(body.mobile || '').replace(/[^0-9]/g, '').slice(-10);
      if ((body.name || '').length < 2 || !/^[6-9][0-9]{9}$/.test(mob) || !/^[^@ ]+@[^@ ]+\.[^@ ]+$/.test(body.email || '')) {
        m.className = 'msg er'; m.textContent = 'Naam, 10 digit mobile number aur sahi email daaliye.'; return;
      }
      body.mobile = mob;
      b.disabled = true; var t = b.textContent; b.textContent = 'Bhej rahe hain...';
      post(body).then(function (r) {
        b.disabled = false; b.textContent = t;
        if (r && r.ok) { m.className = 'msg ok'; m.innerHTML = esc(r.msg || 'Shukriya!') + ' <a href="' + WA + encodeURIComponent(waText(body)) + '" target="_blank" rel="noopener">WhatsApp par baat kariye &rarr;</a>'; f.reset(); }
        else { m.className = 'msg er'; m.textContent = (r && r.error) || 'Kuch galat ho gaya. Dobara try kariye.'; }
      }).catch(function () {
        b.disabled = false; b.textContent = t;
        m.className = 'msg er'; m.innerHTML = 'Network dikkat. Aap seedha <a href="' + WA + encodeURIComponent(waText(body)) + '" target="_blank" rel="noopener">WhatsApp par bhej dijiye</a>.';
      });
    });
  }

  var en = document.getElementById('cgaEnquiry');
  if (en) {
    fetch('data/service-docs.json').then(function (r) { return r.json(); }).catch(function () { return null; }).then(function (D) {
      var opts = '<option value="">Service chuniye</option>';
      if (D && D.groups) {
        D.groups.forEach(function (g) {
          opts += '<optgroup label="' + esc(g.g) + '">' + g.items.map(function (k) { var s = D.services[k]; return s ? '<option value="' + esc(k) + '">' + esc(s.name) + '</option>' : ''; }).join('') + '</optgroup>';
        });
      }
      opts += '<option value="other">Kuch aur / pata nahi</option>';
      en.innerHTML = '<form class="cgf" novalidate><h2>Enquiry bhejiye</h2><p class="sub">Service chuniye &mdash; us service ke zaroori documents ki list turant aapke email par aa jayegi. Team ek working day mein call karegi.</p>' +
        '<div class="cgf-g"><div><label for="ceName">Naam *</label><input id="ceName" name="name" autocomplete="name" maxlength="80"></div>' +
        '<div><label for="ceMob">Mobile (10 digit) *</label><input id="ceMob" name="mobile" type="tel" inputmode="numeric" maxlength="14" autocomplete="tel"></div>' +
        '<div><label for="ceEmail">Email *</label><input id="ceEmail" name="email" type="email" autocomplete="email" maxlength="120"></div>' +
        '<div><label for="ceCity">City</label><input id="ceCity" name="city" autocomplete="address-level2" maxlength="60"></div>' +
        '<div class="full"><label for="ceSvc">Service *</label><select id="ceSvc" name="service">' + opts + '</select></div>' +
        '<div class="full"><label for="ceMsg">Message</label><textarea id="ceMsg" name="message" maxlength="800" placeholder="Apni requirement thoda detail mein likhiye"></textarea></div></div>' +
        '<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><button type="submit">Enquiry bhejiye</button><p class="msg" role="status"></p>' +
        '<p class="fine">Aapki details sirf is enquiry ke jawab ke liye use hongi. Fees likhit mein, kaam shuru hone se pehle batayi jaati hai.</p></form>';
      var f = en.querySelector('form');
      wire(f, function () {
        var sel = f.querySelector('[name="service"]');
        var svc = sel.value, nm = svc ? sel.options[sel.selectedIndex].text : '';
        return { kind: 'enquiry', name: val(f, 'name'), mobile: val(f, 'mobile'), email: val(f, 'email').toLowerCase(), city: val(f, 'city'), service: svc === 'other' ? '' : svc, service_name: svc ? nm : 'General enquiry', message: val(f, 'message'), website: val(f, 'website') };
      }, function (b) { return 'Enquiry: ' + (b.service_name || '') + ' - ' + (b.name || ''); });
    });
  }

  var rm = document.getElementById('cgaRemind');
  if (rm) {
    rm.innerHTML = '<form class="cgf" novalidate><h2>Due date reminders paaiye</h2><p class="sub">GST, TDS, ITR aur ROC ki important dates se pehle email reminder &mdash; free.</p>' +
      '<div class="cgf-g"><div><label for="crName">Naam *</label><input id="crName" name="name" autocomplete="name" maxlength="80"></div>' +
      '<div><label for="crEmail">Email *</label><input id="crEmail" name="email" type="email" autocomplete="email" maxlength="120"></div>' +
      '<div><label for="crMob">Mobile (10 digit) *</label><input id="crMob" name="mobile" type="tel" inputmode="numeric" maxlength="14" autocomplete="tel"></div>' +
      '<div><label for="crType">Aap kaun hain</label><select id="crType" name="entity_type"><option>Salaried / individual</option><option>Proprietor / shop</option><option>Partnership / LLP</option><option>Private Limited company</option><option>Trust / NGO / Society</option><option>Professional / freelancer</option><option>Other</option></select></div></div>' +
      '<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><button type="submit">Reminders chalu kariye</button><p class="msg" role="status"></p></form>';
    var f2 = rm.querySelector('form');
    wire(f2, function () { return { kind: 'remind', name: val(f2, 'name'), email: val(f2, 'email').toLowerCase(), mobile: val(f2, 'mobile'), entity_type: val(f2, 'entity_type'), website: val(f2, 'website') }; },
      function (b) { return 'REMINDER - ' + (b.name || '') + ' - ' + (b.entity_type || ''); });
  }
})();
