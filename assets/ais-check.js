/* CGA AIS vs ITR Mismatch Checker: runs fully in the browser; nothing is sent anywhere */
(function () {
  var box = document.getElementById('aisApp');
  if (!box) { return; }
  var ROWS = [
    ['sal', 'Salary', 'inc', 'TIS: Salary'],
    ['sb', 'Savings bank interest', 'inc', 'TIS: Interest from savings bank'],
    ['fd', 'FD / RD / deposit interest', 'inc', 'TIS: Interest from deposit'],
    ['oi', 'Doosra interest (refund, bonds, P2P)', 'inc', 'TIS: Interest from others / income tax refund'],
    ['div', 'Dividend', 'inc', 'TIS: Dividend'],
    ['rent', 'Rent mila', 'inc', 'TIS: Rent received'],
    ['sec', 'Shares / mutual fund bechne ki raqam', 'sale', 'TIS: Sale of securities and units of mutual fund (sale value)'],
    ['prop', 'Property bechne ki raqam', 'sale', 'TIS: Sale of immovable property'],
    ['biz', 'Business receipts / GST turnover', 'inc', 'TIS: Business receipts / GST turnover'],
    ['vda', 'Crypto (VDA), lottery, winnings, doosri income', 'inc', 'TIS: Any other income'],
    ['tds', 'TDS / TCS (kul)', 'tds', 'AIS: TDS/TCS information (kul)']
  ];
  function n(v) { var x = parseFloat(String(v || '').replace(/[^0-9.]/g, '')); return isFinite(x) ? x : 0; }
  function inr(x) { return '₹' + Math.round(x).toLocaleString('en-IN'); }
  function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  var rowsHtml = ROWS.map(function (r) {
    return '<tr><td><b>' + r[1] + '</b><br><small>' + r[3] + '</small></td><td><input inputmode="decimal" data-k="' + r[0] + '" data-c="a" placeholder="0" aria-label="' + r[1] + ' AIS"></td><td><input inputmode="decimal" data-k="' + r[0] + '" data-c="i" placeholder="0" aria-label="' + r[1] + ' ITR"></td></tr>';
  }).join('');
  box.innerHTML = '<div class="ac-card"><div class="ac-q"><label>Is saal ka ITR file kar diya hai?</label><div class="ac-seg"><label><input type="radio" name="filed" value="yes" checked> Haan, file kiya hai</label><label><input type="radio" name="filed" value="no"> Nahi kiya</label></div></div>'
    + '<div class="ac-tw"><table class="ac-t"><thead><tr><th>Income / entry</th><th>AIS / TIS mein</th><th>ITR mein dikhaya</th></tr></thead><tbody>' + rowsHtml + '</tbody></table></div>'
    + '<p class="ac-hint">Sirf wahi lines bhariye jo aapke AIS/TIS mein hain. Raqam rupees mein, bina comma ke bhi chalega. Ye calculation sirf aapke browser mein hota hai, koi data hamare paas nahi aata.</p>'
    + '<button type="button" class="btn btn-gold" id="acRun">Risk check kariye</button></div><div id="acOut"></div>';
  document.getElementById('acRun').addEventListener('click', run);
  function run() {
    var v = {};
    [].forEach.call(box.querySelectorAll('input[data-k]'), function (i) { v[i.getAttribute('data-k') + i.getAttribute('data-c')] = n(i.value); });
    var filed = (box.querySelector('input[name=filed]:checked') || {}).value === 'yes';
    var issues = [], totalAis = 0, anyAis = false;
    ROWS.forEach(function (r) {
      var a = v[r[0] + 'a'] || 0, it = v[r[0] + 'i'] || 0;
      if (a > 0) { anyAis = true; }
      if (r[2] === 'inc') { totalAis += a; }
      if (!filed) { return; }
      if (r[2] === 'tds') {
        if (it > a + 100) { issues.push({ lvl: 3, k: r[1], a: a, i: it, d: it - a, t: 'ITR mein AIS se zyada TDS claim kiya hai. Processing mein ye credit kat sakta hai aur demand aa sakti hai.' }); }
        else if (a > it + 1000) { issues.push({ lvl: 1, k: r[1], a: a, i: it, d: a - it, t: 'AIS mein ITR se zyada TDS dikh raha hai. Aap kam refund le rahe ho sakte hain; revise karke poora credit lijiye.' }); }
        return;
      }
      if (r[2] === 'sale') {
        if (a > 0 && it === 0) { issues.push({ lvl: 3, k: r[1], a: a, i: it, d: a, t: 'AIS mein bikri dikh rahi hai par ITR mein capital gains nahi dikhaye. Ye sabse aam notice ki wajah hai, chahe gain chhota ho ya loss ho.' }); }
        else if (a - it > Math.max(10000, a * 0.05)) { issues.push({ lvl: 2, k: r[1], a: a, i: it, d: a - it, t: 'ITR mein dikhayi bikri ki raqam AIS se kam hai. Har transaction milaiye.' }); }
        return;
      }
      var d = a - it;
      if (d > Math.max(1000, a * 0.02)) { issues.push({ lvl: d >= 50000 ? 3 : (d >= 10000 ? 2 : 1), k: r[1], a: a, i: it, d: d, t: 'ITR mein ' + inr(d) + ' kam income dikhayi gayi hai.' }); }
    });
    var lvl = 0, head = '', advice = [];
    if (!filed) {
      if (totalAis > 250000 || v.seca > 0 || v.propa > 0) { lvl = 3; head = 'High risk: AIS mein ' + inr(totalAis) + ' income dikh rahi hai aur ITR file nahi hua'; }
      else if (anyAis) { lvl = 2; head = 'Medium: AIS mein entries hain, ITR file karna faydemand ho sakta hai'; }
      advice.push('Belated return ki samay seema nikal gayi ho to updated return (ITR-U) se file kiya ja sakta hai, jisme additional tax lagta hai. Jaldi file karna sasta padta hai.');
      if (v.tdsa > 0) { advice.push('AIS mein ' + inr(v.tdsa) + ' TDS kata hai. ITR file kiye bina ye refund nahi milega.'); }
    } else {
      issues.forEach(function (x) { if (x.lvl > lvl) { lvl = x.lvl; } });
      head = lvl === 3 ? 'High risk: notice aane ki sambhavna zyada hai' : (lvl === 2 ? 'Medium risk: kuch entries milani zaroori hain' : (lvl === 1 ? 'Low risk: chhote farak hain' : 'Sab theek dikh raha hai'));
      if (lvl >= 2) { advice.push('Revised return ki samay seema baaki ho to ITR revise karke farak theek kiya ja sakta hai. Samay nikal gaya ho to updated return (ITR-U) ka raasta hai.'); }
      if (lvl >= 1) { advice.push('Agar AIS ki koi entry galat hai (jaise kisi aur ka transaction, duplicate entry), to AIS portal par "Feedback" dekar use theek karwaiye.'); }
    }
    if (!anyAis) { document.getElementById('acOut').innerHTML = '<div class="ac-card ac-res"><p>Pehle AIS / TIS ki raqam bhariye.</p></div>'; return; }
    var colors = ['#17773f', '#8a6d00', '#c25e00', '#b3261e'];
    var table = issues.length ? '<div class="ac-tw"><table class="ac-t ac-r"><thead><tr><th>Entry</th><th>AIS</th><th>ITR</th><th>Kya dikkat</th></tr></thead><tbody>' + issues.sort(function (a, b) { return b.lvl - a.lvl; }).map(function (x) { return '<tr><td><span class="ac-dot" style="background:' + colors[x.lvl] + '"></span><b>' + esc(x.k) + '</b></td><td>' + inr(x.a) + '</td><td>' + inr(x.i) + '</td><td>' + esc(x.t) + '</td></tr>'; }).join('') + '</tbody></table></div>' : '';
    var wa = 'https://wa.me/919996647888?text=' + encodeURIComponent('AIS Mismatch Checker result: ' + head + '. ' + issues.length + ' farak mile. Mujhe madad chahiye.');
    var cta = lvl >= 2
      ? '<div class="ac-cta"><button type="button" class="btn btn-gold" id="acFix">' + (filed ? 'CGA se ITR revise karwaiye: ₹999 se' : 'CGA se ITR file karwaiye: ₹999 se') + '</button><button type="button" class="btn btn-ghost" id="acNotice">Notice aa chuka hai? Reply ₹2,999 se</button><a class="btn btn-ghost" href="' + wa + '" target="_blank" rel="noopener">WhatsApp par result bhejiye</a></div>'
      : '<div class="ac-cta"><a class="btn btn-ghost" href="' + wa + '" target="_blank" rel="noopener">WhatsApp par expert se poochiye</a><a class="btn btn-ghost" href="notice-cover.html">Notice Cover plan dekhiye</a></div>';
    document.getElementById('acOut').innerHTML = '<div class="ac-card ac-res" style="border-top:5px solid ' + colors[lvl] + '"><p class="ac-badge" style="background:' + colors[lvl] + '">' + ['Low risk', 'Low risk', 'Medium risk', 'High risk'][lvl] + '</p><h2>' + esc(head) + '</h2>' + table
      + (advice.length ? '<ul class="ac-adv">' + advice.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>' : '')
      + cta + '<p class="ac-fine">Ye ek shuruaati jaanch hai, kanooni raay nahi. Aakhri faisla aapke documents dekh kar hi ho sakta hai.</p></div>';
    var go = function (svc, amt) { if (window.CGAPay) { window.CGAPay.open({ service: svc, amount: amt, invoice: 'AIS-' + Date.now().toString(36).toUpperCase(), tier: 'ais', lockService: true }); } else { location.href = wa; } };
    var f = document.getElementById('acFix'); if (f) { f.addEventListener('click', function () { go(filed ? 'ITR revise (AIS mismatch fix)' : 'ITR filing (AIS mismatch)', 999); }); }
    var g = document.getElementById('acNotice'); if (g) { g.addEventListener('click', function () { go('Income tax notice reply (AIS mismatch)', 2999); }); }
    try { if (window.gtag) { window.gtag('event', 'ais_check', { risk: lvl }); } } catch (e) {}
    document.getElementById('acOut').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
})();
