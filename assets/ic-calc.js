/* CGA Interest & Late Fee Calculator (GST + TDS). Runs in browser. */
(function () {
  'use strict';
  var app = document.getElementById('icApp'); if (!app) { return; }
  function $(id) { return document.getElementById(id); }
  function inr(n) { return '\u20b9' + Math.round(n).toLocaleString('en-IN'); }
  function d(id) { var v = $(id).value; return v ? Date.parse(v + 'T00:00:00Z') : NaN; }
  function days(a, b) { return Math.max(0, Math.round((b - a) / 86400000)); }
  function monthsOrPart(a, b) { if (!(b > a)) { return 0; } var A = new Date(a), B = new Date(b); var m = (B.getUTCFullYear() - A.getUTCFullYear()) * 12 + (B.getUTCMonth() - A.getUTCMonth()); if (B.getUTCDate() >= A.getUTCDate()) { m++; } return Math.max(1, m); }
  function row(k, v, strong) { return '<tr><td>' + k + '</td><td class="n">' + (strong ? '<b>' + v + '</b>' : v) + '</td></tr>'; }
  function gst() {
    var tax = Number($('gTax').value) || 0, due = d('gDue'), paid = d('gPaid'), rate = Number($('gRate').value), type = $('gType').value, nil = $('gNil').checked, slab = $('gSlab').value;
    if (isNaN(due) || isNaN(paid)) { $('gOut').innerHTML = '<p class="ic-m">Due date aur filing / payment date bhariye.</p>'; return; }
    var late = days(due, paid), interest = tax * rate / 100 * late / 365;
    var perDay = nil ? 20 : 50, cap = nil ? 500 : ({ a: 2000, b: 5000, c: 10000 })[slab];
    var fee = Math.min(late * perDay, cap);
    $('gOut').innerHTML = '<table class="ic-t">' + row('Kitne din late', late + ' din') + row('Byaj (' + rate + '% saalana, ' + late + ' din par)', inr(interest)) + row('Late fee (' + type + ', Rs ' + perDay + '/din, max Rs ' + cap.toLocaleString('en-IN') + ')', inr(fee) + ' <small>(CGST ' + inr(fee / 2) + ' + SGST ' + inr(fee / 2) + ')</small>') + row('Kul', inr(interest + fee), true) + '</table><p class="ic-m">Byaj sirf cash mein dene wale (net) tax par lagta hai. 24% byaj galat ITC lene aur use karne par. Late fee ki seemayein Notification 19/2021 aur 20/2021 (CGST) ke anusaar; IGST-only maamlon aur naye notifications ke liye CGA se confirm kariye.</p>';
  }
  function tds() {
    var amt = Number($('tAmt').value) || 0, ded = d('tDed'), act = d('tAct'), pay = d('tPay'), due = d('tDue'), filed = d('tFiled');
    var h = '<table class="ic-t">', total = 0;
    if (!isNaN(ded) && !isNaN(act) && act > ded) { var m1 = monthsOrPart(ded, act), i1 = amt * 0.01 * m1; total += i1; h += row('Der se kaata (1% x ' + m1 + ' mahine)', inr(i1)); }
    var from = !isNaN(act) ? act : ded;
    if (!isNaN(from) && !isNaN(pay) && pay > from) { var m2 = monthsOrPart(from, pay), i2 = amt * 0.015 * m2; total += i2; h += row('Kaat kar der se jama kiya (1.5% x ' + m2 + ' mahine)', inr(i2)); }
    if (!isNaN(due) && !isNaN(filed) && filed > due) { var ld = days(due, filed), f = Math.min(ld * 200, amt); total += f; h += row('TDS return late fee (Rs 200 x ' + ld + ' din, max TDS amount)', inr(f)); }
    h += row('Kul', inr(total), true) + '</table><p class="ic-m">Byaj "mahina ya uska hissa" ke hisaab se. Purane saalon ke liye Income-tax Act 1961 (201(1A), 234E); tax year 2026-27 se Income-tax Act 2025 ke corresponding provisions lagu. Penalty (late filing / galti) alag ho sakti hai.</p>';
    $('tOut').innerHTML = h;
  }
  Array.prototype.forEach.call(app.querySelectorAll('[data-tab]'), function (b) { b.onclick = function () { Array.prototype.forEach.call(app.querySelectorAll('[data-tab]'), function (x) { x.classList.toggle('on', x === b); }); $('icG').style.display = b.getAttribute('data-tab') === 'g' ? '' : 'none'; $('icT').style.display = b.getAttribute('data-tab') === 't' ? '' : 'none'; }; });
  Array.prototype.forEach.call(app.querySelectorAll('#icG input, #icG select'), function (x) { x.addEventListener('input', gst); x.addEventListener('change', gst); });
  Array.prototype.forEach.call(app.querySelectorAll('#icT input'), function (x) { x.addEventListener('input', tds); });
  gst(); tds();
  window.CGAcalc = { monthsOrPart: monthsOrPart };
})();
