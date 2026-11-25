/* CGA online onboarding (onboard.html): client self-onboarding (email OTP) and staff mode (?staff=1, PIN).
   Catalog: data/fee-quote.json, document checklist: data/service-docs.json, backend: n8n webhook cga-onboard. */
(function () {
  'use strict';
  var API = 'https://cga.app.n8n.cloud/webhook/cga-onboard';
  var app = document.getElementById('obApp');
  if (!app) { return; }
  var STAFF = /[?&]staff=1\b/.test(location.search);
  var ENT = ['Individual', 'Proprietorship', 'Partnership Firm', 'LLP', 'Private Limited Company', 'Public Limited Company', 'Section 8 Company', 'Trust', 'Society', 'HUF'];
  var BILL = ['One-time', 'Monthly', 'Quarterly', 'Half-yearly', 'Yearly'];
  var CAT = [], DOCS = {}, SEL = [], GROUP = 'all', Q = '';
  var KEY = STAFF ? 'cgaObStaff' : 'cgaObDraft';

  function esc(s) { return String(s == null ? '' : s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function txt(s) { var d = document.createElement('div'); d.innerHTML = String(s == null ? '' : s); return d.textContent; }
  function $(id) { return document.getElementById(id); }
  function guessBill(n) { n = n.toLowerCase(); if (/return filing|payroll|bookkeeping|accounting|virtual cfo|retainer/.test(n)) { return 'Monthly'; } if (/tds return/.test(n)) { return 'Quarterly'; } if (/itr|annual|roc|audit/.test(n)) { return 'Yearly'; } return 'One-time'; }
  function save() { try { var f = {}; ['obName', 'obEnt', 'obMob', 'obEmail', 'obPan', 'obGst', 'obAddr', 'obStaff', 'obCode', 'obDsc', 'obConf'].forEach(function (k) { var el = $(k); if (el) { f[k] = el.value; } }); localStorage.setItem(KEY, JSON.stringify({ f: f, s: SEL })); } catch (x) {} }
  function restore() { try { var d = JSON.parse(localStorage.getItem(KEY) || 'null'); if (!d) { return; } Object.keys(d.f || {}).forEach(function (k) { var el = $(k); if (el && !el.value) { el.value = d.f[k]; } }); if (Array.isArray(d.s)) { SEL = d.s.filter(function (x) { return x.custom || CAT.some(function (c) { return c.p === x.p && c.tiers.some(function (t) { return t.c === x.c; }); }); }); } } catch (x) {} }

  function shell() {
    app.innerHTML = ''
      + (STAFF ? '<div class="ob-staffbar"><b>Staff mode</b><span>Client ki details bhariye. Client ke email par sign link jayega aur aapko WhatsApp link milega.</span></div>' : '')
      + '<section class="ob-card" aria-labelledby="ob1"><h2 id="ob1"><i>1</i>' + (STAFF ? 'Client ki details' : 'Aapke baare mein') + '</h2><div class="ob-grid">'
      + '<label class="ob-f ob-w2"><span>Naam / Firm ka naam *</span><input id="obName" autocomplete="organization" maxlength="120" required></label>'
      + '<label class="ob-f"><span>Constitution *</span><select id="obEnt" required><option value="">Chuniye</option>' + ENT.map(function (e) { return '<option>' + e + '</option>'; }).join('') + '</select></label>'
      + '<label class="ob-f"><span>Mobile *</span><input id="obMob" inputmode="numeric" autocomplete="tel" maxlength="14" placeholder="10 digit"></label>'
      + '<label class="ob-f"><span>Email ' + (STAFF ? '(ho to)' : '*') + '</span><input id="obEmail" type="email" autocomplete="email" maxlength="120"></label>'
      + '<label class="ob-f"><span>PAN</span><input id="obPan" maxlength="10" style="text-transform:uppercase" placeholder="ABCDE1234F"></label>'
      + '<label class="ob-f"><span>GSTIN (ho to)</span><input id="obGst" maxlength="15" style="text-transform:uppercase"></label>'
      + '<label class="ob-f ob-w2"><span>Address</span><input id="obAddr" autocomplete="street-address" maxlength="200"></label>'
      + (STAFF ? '<label class="ob-f"><span>Client code (ho to)</span><input id="obCode" maxlength="30" placeholder="CGA-xxxx"></label><label class="ob-f"><span>DSC jinka CGA ke paas hai</span><input id="obDsc" maxlength="300" placeholder="Naam, comma se"></label><label class="ob-f ob-w2"><span>Conflict of interest (nahi to khaali)</span><input id="obConf" maxlength="300" placeholder="Naam | CGA se rishta | Interest"></label>' : '')
      + '<input id="obHp" class="ob-hp" tabindex="-1" autocomplete="off" aria-hidden="true">'
      + '</div></section>'
      + '<section class="ob-card" aria-labelledby="ob2"><h2 id="ob2"><i>2</i>Services chuniye</h2><p class="ob-muted">Service par click kariye aur apna case chuniye. Fees CGA ki published fees hai' + (STAFF ? '; final fee neeche likh sakte hain.' : ', final fee team kaam dekh kar likhit quote mein confirm karegi.') + '</p>'
      + '<input id="obQ" class="ob-search" type="search" placeholder="Service dhoondhiye: GST, ITR, company, trademark..." aria-label="Service dhoondhiye"><div class="ob-chips" id="obChips"></div><div class="ob-list" id="obList"></div>'
      + (STAFF ? '<div class="ob-custom"><input id="obCusName" placeholder="List mein nahi? Service ka naam" maxlength="120"><input id="obCusFee" inputmode="numeric" placeholder="Fee Rs" maxlength="8"><button type="button" id="obCusAdd" class="ob-btn ob-ghost">Jodiye</button></div>' : '')
      + '</section>'
      + '<section class="ob-card ob-sel" aria-labelledby="ob3"><h2 id="ob3"><i>3</i>Aapki services aur zaroori documents</h2><div id="obSel"></div><div id="obDocs"></div></section>'
      + '<section class="ob-card" aria-labelledby="ob4"><h2 id="ob4"><i>4</i>' + (STAFF ? 'Client ko bhejiye' : 'Verify kariye aur sign ke liye aage badhiye') + '</h2>'
      + (STAFF ? '<div class="ob-grid"><label class="ob-f"><span>Aapka naam *</span><input id="obStaff" maxlength="40"></label><label class="ob-f"><span>Staff PIN *</span><input id="obPin" type="password" autocomplete="off" maxlength="12"></label></div><button type="button" class="ob-btn" id="obGo">Engagement letter aur documents bhejiye</button>'
        : '<p class="ob-muted">Aapke email par ek OTP aayega. Verify hote hi aapka Engagement Letter aur Client Documentation (aapki chuni services ke hisaab se) khul jayega, jise aap usi waqt padh kar sign kar sakte hain.</p><div class="ob-otp"><button type="button" class="ob-btn ob-ghost" id="obSend">Email par OTP bhejiye</button><input id="obOtp" inputmode="numeric" maxlength="6" placeholder="6 digit OTP" aria-label="OTP" disabled><button type="button" class="ob-btn" id="obGo" disabled>Verify aur aage badhiye</button></div>')
      + '<p class="ob-msg" id="obMsg" role="status" aria-live="polite"></p><p class="ob-fine">Aapki jaankari sirf CGA ke kaam ke liye use hoti hai. <a href="privacy.html">Privacy Policy</a></p></section>';
  }

  function chips() {
    var gs = ['all'].concat(CAT.map(function (c) { return c.g; }).filter(function (g, i, a) { return a.indexOf(g) === i; }));
    $('obChips').innerHTML = gs.map(function (g) { return '<button type="button" class="ob-chip' + (g === GROUP ? ' on' : '') + '" data-g="' + esc(g) + '">' + (g === 'all' ? 'Sab' : esc(g)) + '</button>'; }).join('');
  }
  function isSel(p, c) { return SEL.some(function (x) { return x.p === p && x.c === c; }); }
  function list() {
    var q = Q.toLowerCase();
    var rows = CAT.filter(function (s) { return (GROUP === 'all' || s.g === GROUP) && (!q || (s.n + ' ' + s.tiers.map(function (t) { return t.n + ' ' + t.f; }).join(' ')).toLowerCase().indexOf(q) >= 0); });
    $('obList').innerHTML = rows.length ? rows.map(function (s) {
      var on = SEL.some(function (x) { return x.p === s.p; });
      return '<details class="ob-svc' + (on ? ' has' : '') + '"' + (q && rows.length < 4 ? ' open' : '') + '><summary><b>' + esc(s.n) + '</b>' + (on ? '<em>Chuna gaya</em>' : '') + '</summary><div class="ob-tiers">'
        + s.tiers.map(function (t) { var o = isSel(s.p, t.c); return '<button type="button" class="ob-tier' + (o ? ' on' : '') + '" data-p="' + esc(s.p) + '" data-c="' + esc(t.c) + '" aria-pressed="' + o + '"><b>' + esc(t.n) + '</b><span>' + esc(t.f) + '</span><strong>' + esc(t.pt || 'Quote par') + '</strong></button>'; }).join('')
        + '</div></details>';
    }).join('') : '<p class="ob-muted">Koi service nahi mili. ' + (STAFF ? 'Neeche "List mein nahi?" se jodiye.' : '<a href="https://wa.me/919996647888?text=Mujhe%20service%20ke%20baare%20mein%20poochna%20hai" target="_blank" rel="noopener">WhatsApp par poochiye</a>') + '</p>';
  }
  function find(p, c) { var s = CAT.filter(function (x) { return x.p === p; })[0]; if (!s) { return null; } var t = s.tiers.filter(function (x) { return x.c === c; })[0]; return t ? { s: s, t: t } : null; }
  function selected() {
    if (!SEL.length) { $('obSel').innerHTML = '<p class="ob-muted">Abhi koi service nahi chuni. Upar se chuniye.</p>'; $('obDocs').innerHTML = ''; return; }
    $('obSel').innerHTML = '<div class="ob-rows">' + SEL.map(function (x, i) {
      var f = x.custom ? null : find(x.p, x.c);
      var nm = x.custom ? x.custom : (f.s.n + ' - ' + f.t.n);
      var price = x.custom ? (x.fee ? '&#8377;' + Number(x.fee).toLocaleString('en-IN') + ' + GST' : 'As agreed') : esc(f.t.pt || 'Quote par');
      return '<div class="ob-row"><div class="ob-rn"><b>' + esc(nm) + '</b><span>' + price + '</span></div>'
        + '<label class="ob-mini"><span>Billing</span><select data-i="' + i + '" class="obBill">' + BILL.map(function (b) { return '<option' + (b === x.billing ? ' selected' : '') + '>' + b + '</option>'; }).join('') + '</select></label>'
        + (STAFF && !x.custom ? '<label class="ob-mini"><span>Final fee Rs</span><input data-i="' + i + '" class="obFee" inputmode="numeric" maxlength="8" value="' + esc(x.fee || '') + '" placeholder="' + esc(f.t.from || '') + '"></label>' : '')
        + '<button type="button" class="ob-x" data-i="' + i + '" aria-label="Hataiye">&times;</button></div>';
    }).join('') + '</div>';
    var pages = SEL.filter(function (x) { return !x.custom; }).map(function (x) { return x.p; }).filter(function (p, i, a) { return a.indexOf(p) === i; });
    var html = pages.map(function (p) { var d = DOCS[p]; if (!d) { return ''; } return '<details class="ob-doc" open><summary>' + esc(d.name) + ' ke liye documents</summary>' + (d.cards || []).map(function (c) { return '<p class="ob-dh">' + esc(c.t) + '</p><ul>' + (c.li || []).map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul>'; }).join('') + '</details>'; }).join('');
    $('obDocs').innerHTML = html ? '<h3 class="ob-dt">Kaam shuru karne ke liye ye documents tayyar rakhiye</h3>' + html + '<p class="ob-muted">Ye list email mein bhi aayegi. Sign ke baad documents portal ke Document Locker mein upload kar sakte hain.</p>' : '';
  }
  function msg(t, bad) { var m = $('obMsg'); m.textContent = t || ''; m.className = 'ob-msg' + (bad ? ' bad' : t ? ' ok' : ''); }
  function collect() {
    var g = function (id) { var el = $(id); return el ? el.value.trim() : ''; };
    return { name: g('obName'), entity_type: g('obEnt'), mobile: g('obMob').replace(/\D/g, '').slice(-10), email: g('obEmail').toLowerCase(), pan: g('obPan').toUpperCase(), gstin: g('obGst').toUpperCase(), address: g('obAddr'), client_code: g('obCode'), dsc_holders: g('obDsc'), conflict: g('obConf'), staff_name: g('obStaff'), website: g('obHp'),
      services: SEL.map(function (x) { return x.custom ? { custom: x.custom, fee: x.fee || 0, billing: x.billing } : { p: x.p, c: x.c, fee: x.fee || 0, billing: x.billing }; }) };
  }
  function check(d) {
    if (d.name.length < 2) { return 'Naam / firm ka naam daaliye.'; }
    if (!d.entity_type) { return 'Constitution chuniye.'; }
    if (d.mobile.length !== 10) { return '10 digit mobile number daaliye.'; }
    if ((!STAFF || d.email) && !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(d.email)) { return 'Sahi email daaliye.'; }
    if (d.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(d.pan)) { return 'PAN sahi format mein nahi hai (ABCDE1234F).'; }
    if (d.gstin && !/^[0-9]{2}[A-Z0-9]{13}$/.test(d.gstin)) { return 'GSTIN 15 character ka hota hai.'; }
    if (!SEL.length) { return 'Kam se kam ek service chuniye.'; }
    return '';
  }
  function post(body) { return fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(function (r) { return r.json(); }); }
  function busy(el, on, label) { if (!el) { return; } el.disabled = on; if (label) { el.textContent = label; } }
  function done(r) {
    try { localStorage.removeItem(KEY); } catch (x) {}
    var box = '<div class="ob-done">';
    if (r.already) { box += '<h2>Shukriya!</h2><p>' + esc(r.msg) + '</p><p><a class="ob-btn" href="index.html">Home par jaiye</a></p>'; }
    else if (STAFF) {
      box += '<h2>Bhej diya &#10004;</h2><p><b>' + esc(r.kit_id) + '</b>: ' + (r.emailed ? 'client ke email par sign link chala gaya.' : 'client ka email nahi tha, WhatsApp se link bhejiye.') + ' Team ko bhi copy gayi hai.</p>'
        + '<div class="ob-link"><input readonly value="' + esc(r.link) + '" id="obLink" aria-label="Sign link"><button type="button" class="ob-btn ob-ghost" id="obCopy">Copy</button></div>'
        + '<p><a class="ob-btn ob-wa" href="' + esc(r.wa) + '" target="_blank" rel="noopener">WhatsApp par client ko bhejiye</a> <a class="ob-btn ob-ghost" href="onboard.html?staff=1">Naya client</a></p>';
    } else {
      box += '<h2>Email verify ho gaya &#10004;</h2><p>Aapka Engagement Letter aur Client Documentation (' + esc(r.kit_id) + ') taiyar hai. Ab ise padhiye aur email OTP se sign kariye. Link aapke email par bhi bhej diya gaya hai.</p><p><a class="ob-btn" href="' + esc(r.link) + '">Documents padhiye aur sign kariye &rarr;</a></p><p class="ob-muted">Kuch second mein apne aap khul jayega...</p>';
      setTimeout(function () { location.href = r.link; }, 4000);
    }
    app.innerHTML = box + '</div>';
    var cp = $('obCopy'); if (cp) { cp.addEventListener('click', function () { var i = $('obLink'); i.select(); try { navigator.clipboard.writeText(i.value); } catch (x) { document.execCommand('copy'); } cp.textContent = 'Copied'; }); }
    app.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function bind() {
    app.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('button') : null; if (!t) { return; }
      if (t.classList.contains('ob-chip')) { GROUP = t.getAttribute('data-g'); chips(); list(); }
      else if (t.classList.contains('ob-tier')) {
        var p = t.getAttribute('data-p'), c = t.getAttribute('data-c');
        if (isSel(p, c)) { SEL = SEL.filter(function (x) { return !(x.p === p && x.c === c); }); }
        else { var f = find(p, c); SEL = SEL.filter(function (x) { return x.p !== p; }); SEL.push({ p: p, c: c, billing: guessBill(f.s.n), fee: 0 }); }
        list(); selected(); save();
      } else if (t.classList.contains('ob-x')) { SEL.splice(+t.getAttribute('data-i'), 1); list(); selected(); save(); }
      else if (t.id === 'obCusAdd') { var n = $('obCusName').value.trim(); if (n.length < 3) { $('obCusName').focus(); return; } SEL.push({ custom: n, fee: Number($('obCusFee').value.replace(/\D/g, '')) || 0, billing: 'One-time' }); $('obCusName').value = ''; $('obCusFee').value = ''; selected(); save(); }
      else if (t.id === 'obSend') {
        var d = collect(); var er = check(d); if (er) { msg(er, true); return; }
        busy(t, true, 'Bhej rahe hain...'); msg('');
        post({ action: 'otp', email: d.email, name: d.name, website: d.website }).then(function (r) {
          if (r && r.ok) { msg('OTP ' + d.email + ' par bheja gaya. Inbox / spam check kariye.'); $('obOtp').disabled = false; $('obGo').disabled = false; $('obOtp').focus(); var s = 45; var iv = setInterval(function () { s--; t.textContent = 'Dobara bhejiye (' + s + 's)'; if (s <= 0) { clearInterval(iv); busy(t, false, 'OTP dobara bhejiye'); } }, 1000); }
          else { msg((r && r.error) || 'OTP nahi gaya. Dobara try kariye.', true); busy(t, false, 'Email par OTP bhejiye'); }
        }).catch(function () { msg('Network error. Internet check karke dobara try kariye.', true); busy(t, false, 'Email par OTP bhejiye'); });
      } else if (t.id === 'obGo') {
        var d2 = collect(); var er2 = check(d2); if (er2) { msg(er2, true); return; }
        if (STAFF) { if (!d2.staff_name) { msg('Apna naam daaliye.', true); return; } d2.pin = $('obPin').value.trim(); if (!d2.pin) { msg('Staff PIN daaliye.', true); return; } d2.mode = 'staff'; }
        else { d2.otp = $('obOtp').value.replace(/\D/g, ''); if (d2.otp.length !== 6) { msg('6 digit OTP daaliye.', true); return; } d2.mode = 'client'; }
        d2.action = 'submit';
        var lbl = t.textContent; busy(t, true, 'Documents ban rahe hain...'); msg('');
        post(d2).then(function (r) { if (r && r.ok) { done(r); } else { msg((r && r.error) || 'Kuch galat hua. Dobara try kariye.', true); busy(t, false, lbl); } })
          .catch(function () { msg('Network error. Dobara try kariye.', true); busy(t, false, lbl); });
      }
    });
    app.addEventListener('change', function (e) { var el = e.target; if (el.classList.contains('obBill')) { SEL[+el.getAttribute('data-i')].billing = el.value; save(); } });
    app.addEventListener('input', function (e) { var el = e.target; if (el.id === 'obQ') { Q = el.value.trim(); list(); return; } if (el.classList.contains('obFee')) { SEL[+el.getAttribute('data-i')].fee = Number(el.value.replace(/\D/g, '')) || 0; } if (el.id === 'obOtp') { el.value = el.value.replace(/\D/g, ''); } save(); });
  }

  Promise.all([fetch('data/fee-quote.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }), fetch('data/service-docs.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).catch(function () { return {}; })]).then(function (r) {
    (r[0].groups || []).forEach(function (g) { (g.s || []).forEach(function (s) { CAT.push({ g: g.g, n: txt(s.n), p: s.p, tiers: (s.t || []).map(function (t) { return { c: t.c, n: txt(t.n), f: txt(t.f || ''), pt: txt(t.pt || ''), from: t.from || '' }; }) }); }); });
    DOCS = (r[1] && r[1].services) || {};
    Object.keys(DOCS).forEach(function (k) { DOCS[k].name = txt(DOCS[k].name); (DOCS[k].cards || []).forEach(function (c) { c.t = txt(c.t); c.li = (c.li || []).map(txt); }); });
    shell(); restore(); chips(); list(); selected(); bind();
    var pre = (location.search.match(/[?&]s=([a-z0-9-]+\.html)/) || [])[1];
    if (pre && !SEL.length) { var s = CAT.filter(function (x) { return x.p === pre; })[0]; if (s && s.tiers[0]) { SEL.push({ p: s.p, c: s.tiers[0].c, billing: guessBill(s.n), fee: 0 }); list(); selected(); } }
  }).catch(function () { app.innerHTML = '<p class="ob-msg bad">Services load nahi hui. Page refresh kariye ya <a href="https://wa.me/919996647888">WhatsApp kariye</a>.</p>'; });
})();
