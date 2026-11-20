/* Property TDS (Form 26QB / Form 141 Schedule B) interest and late fee calculator. CGA India, Nov 2026.
   Law: Income-tax Act, 2025 s.393(1) Table Sl. 3(i) [old s.194-IA]; interest s.398(3)(a) [old s.201(1A)];
   fee s.427(1) [old s.234E]. Months counted as calendar months, part of a month as a full month (TRACES practice). */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var app = $('qbApp');
  if (!app) { return; }
  var inr = function (n) { return 'Rs ' + Math.round(n).toLocaleString('en-IN'); };
  var d = function (v) { if (!v) { return null; } var p = v.split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); };
  var fmt = function (t) { var x = new Date(t); return x.getUTCDate() + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][x.getUTCMonth()] + ' ' + x.getUTCFullYear(); };
  var calMonths = function (a, b) { if (!(b > a)) { return 0; } var A = new Date(a), B = new Date(b); return (B.getUTCFullYear() - A.getUTCFullYear()) * 12 + (B.getUTCMonth() - A.getUTCMonth()) + 1; };
  var dueOf = function (t) { var x = new Date(t); var end = Date.UTC(x.getUTCFullYear(), x.getUTCMonth() + 1, 0); return end + 30 * 864e5; };
  var row = function (k, v, cls) { return '<tr' + (cls ? ' class="' + cls + '"' : '') + '><td>' + k + '</td><td class="n">' + v + '</td></tr>'; };
  var NEW = Date.UTC(2026, 3, 1);

  var run = function () {
    var cons = +$('qbCons').value || 0, sdv = +$('qbSdv').value || 0, share = Math.min(100, Math.max(0, +$('qbShare').value || 0));
    var pan = $('qbPan').value === 'y', agri = $('qbAgri').checked;
    var pay = d($('qbPay').value), ded = d($('qbDed').value), dep = d($('qbDep').value);
    var out = $('qbOut');
    var base = Math.max(cons, sdv);
    if (!base) { out.innerHTML = '<p class="ic-m">Sale consideration ya stamp duty value daaliye.</p>'; return; }
    if (agri) { out.innerHTML = '<div class="qb-note ok">Rural agricultural land par property TDS nahi kat-ta. Ye form bharne ki zaroorat nahi.</div>'; return; }
    if (base < 5000000) { out.innerHTML = '<div class="qb-note ok">Consideration aur stamp duty value dono Rs 50 lakh se kam hain, isliye property TDS lagu nahi hota.</div>'; return; }
    var rate = pan ? 0.01 : 0.20;
    var tds = base * rate * share / 100;
    var h = '<table class="ic-t">';
    h += row('TDS ka aadhar (consideration ya stamp duty value, jo zyada ho)', inr(base));
    h += row('Aapka hissa', share + '%');
    h += row('TDS dar' + (pan ? '' : ' (seller ka PAN nahi)'), (rate * 100) + '%');
    h += row('<b>Kaatna tha (TDS)</b>', '<b>' + inr(tds) + '</b>');
    var total = 0, notes = [];
    if (pay) {
      var dedOn = ded && ded > pay ? ded : pay;
      if (dedOn > pay) { var m1 = calMonths(pay, dedOn), i1 = tds * 0.01 * m1; total += i1; h += row('Der se kaata: 1% x ' + m1 + ' mahine (' + fmt(pay) + ' se ' + fmt(dedOn) + ')', inr(i1)); }
      // TRACES works out the due date from the date of payment / credit to the seller.
      var due = dueOf(pay);
      notes.push('Jama karne aur form bharne ki aakhri tareekh: <b>' + fmt(due) + '</b>');
      if (dep && dep > due) {
        var m2 = calMonths(dedOn, dep), i2 = tds * 0.015 * m2; total += i2; h += row('Kaat kar der se jama kiya: 1.5% x ' + m2 + ' mahine (' + fmt(dedOn) + ' se ' + fmt(dep) + ')', inr(i2));
        var late = Math.round((dep - due) / 864e5), fee = Math.min(late * 200, tds); total += fee; h += row('Late fee: Rs 200 x ' + late + ' din (max TDS jitni)', inr(fee));
      } else if (!dep) { notes.push('Abhi jama nahi kiya? Aaj ki tareekh "Kab jama kiya" mein daal kar dekhiye kitna banega.'); }
      notes.push(pay >= NEW ? 'Ye transaction 1 April 2026 ke baad ka hai: <b>Form 141 (Schedule B)</b> bharna hai, certificate <b>Form 132</b> mein milega.' : 'Ye transaction 1 April 2026 se pehle ka hai: <b>Form 26QB</b> bharna hai, certificate <b>Form 16B</b> mein milega.');
    } else { notes.push('Payment ki tareekh daaliye, tab byaj aur late fee ka hisaab banega.'); }
    h += row('<b>Byaj + late fee</b>', '<b>' + inr(total) + '</b>');
    h += row('<b>Kul jama karna (TDS + byaj + fee)</b>', '<b>' + inr(tds + total) + '</b>');
    h += '</table>';
    out.innerHTML = h + '<ul class="qb-notes">' + notes.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul>';
    try { if (window.gtag && !run.sent) { run.sent = 1; window.gtag('event', 'calculator_use', { tool: '26qb' }); } } catch (x) {}
  };
  app.addEventListener('input', run);
  app.addEventListener('change', run);
  run();
})();
