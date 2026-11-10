/* CGA AI Drafting Assistant - staff only. Uses the portal session (cga_portal_session). */
(function () {
  'use strict';
  var API = 'https://cga.app.n8n.cloud/webhook/cga-draft';
  var app = document.getElementById('drApp');
  if (!app) { return; }
  var S = null;
  try { S = JSON.parse(localStorage.getItem('cga_portal_session') || 'null'); } catch (e) { S = null; }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  if (!S || !S.token || ['staff', 'senior', 'admin'].indexOf(String(S.role || '').toLowerCase()) < 0) {
    app.innerHTML = '<div class="dr-lock"><b>Ye tool sirf CGA team ke liye hai.</b><p>Pehle CGA Portal mein apne staff login se login kariye, phir ye page dobara kholiye.</p><a class="btn btn-gold" href="portal.html">Portal login</a></div>';
    return;
  }
  var EX = {
    gst_reply: 'Client: Sharma Traders, Haryana. ASMT-10 for FY 2024-25: ITC in 3B Rs 1.2 lakh more than 2B. Reason: 3 March invoices uploaded by supplier in April GSTR-1. Invoices and payment proof available.',
    it_reply: 'Client: Ramesh Kumar. Notice for AY 2024-25 asking source of cash deposit Rs 8 lakh in Nov 2023. Source: sale of agricultural produce (land 5 acre, Jind) + savings. Mandi receipts available.',
    client_email: 'Remind client ABC Pvt Ltd that GSTR-3B for October is due on 20th; purchase bills still pending; ask them to upload on portal by 15th.',
    legal_notice: 'Client: Gupta Paper. Amount due Rs 2,40,000 from XYZ Traders against invoices of Jan-Mar 2026; repeated reminders ignored. Demand payment in 15 days with 18% interest.',
    engagement: 'Client: New Pvt Ltd company (startup). Scope: monthly GST, TDS, accounting, ROC annual filing. Fee Rs 6,000 per month + GST, payable in advance. Start from 1 Dec 2026.',
    followup: 'Ask client Mr. Verma to send Form 16, bank statements and rent receipts for ITR; third reminder; politely mention due date.',
    other: 'Describe what you need drafted and the facts.'
  };
  app.innerHTML = '<p class="dr-hi">Namaste <b>' + esc(S.name || S.email) + '</b> &mdash; facts likhiye, AI pehla draft bana dega. <b>Bhejne se pehle zaroor padhiye aur check kariye.</b></p>' +
    '<div class="dr-g"><div><label for="drType">Kya banana hai</label><select id="drType" class="dr-in"><option value="gst_reply">GST notice ka reply</option><option value="it_reply">Income-tax notice ka reply</option><option value="client_email">Client ko email</option><option value="legal_notice">Legal notice</option><option value="engagement">Engagement letter / fee proposal</option><option value="followup">Follow-up / document request</option><option value="other">Kuch aur</option></select></div>' +
    '<div><label for="drLang">Bhasha</label><select id="drLang" class="dr-in"><option>English</option><option>Hinglish</option><option>Hindi</option></select></div>' +
    '<div><label for="drTone">Tone</label><select id="drTone" class="dr-in"><option>Formal</option><option>Firm</option><option>Polite</option><option>Friendly</option></select></div></div>' +
    '<label for="drFacts">Facts aur instructions</label><textarea id="drFacts" class="dr-in" rows="7" maxlength="6000"></textarea>' +
    '<div class="dr-act"><button type="button" class="btn btn-gold" id="drGo">Draft banaiye</button><span class="dr-msg" id="drMsg" aria-live="polite"></span></div><div id="drOut"></div>';
  var t = document.getElementById('drType'), f = document.getElementById('drFacts');
  function ph() { f.placeholder = 'Example: ' + EX[t.value]; }
  t.onchange = ph; ph();
  function msg(x, bad) { var m = document.getElementById('drMsg'); m.textContent = x; m.className = 'dr-msg' + (bad ? ' bad' : ''); }
  document.getElementById('drGo').onclick = function () {
    var btn = this, facts = f.value.trim();
    if (facts.length < 20) { msg('Thode aur facts likhiye.', true); return; }
    btn.disabled = true; msg('Draft ban raha hai... (30-60 second)');
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: S.token, type: t.value, lang: document.getElementById('drLang').value, tone: document.getElementById('drTone').value, facts: facts }) })
      .then(function (r) { return r.json(); })
      .then(function (r) {
        btn.disabled = false;
        if (!r || !r.ok) { msg((r && r.error) || 'Draft nahi ban paya.', true); if (r && r.auth === false) { setTimeout(function () { location.href = 'portal.html'; }, 2500); } return; }
        msg('Draft taiyar. Neeche edit kar sakte hain.');
        document.getElementById('drOut').innerHTML = (r.checks && r.checks.length ? '<div class="dr-chk"><b>Bhejne se pehle check kariye</b><ul>' + r.checks.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></div>' : '') +
          (r.cut ? '<p class="dr-msg bad">Draft lamba tha, aakhri hissa kat gaya ho sakta hai.</p>' : '') +
          '<textarea id="drText" class="dr-in dr-text" rows="22"></textarea><div class="dr-act"><button type="button" class="btn btn-gold" id="drCopy">Copy</button><button type="button" class="btn dr-ghost" id="drWord">Word (.doc) download</button></div>';
        document.getElementById('drText').value = r.draft;
        document.getElementById('drCopy').onclick = function () { var x = document.getElementById('drText'); if (navigator.clipboard) { navigator.clipboard.writeText(x.value).then(function () { msg('Copy ho gaya.'); }); } else { x.select(); document.execCommand('copy'); msg('Copy ho gaya.'); } };
        document.getElementById('drWord').onclick = function () {
          var body = esc(document.getElementById('drText').value).split(String.fromCharCode(10)).join('<br>');
          var html = '<html><head><meta charset="utf-8"></head><body style="font-family:Arial;font-size:11pt;line-height:1.5">' + body + '</body></html>';
          var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['\ufeff', html], { type: 'application/msword' })); a.download = 'CGA-draft-' + t.value + '.doc'; document.body.appendChild(a); a.click(); a.parentNode.removeChild(a);
        };
        document.getElementById('drText').scrollIntoView({ behavior: 'smooth', block: 'start' });
      })
      .catch(function () { btn.disabled = false; msg('Network dikkat. Dobara try kariye.', true); });
  };
})();
