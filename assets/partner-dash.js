/* CGA Partner Dashboard: shows a verified partner's referrals and lets them refer a client */
(function () {
  var root = document.getElementById('pdApp');
  if (!root) { return; }
  var API = 'https://cga.app.n8n.cloud/webhook/cga-partner-api';
  var SEND = 'https://cga.app.n8n.cloud/webhook/cga-partner';
  var t = '';
  try { t = new URLSearchParams(location.search).get('t') || ''; } catch (e) {}
  if (!t) { try { t = localStorage.getItem('cga_partner_t') || ''; } catch (e) {} }
  var ST = { new: ['Call hona baaki', '#b3261e', '#fdecea'], contacted: ['Client se baat ho gayi', '#005176', '#e6f2f7'], started: ['Kaam chal raha hai', '#8a6d00', '#fff6d6'], done: ['Kaam pura', '#17773f', '#e3f4ea'], lost: ['Aage nahi badha', '#5b6b75', '#eef1f3'] };
  function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function $(id) { return document.getElementById(id); }
  function fail(msg) { root.innerHTML = '<div class="pd-card pd-err"><h2>Dashboard nahi khul paaya</h2><p>' + esc(msg) + '</p><p><a class="btn btn-gold" href="partners.html">Partner page par jaiye</a></p></div>'; }
  if (t.length < 24) { fail('Ye link adhoora hai. Apne welcome email wala link dobara kholiye, ya CGA team se sampark kariye: +91 99966 47888'); return; }
  function load() {
    root.innerHTML = '<div class="pd-card"><p>Load ho raha hai...</p></div>';
    fetch(API, { method: 'POST', body: JSON.stringify({ t: t }) }).then(function (r) { return r.json(); }).then(function (d) {
      if (!d || !d.ok) { try { localStorage.removeItem('cga_partner_t'); } catch (e) {} fail((d && d.error) || 'Link sahi nahi hai.'); return; }
      try { localStorage.setItem('cga_partner_t', t); } catch (e) {}
      try { if (location.search) { history.replaceState(null, '', location.pathname); } } catch (e) {}
      render(d);
    }).catch(function () { fail('Network problem. Thodi der baad dobara kholiye.'); });
  }
  function render(d) {
    var p = d.partner || {}, refs = d.refs || [];
    var c = { all: refs.length, open: 0, done: 0 };
    refs.forEach(function (r) { if (r.status === 'done') { c.done++; } else if (r.status !== 'lost') { c.open++; } });
    var rows = refs.length ? refs.map(function (r) { var s = ST[r.status] || ST.new; return '<tr><td><b>' + esc(r.client) + '</b><br><small>' + esc(r.mobile) + '</small></td><td>' + esc(r.service || '-') + '</td><td>' + esc(r.date) + '</td><td><span class="pd-st" style="color:' + s[1] + ';background:' + s[2] + '">' + s[0] + '</span>' + (r.updated ? '<br><small>' + esc(r.updated) + '</small>' : '') + '</td></tr>'; }).join('') : '<tr><td colspan="4" class="pd-empty">Abhi tak koi client nahi bheja. Neeche form se pehla client bhejiye.</td></tr>';
    root.innerHTML = '<div class="pd-hello"><div><p class="eyebrow">Partner Dashboard</p><p class="pd-name">Namaste, ' + esc(p.name) + '</p><p class="pd-meta">' + [p.org, p.type, p.city].filter(Boolean).map(esc).join(' &middot; ') + ' &middot; Partner ID ' + esc(p.id) + '</p></div><button type="button" class="pd-out" id="pdOut">Logout</button></div>'
      + '<div class="pd-kpis"><div><b>' + c.all + '</b><span>Kul client bheje</span></div><div><b>' + c.open + '</b><span>Chal rahe</span></div><div><b>' + c.done + '</b><span>Kaam pura</span></div></div>'
      + '<div class="pd-card"><h2>Aapke bheje client</h2><div class="pd-tw"><table class="pd-t"><thead><tr><th>Client</th><th>Kaam</th><th>Bheja</th><th>Status</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>'
      + '<div class="pd-card" id="pdRefer"><h2>Naya client bhejiye</h2><p class="pd-lede">Client ki anumati se details bhejiye. Team office samay mein 2 ghante ke andar call karegi. Har step ka update aapko email par milega.</p>'
      + '<form id="pdForm" novalidate><input class="pt-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">'
      + '<div class="pd-g"><div><label>Client ka naam *</label><input name="client_name" required maxlength="80"></div><div><label>Client ka mobile *</label><input name="client_mobile" type="tel" required maxlength="13" inputmode="tel"></div>'
      + '<div><label>Kya kaam chahiye *</label>' + document.getElementById('pdSvc').innerHTML + '</div><div><label>City</label><input name="city" maxlength="60"></div>'
      + '<div class="pd-full"><label>Kuch aur batana hai?</label><textarea name="notes" rows="2" maxlength="600"></textarea></div></div>'
      + '<label class="pd-decl"><input type="checkbox" required> <span>Client ne apni details CGA ko dene ki anumati di hai.</span></label>'
      + '<button type="submit" class="btn btn-gold">Client bhejiye</button><p class="pd-msg" id="pdMsg" role="status" aria-live="polite"></p></form></div>'
      + '<div class="pd-card pd-help"><h2>Kaam ki links</h2><p><a href="services.html">Saari services</a> &middot; <a href="fee-quote.html">Fee quote</a> &middot; <a href="free-tools.html">Free tools</a> &middot; <a href="compliance-calendar.html">Compliance calendar</a> &middot; <a href="documents-checklist.html">Documents checklist</a></p><p>Partner desk: <a href="https://wa.me/919996647888">WhatsApp +91 99966 47888</a> &middot; <a href="mailto:admin@cgaindia.com">admin@cgaindia.com</a></p></div>';
    $('pdOut').addEventListener('click', function () { try { localStorage.removeItem('cga_partner_t'); } catch (e) {} location.href = 'partners.html'; });
    var f = $('pdForm');
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var msg = $('pdMsg');
      var cm = String(f.client_mobile.value || '').replace(/[^0-9]/g, '').slice(-10);
      if (f.client_name.value.trim().length < 2 || cm.length !== 10 || !f.service.value || !f.querySelector('input[type=checkbox]').checked) { msg.className = 'pd-msg err'; msg.textContent = 'Client ka naam, 10 digit mobile, kaam aur anumati wala tick zaroori hai.'; return; }
      var data = { kind: 'refer', website: f.website.value, partner_name: p.name, partner_mobile: p.mobile, partner_email: p.email, org: p.org, partner_type: p.type, state: p.state, client_name: f.client_name.value.trim(), client_mobile: cm, service: f.service.value, city: f.city.value.trim(), notes: f.notes.value.trim() };
      var b = f.querySelector('button[type=submit]'); b.disabled = true; msg.className = 'pd-msg'; msg.textContent = 'Bhej rahe hain...';
      fetch(SEND, { method: 'POST', body: JSON.stringify(data) }).then(function (r) { return r.json(); }).then(function (r) {
        if (r && r.ok) { msg.className = 'pd-msg ok'; msg.textContent = 'Client bhej diya. Referral ID: ' + r.id + '. Team 2 ghante ke andar call karegi.'; f.reset(); setTimeout(load, 2500); }
        else { msg.className = 'pd-msg err'; msg.textContent = 'Nahi bhej paaye. Dobara try kariye ya WhatsApp kariye: +91 99966 47888'; }
      }).catch(function () { msg.className = 'pd-msg err'; msg.textContent = 'Network problem. Dobara try kariye.'; }).then(function () { b.disabled = false; });
    });
  }
  load();
})();
