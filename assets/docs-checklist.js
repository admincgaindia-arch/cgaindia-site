/* CGA documents checklist: pulls the "Documents" section of each service page on demand */
(function () {
  var root = document.getElementById('dcList');
  if (!root) { return; }
  var G = [["Tax & GST", [["itr-filing.html", "ITR Filing", "Salary, business, capital gains"], ["income-tax-notice.html", "Income Tax Notice Reply", "Scrutiny, reassessment, demand"], ["tds-returns.html", "TDS Returns", "24Q, 26Q, 27Q, Form 16"], ["capital-gains-tax.html", "Capital Gains Tax", "Property, shares, Sec 54/54F"], ["gst-registration.html", "GST Registration", "Naya GSTIN, amendment"], ["gst-return-filing.html", "GST Return Filing", "GSTR-1, 3B monthly"], ["gst-annual-return.html", "GST Annual Return", "GSTR-9 aur 9C"], ["gst-refund.html", "GST Refund", "Export, LUT, inverted duty"], ["crypto-tax.html", "Crypto / VDA Tax", "30% tax, 1% TDS"], ["foreign-income.html", "NRI & Foreign Income", "NRI return, foreign assets"], ["international-tax.html", "International Tax", "Transfer pricing, DTAA"], ["ecommerce-sellers.html", "E-commerce Sellers", "Amazon, Flipkart GST"], ["tax-litigation.html", "Tax Litigation & Appeals", "CIT(A), ITAT, High Court"]]], ["Company & Startup", [["pvt-ltd-incorporation.html", "Pvt Ltd Registration", "SPICe+, DIN, PAN, TAN"], ["llp-partnership.html", "LLP & Partnership", "Deed, LLP agreement"], ["business-registrations.html", "Udyam, IEC, DSC", "Shop Act, professional tax"], ["roc-annual-compliance.html", "ROC Annual Compliance", "AOC-4, MGT-7, DIR-3 KYC"], ["company-secretarial.html", "Company Secretarial", "Director, share transfer, MCA"], ["company-closure.html", "Company Closure", "STK-2, LLP Form 24"], ["company-buy-sell.html", "Company Takeover", "Buy / sell, share transfer"], ["ngo-registration.html", "NGO · 12AB · 80G", "Trust, society, exemption"], ["section-8-company.html", "Section 8 Company", "Licence, CSR-1"], ["society-compliance.html", "Society & Co-operative", "Registration, annual return"], ["producer-company.html", "Producer Company (FPO)", "Farmer producer org"], ["startup-india.html", "Startup India & Grants", "DPIIT, 80-IAC, seed fund"], ["trademark-ip.html", "Trademark & IP", "Search, filing, objection"], ["iso-certification.html", "ISO Certification", "9001, 14001, 45001, 22000"], ["fssai-licence.html", "FSSAI Licence", "Basic, state, central"], ["fema-rbi-compliance.html", "FEMA & RBI", "FDI, FC-GPR, ODI, FLA"]]], ["Audit, Bank & Finance", [["bank-loan-documents.html", "Bank Loan Documents", "Provisional, projected, CMA"], ["project-report-loan.html", "Project Report & CMA", "Term loan, Mudra, PMEGP"], ["ca-certificates.html", "CA Certificates", "Net worth, turnover, UDIN"], ["audit-assurance.html", "Audit & Assurance", "Tax, statutory, internal audit"], ["secretarial-audit.html", "Secretarial Audit", "Section 204, MR-3"], ["stock-audit.html", "Stock Audit", "Bank, inventory valuation"], ["cost-audit.html", "Cost Audit (CMA)", "Cost records, costing"], ["due-diligence.html", "Due Diligence", "Financial, tax, legal"], ["business-valuation.html", "Business Valuation", "Rule 11UA, FEMA, ESOP"], ["accounting-bookkeeping.html", "Accounting & Bookkeeping", "Tally, Zoho, Busy"], ["virtual-cfo.html", "Virtual CFO", "MIS, cash flow, budget"], ["nbfc-nidhi-microfinance.html", "NBFC, Nidhi & Microfinance", "RBI, NDH-4, credit society"]]], ["Legal & Disputes", [["legal-notice.html", "Legal Notice", "Drafting aur reply"], ["cheque-bounce.html", "Cheque Bounce", "Section 138 NI Act"], ["civil-litigation.html", "Civil Litigation", "Recovery, property, injunction"], ["criminal-law.html", "Criminal Law", "Bail, FIR quashing"], ["family-law.html", "Family Law", "Divorce, maintenance, custody"], ["property-legal.html", "Property Legal", "Title search, sale deed, will"], ["succession-certificate.html", "Succession Certificate", "Probate, legal heir"], ["rera-complaint.html", "RERA Complaint", "Possession delay, refund"], ["consumer-complaint.html", "Consumer Complaint", "Consumer commission"], ["drt-sarfaesi.html", "DRT & SARFAESI", "Bank notice, Section 17"], ["insolvency-ibc.html", "Insolvency & NCLT", "Section 7, 9, claims"], ["arbitration-mediation.html", "Arbitration & Mediation", "MSME Samadhaan"], ["agreement-drafting.html", "Agreement Drafting", "Rent, partnership, NDA"]]], ["Business & People", [["payroll-hr.html", "Payroll & HR", "PF, ESI, salary TDS"], ["labour-code-restructuring.html", "Labour Code Restructuring", "50% wage rule"], ["manufacturing.html", "Manufacturing Compliance", "GST, job work, MSME"], ["poultry-industry.html", "Poultry & Hatchery", "Integration business"], ["subsidy.html", "Government Subsidy", "Kaunsi subsidy, kaun eligible"], ["msme-funding.html", "MSME Funding", "PMEGP, collateral-free loan"]]]];
  var cache = {};
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function load(url) {
    if (cache[url]) { return cache[url]; }
    cache[url] = fetch(url, { credentials: 'same-origin' }).then(function (r) { if (!r.ok) { throw new Error('x'); } return r.text(); }).then(function (h) {
      var d = new DOMParser().parseFromString(h, 'text/html');
      var sec = d.getElementById('docs');
      if (!sec) { throw new Error('no docs'); }
      var lede = sec.querySelector('.sec-lede');
      var cards = [].slice.call(sec.querySelectorAll('.doc-card')).map(function (c) {
        var h3 = c.querySelector('h3');
        return { t: h3 ? h3.textContent.trim() : '', li: [].slice.call(c.querySelectorAll('li')).map(function (l) { return l.textContent.trim(); }) };
      });
      if (!cards.length) {
        var blk = [].slice.call(sec.querySelectorAll('div')).filter(function (x) { var e = x.querySelector(':scope > .eyebrow'); return e && /document/i.test(e.textContent); })[0];
        var ul = (blk || sec).querySelector('ul');
        if (ul) { cards = [{ t: '', li: [].slice.call(ul.querySelectorAll('li')).map(function (l) { return l.textContent.trim(); }) }]; }
      }
      if (!cards.length) { throw new Error('empty'); }
      return { lede: lede ? lede.textContent.trim() : '', cards: cards };
    });
    return cache[url];
  }
  var html = '';
  G.forEach(function (g, gi) {
    html += '<div class="dc-grp" data-g="' + gi + '"><h2>' + esc(g[0]) + '</h2>';
    g[1].forEach(function (s) {
      html += '<details class="dc-item" data-url="' + s[0] + '" data-name="' + esc(s[1]) + '" data-k="' + esc((s[1] + ' ' + s[2]).toLowerCase()) + '"><summary><b>' + esc(s[1]) + '</b><small>' + esc(s[2]) + '</small></summary><div class="dc-body"><p class="dc-wait">Documents ki list aa rahi hai...</p></div></details>';
    });
    html += '</div>';
  });
  root.innerHTML = html;
  function render(det) {
    if (det.getAttribute('data-done')) { return Promise.resolve(); }
    var body = det.querySelector('.dc-body'), url = det.getAttribute('data-url'), name = det.getAttribute('data-name');
    return load(url).then(function (d) {
      var txt = name + ' - documents:' + String.fromCharCode(10) + d.cards.map(function (c) { return (c.t ? c.t + ': ' : '') + c.li.join(', '); }).join(String.fromCharCode(10));
      body.innerHTML = (d.lede ? '<p class="dc-lede">' + esc(d.lede) + '</p>' : '') + '<div class="dc-cards">' + d.cards.map(function (c) { return '<div class="dc-card">' + (c.t ? '<h3>' + esc(c.t) + '</h3>' : '') + '<ul>' + c.li.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul></div>'; }).join('') + '</div>'
        + '<div class="dc-act"><a class="dc-wa" href="https://wa.me/919996647888?text=' + encodeURIComponent('Namaste CGA, ' + name + ' ke documents bhej raha/rahi hun.') + '" target="_blank" rel="noopener">Documents WhatsApp par bhejiye</a><a class="dc-ln" href="' + url + '">Service aur fees dekhiye &rarr;</a><button type="button" class="dc-cp">List copy kariye</button></div>';
      var cp = body.querySelector('.dc-cp');
      cp.addEventListener('click', function () { try { navigator.clipboard.writeText(txt); cp.textContent = 'Copied'; } catch (x) { cp.textContent = 'Copy nahi hua'; } });
      det.setAttribute('data-done', '1');
    }).catch(function () {
      body.innerHTML = '<p class="dc-wait">List abhi load nahi hui. <a href="' + url + '#docs">Service page par dekhiye</a>.</p>';
    });
  }
  [].slice.call(root.querySelectorAll('.dc-item')).forEach(function (det) {
    det.addEventListener('toggle', function () { if (det.open) { render(det); } });
  });
  var q = document.getElementById('dcSearch');
  if (q) {
    q.addEventListener('input', function () {
      var v = q.value.toLowerCase().trim(), any = false;
      [].slice.call(root.querySelectorAll('.dc-grp')).forEach(function (g) {
        var vis = 0;
        [].slice.call(g.querySelectorAll('.dc-item')).forEach(function (d) { var ok = !v || d.getAttribute('data-k').indexOf(v) > -1; d.style.display = ok ? '' : 'none'; if (ok) { vis++; } });
        g.style.display = vis ? '' : 'none'; if (vis) { any = true; }
      });
      var e = document.getElementById('dcEmpty'); if (e) { e.style.display = any ? 'none' : 'block'; }
    });
  }
  var pr = document.getElementById('dcPrint');
  if (pr) {
    pr.addEventListener('click', function () {
      pr.disabled = true; pr.textContent = 'Saari lists taiyar ho rahi hain...';
      var items = [].slice.call(root.querySelectorAll('.dc-item')).filter(function (d) { return d.style.display !== 'none'; });
      Promise.all(items.map(function (d) { d.open = true; return render(d); })).then(function () { pr.disabled = false; pr.textContent = 'Print / PDF save kariye'; window.print(); });
    });
  }
  var h = location.hash.replace('#', '');
  if (h) { var t = root.querySelector('.dc-item[data-url="' + h + '.html"]'); if (t) { t.open = true; render(t); setTimeout(function () { t.scrollIntoView({ block: 'start' }); }, 200); } }
})();
