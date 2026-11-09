/* CGA GSTR-2B vs Purchase Register reconciliation. Runs fully in the browser; files never leave the device. Needs SheetJS (XLSX). */
(function () {
  'use strict';
  var app = document.getElementById('rcApp');
  if (!app) { return; }
  var data = { b2b: null, books: null }, result = null, filter = 'all';
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function num(v) { if (typeof v === 'number') { return v; } var n = parseFloat(String(v == null ? '' : v).replace(/[^0-9.\-]/g, '')); return isNaN(n) ? 0 : n; }
  function inr(n) { return '\u20b9' + (Math.round(n * 100) / 100).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 }); }
  function normGstin(g) { return String(g || '').toUpperCase().replace(/[^0-9A-Z]/g, ''); }
  function normInv(s) { var t = String(s == null ? '' : s).toUpperCase().replace(/[^0-9A-Z]/g, ''); return t.replace(/^0+/, ''); }
  function digits(s) { return String(s == null ? '' : s).replace(/[^0-9]/g, '').replace(/^0+/, ''); }
  function low(s) { return String(s == null ? '' : s).toLowerCase().replace(/\s+/g, ' ').trim(); }
  var COLS = {
    gstin: ['gstin of supplier', 'supplier gstin', 'gstin/uin', 'gstin', 'party gstin', 'gst no', 'gstin no'],
    name: ['trade/legal name', 'legal name', 'trade name', 'supplier name', 'party name', 'name of supplier', 'party', 'name'],
    inv: ['invoice number', 'invoice no', 'inv no', 'bill no', 'bill number', 'document number', 'doc no', 'voucher ref', 'supplier invoice no', 'invoice'],
    date: ['invoice date', 'inv date', 'bill date', 'document date', 'date'],
    taxable: ['taxable value', 'taxable amount', 'taxable', 'assessable value'],
    igst: ['integrated tax', 'igst'],
    cgst: ['central tax', 'cgst'],
    sgst: ['state/ut tax', 'state tax', 'sgst', 'utgst', 'sgst/utgst'],
    cess: ['cess']
  };
  function findHeader(rows) {
    var best = -1, bestScore = 0;
    for (var r = 0; r < Math.min(rows.length, 15); r++) {
      var line = (rows[r] || []).map(low).join(' | '), score = 0;
      if (line.indexOf('gstin') >= 0) { score += 2; }
      if (/invoice|bill no|document number/.test(line)) { score += 2; }
      if (/taxable/.test(line)) { score += 1; }
      if (/integrated|igst|central|cgst/.test(line)) { score += 1; }
      if (score > bestScore) { bestScore = score; best = r; }
    }
    return bestScore >= 3 ? best : -1;
  }
  function mapCols(rows, h) {
    var hdr = (rows[h] || []).map(low), sub = (rows[h + 1] || []).map(low), map = {};
    var labels = hdr.map(function (x, i) { return (x + ' ' + (sub[i] || '')).trim(); });
    Object.keys(COLS).forEach(function (k) {
      for (var a = 0; a < COLS[k].length && map[k] == null; a++) {
        for (var i = 0; i < labels.length; i++) {
          var lab = labels[i];
          if (!lab) { continue; }
          if (k === 'date' && lab.indexOf('date') < 0) { continue; }
          if (k === 'inv' && (lab.indexOf('date') >= 0 || lab.indexOf('type') >= 0 || lab.indexOf('value') >= 0)) { continue; }
          if (k === 'name' && lab.indexOf('gstin') >= 0) { continue; }
          if (lab.indexOf(COLS[k][a]) >= 0 && Object.keys(map).every(function (o) { return map[o] !== i; })) { map[k] = i; break; }
        }
      }
    });
    return map;
  }
  function pickSheet(wb, kind) {
    var names = wb.SheetNames;
    if (kind === 'b2b') { for (var i = 0; i < names.length; i++) { if (/^b2b$/i.test(names[i].trim())) { return names[i]; } } }
    var best = names[0], bestScore = -1;
    names.forEach(function (n) { var rows = XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1, raw: true, defval: '' }); var h = findHeader(rows); var sc = h >= 0 ? rows.length : -1; if (sc > bestScore) { bestScore = sc; best = n; } });
    return best;
  }
  function parse(wb, kind) {
    var sh = pickSheet(wb, kind), rows = XLSX.utils.sheet_to_json(wb.Sheets[sh], { header: 1, raw: true, defval: '' });
    var h = findHeader(rows);
    if (h < 0) { throw new Error('Is file mein GSTIN / Invoice number / Taxable value wale columns nahi mile.'); }
    var m = mapCols(rows, h);
    if (m.gstin == null || m.inv == null) { throw new Error('GSTIN aur Invoice number ke columns pehchaan nahi paaye. Sample format dekhiye.'); }
    var start = h + 1;
    if (rows[start] && (rows[start] || []).some(function (c) { return /integrated|central|state|igst|cgst|sgst/.test(low(c)); })) { start = h + 2; }
    var out = [];
    for (var r = start; r < rows.length; r++) {
      var row = rows[r] || [], g = normGstin(row[m.gstin]);
      if (g.length !== 15) { continue; }
      var inv = row[m.inv];
      if (String(inv).trim() === '') { continue; }
      var igst = m.igst != null ? num(row[m.igst]) : 0, cgst = m.cgst != null ? num(row[m.cgst]) : 0, sgst = m.sgst != null ? num(row[m.sgst]) : 0;
      var d = m.date != null ? row[m.date] : '';
      if (typeof d === 'number') { var dt = XLSX.SSF.parse_date_code(d); d = dt ? (('0' + dt.d).slice(-2) + '-' + ('0' + dt.m).slice(-2) + '-' + dt.y) : d; }
      out.push({ gstin: g, name: m.name != null ? String(row[m.name] || '').trim() : '', inv: String(inv).trim(), key: g + '|' + normInv(inv), dig: g + '|' + digits(inv), date: String(d || ''), taxable: m.taxable != null ? num(row[m.taxable]) : 0, igst: igst, cgst: cgst, sgst: sgst, tax: igst + cgst + sgst });
    }
    if (!out.length) { throw new Error('Koi invoice row nahi mili. File / sheet check kariye.'); }
    return { rows: out, sheet: sh, cols: Object.keys(m).length };
  }
  function reconcile(A, B) {
    var tol = Number($('rcTol').value) || 10;
    var idx = {}, didx = {}, usedB = {};
    B.forEach(function (b, i) { (idx[b.key] = idx[b.key] || []).push(i); (didx[b.dig] = didx[b.dig] || []).push(i); });
    var res = [];
    A.forEach(function (a) {
      var cand = (idx[a.key] || []).filter(function (i) { return !usedB[i]; });
      var how = 'exact';
      if (!cand.length && a.dig.split('|')[1]) { cand = (didx[a.dig] || []).filter(function (i) { return !usedB[i]; }); how = 'number'; }
      if (cand.length) {
        var i = cand[0]; usedB[i] = 1; var b = B[i], diff = Math.round((a.tax - b.tax) * 100) / 100;
        res.push({ st: Math.abs(diff) <= tol ? 'match' : 'mismatch', a: a, b: b, diff: diff, how: how });
      } else { res.push({ st: 'only2b', a: a, b: null, diff: a.tax }); }
    });
    B.forEach(function (b, i) { if (!usedB[i]) { res.push({ st: 'onlybooks', a: null, b: b, diff: -b.tax }); } });
    return res;
  }
  var LBL = { match: ['Matched', '#17773f', '#e6f6ec'], mismatch: ['Amount mismatch', '#8a5a00', '#fff4e0'], onlybooks: ['Books mein hai, 2B mein nahi (ITC risk)', '#b3261e', '#fdecea'], only2b: ['2B mein hai, books mein nahi', '#1d4ed8', '#e8efff'] };
  function sum(list, f) { return list.reduce(function (s, x) { return s + f(x); }, 0); }
  function render() {
    if (!result) { $('rcOut').innerHTML = ''; return; }
    var g = { match: [], mismatch: [], onlybooks: [], only2b: [] };
    result.forEach(function (r) { g[r.st].push(r); });
    var risk = sum(g.onlybooks, function (r) { return r.b.tax; }) + sum(g.mismatch, function (r) { return Math.max(0, -r.diff); });
    var extra = sum(g.only2b, function (r) { return r.a.tax; });
    var h = '<div class="rc-sum">' + ['match', 'mismatch', 'onlybooks', 'only2b'].map(function (k) { var L = g[k], t = sum(L, function (r) { return (r.a || r.b).tax; }); return '<button type="button" class="rc-card' + (filter === k ? ' on' : '') + '" data-f="' + k + '" style="border-color:' + LBL[k][1] + ';background:' + LBL[k][2] + '"><b style="color:' + LBL[k][1] + '">' + L.length + '</b><span>' + LBL[k][0] + '</span><small>Tax ' + inr(t) + '</small></button>'; }).join('') + '</div>';
    h += '<div class="rc-alert"><div><b>ITC risk:</b> ' + inr(risk) + ' <span class="rc-muted">(books mein claim kiya, par 2B mein nahi ya kam hai: supplier se follow-up kariye)</span></div><div><b>Missed ITC chance:</b> ' + inr(extra) + ' <span class="rc-muted">(2B mein dikh raha hai, par books mein entry nahi: check kariye)</span></div></div>';
    h += '<div class="rc-bar"><button type="button" class="rc-chip' + (filter === 'all' ? ' on' : '') + '" data-f="all">Sab (' + result.length + ')</button><input id="rcQ" class="rc-in" placeholder="GSTIN, naam ya invoice no. dhoondhiye"><button type="button" class="btn btn-gold" id="rcXls">Excel report download</button></div>';
    var q = ($('rcQ') && $('rcQ').value || '').toLowerCase();
    var list = result.filter(function (r) { if (filter !== 'all' && r.st !== filter) { return false; } if (!q) { return true; } var x = r.a || r.b; return (x.gstin + ' ' + x.name + ' ' + x.inv + ' ' + (r.b ? r.b.inv : '')).toLowerCase().indexOf(q) >= 0; });
    h += '<div class="rc-tw"><table class="rc-t"><thead><tr><th>Status</th><th>Supplier GSTIN</th><th>Naam</th><th>Invoice (2B)</th><th>Invoice (Books)</th><th>Date</th><th>Tax 2B</th><th>Tax Books</th><th>Farak</th></tr></thead><tbody>' +
      list.slice(0, 500).map(function (r) { var x = r.a || r.b; return '<tr><td><span class="rc-st" style="color:' + LBL[r.st][1] + ';background:' + LBL[r.st][2] + '">' + LBL[r.st][0].split(' (')[0] + '</span>' + (r.how === 'number' ? '<br><small class="rc-muted">no. format alag</small>' : '') + '</td><td>' + esc(x.gstin) + '</td><td>' + esc((r.a && r.a.name) || (r.b && r.b.name) || '') + '</td><td>' + esc(r.a ? r.a.inv : '-') + '</td><td>' + esc(r.b ? r.b.inv : '-') + '</td><td>' + esc(x.date) + '</td><td class="n">' + (r.a ? inr(r.a.tax) : '-') + '</td><td class="n">' + (r.b ? inr(r.b.tax) : '-') + '</td><td class="n" style="color:' + (Math.abs(r.diff) > 0.5 ? '#b3261e' : '#17773f') + '">' + inr(r.diff) + '</td></tr>'; }).join('') + '</tbody></table></div>' + (list.length > 500 ? '<p class="rc-muted">Pehli 500 rows dikh rahi hain. Poori list Excel report mein hai.</p>' : '');
    h += '<div class="rc-cta"><div><b>Mismatch zyada hain ya notice ka darr hai?</b><br><span class="rc-muted">CGA team supplier follow-up, reconciliation aur GST reply sambhal sakti hai.</span></div><a class="btn btn-gold" href="book-consultation.html#paid">Expert se baat kariye</a></div>';
    $('rcOut').innerHTML = h;
    var qi = $('rcQ'); if (qi) { qi.value = q; qi.oninput = function () { var v = this.value; render(); var n = $('rcQ'); n.value = v; n.focus(); }; }
    Array.prototype.forEach.call(document.querySelectorAll('#rcOut [data-f]'), function (b) { b.onclick = function () { filter = b.getAttribute('data-f'); render(); }; });
    $('rcXls').onclick = download;
  }
  function download() {
    var wb = XLSX.utils.book_new();
    function rowsFor(st) { return result.filter(function (r) { return !st || r.st === st; }).map(function (r) { var x = r.a || r.b; return { Status: LBL[r.st][0], 'Supplier GSTIN': x.gstin, 'Supplier name': (r.a && r.a.name) || (r.b && r.b.name) || '', 'Invoice no (2B)': r.a ? r.a.inv : '', 'Invoice no (Books)': r.b ? r.b.inv : '', 'Date': x.date, 'Taxable (2B)': r.a ? r.a.taxable : '', 'Taxable (Books)': r.b ? r.b.taxable : '', 'IGST (2B)': r.a ? r.a.igst : '', 'CGST (2B)': r.a ? r.a.cgst : '', 'SGST (2B)': r.a ? r.a.sgst : '', 'IGST (Books)': r.b ? r.b.igst : '', 'CGST (Books)': r.b ? r.b.cgst : '', 'SGST (Books)': r.b ? r.b.sgst : '', 'Total tax (2B)': r.a ? r.a.tax : '', 'Total tax (Books)': r.b ? r.b.tax : '', 'Difference (2B - Books)': r.diff }; }); }
    var sumRows = ['match', 'mismatch', 'onlybooks', 'only2b'].map(function (k) { var L = result.filter(function (r) { return r.st === k; }); return { Category: LBL[k][0], Invoices: L.length, 'Total tax': Math.round(sum(L, function (r) { return (r.a || r.b).tax; }) * 100) / 100 }; });
    sumRows.push({ Category: 'Prepared with CGA India GSTR-2B Reconciliation tool - cgaindia.com/gst-2b-reconciliation.html', Invoices: '', 'Total tax': '' });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(sumRows), 'Summary');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rowsFor('')), 'All');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rowsFor('onlybooks')), 'ITC risk');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rowsFor('mismatch')), 'Mismatch');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rowsFor('only2b')), 'Not in books');
    XLSX.writeFile(wb, 'CGA-GSTR2B-Reconciliation.xlsx');
  }
  function sample() {
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['Supplier GSTIN', 'Supplier Name', 'Invoice No', 'Invoice Date', 'Taxable Value', 'IGST', 'CGST', 'SGST'], ['06ABCDE1234F1Z5', 'Sharma Traders', 'ST/101', '05-10-2026', 10000, 0, 900, 900]]), 'Purchase Register');
    XLSX.writeFile(wb, 'CGA-Purchase-Register-Format.xlsx');
  }
  function readFile(input, kind, label) {
    var f = input.files && input.files[0]; if (!f) { return; }
    $(label).textContent = 'Padh rahe hain...';
    var r = new FileReader();
    r.onload = function () {
      try {
        var wb = XLSX.read(r.result, { type: 'array', cellDates: false });
        var p = parse(wb, kind);
        data[kind] = p.rows;
        $(label).innerHTML = '&#10003; ' + esc(f.name) + ' &middot; <b>' + p.rows.length + '</b> invoices (sheet: ' + esc(p.sheet) + ')';
        $(label).className = 'rc-file ok';
      } catch (e) { data[kind] = null; $(label).textContent = e.message || 'File padh nahi paaye.'; $(label).className = 'rc-file bad'; }
      $('rcGo').disabled = !(data.b2b && data.books);
    };
    r.readAsArrayBuffer(f);
  }
  function init() {
    if (!window.XLSX) { app.innerHTML = '<p class="rc-muted">Tool load ho raha hai... page refresh kariye.</p>'; return; }
    $('rc2b').onchange = function () { readFile(this, 'b2b', 'rc2bL'); };
    $('rcBk').onchange = function () { readFile(this, 'books', 'rcBkL'); };
    $('rcSample').onclick = sample;
    $('rcGo').onclick = function () { result = reconcile(data.b2b, data.books); filter = 'all'; render(); $('rcOut').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  }
  if (window.XLSX) { init(); } else { var t = 0, iv = setInterval(function () { t++; if (window.XLSX || t > 50) { clearInterval(iv); init(); } }, 200); }
})();
