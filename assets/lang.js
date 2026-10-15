/* Google Analytics 4 (CGA India) — loaded once on every page via lang.js */
(function () {
  if (window.__cgaGA) { return; }
  window.__cgaGA = 1;
  var id = 'G-RELRD3NTXG';
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
  (document.head || document.documentElement).appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id);
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) { return; }
    var h = a.getAttribute('href') || '';
    if (h.indexOf('wa.me') > -1) { window.gtag('event', 'generate_lead', { method: 'whatsapp' }); }
    else if (h.indexOf('tel:') === 0) { window.gtag('event', 'generate_lead', { method: 'phone' }); }
  }, true);
})();

/* CGA mega menu v2 — rebuilds the Services dropdown on English pages (one place for every service) */
(function () {
  var seg = location.pathname.split('/').filter(Boolean);
  if (seg.length > 1 && /^(hi|pa|mr|gu|bn|te|ta|ur|kn|or|ml|as)$/.test(seg[0])) { return; }
  var G = [
    ['tax', 'Tax &amp; GST', 'Income tax, GST aur notices', [
      ['itr-filing.html', 'ITR Filing', 'Salary, business, capital gains'],
      ['income-tax-notice.html', 'Income Tax Notice Reply', 'Scrutiny, reassessment, demand'],
      ['tds-returns.html', 'TDS Returns', '24Q, 26Q, 27Q, Form 16'],
      ['capital-gains-tax.html', 'Capital Gains Tax', 'Property, shares, Sec 54/54F'],
      ['gst-registration.html', 'GST Registration', 'Naya GSTIN, amendment'],
      ['gst-return-filing.html', 'GST Return Filing', 'GSTR-1, 3B monthly'],
      ['gst-annual-return.html', 'GST Annual Return', 'GSTR-9 aur 9C'],
      ['gst-refund.html', 'GST Refund', 'Export, LUT, inverted duty'],
      ['crypto-tax.html', 'Crypto / VDA Tax', '30% tax, 1% TDS'],
      ['foreign-income.html', 'NRI &amp; Foreign Income', 'NRI return, foreign assets'],
      ['international-tax.html', 'International Tax', 'Transfer pricing, DTAA'],
      ['ecommerce-sellers.html', 'E-commerce Sellers', 'Amazon, Flipkart GST'],
      ['tax-litigation.html', 'Tax Litigation &amp; Appeals', 'CIT(A), ITAT, High Court']
    ]],
    ['co', 'Company &amp; Startup', 'Registration se compliance tak', [
      ['pvt-ltd-incorporation.html', 'Pvt Ltd Registration', 'SPICe+, DIN, PAN, TAN'],
      ['llp-partnership.html', 'LLP &amp; Partnership', 'Deed, LLP agreement'],
      ['business-registrations.html', 'Udyam, IEC, DSC', 'Shop Act, professional tax'],
      ['roc-annual-compliance.html', 'ROC Annual Compliance', 'AOC-4, MGT-7, DIR-3 KYC'],
      ['company-secretarial.html', 'Company Secretarial', 'Director, share transfer, MCA'],
      ['company-closure.html', 'Company Closure', 'STK-2, LLP Form 24'],
      ['company-buy-sell.html', 'Company Takeover', 'Buy / sell, share transfer', 'Naya'],
      ['ngo-registration.html', 'NGO &middot; 12AB &middot; 80G', 'Trust, society, exemption'],
      ['section-8-company.html', 'Section 8 Company', 'Licence, CSR-1'],
      ['society-compliance.html', 'Society &amp; Co-operative', 'Registration, annual return', 'Naya'],
      ['producer-company.html', 'Producer Company (FPO)', 'Farmer producer org'],
      ['startup.html', 'Startup Services', 'Incorporation se funding'],
      ['startup-india.html', 'Startup India &amp; Grants', 'DPIIT, 80-IAC, seed fund'],
      ['trademark-ip.html', 'Trademark &amp; IP', 'Search, filing, objection'],
      ['iso-certification.html', 'ISO Certification', '9001, 14001, 45001, 22000'],
      ['fssai-licence.html', 'FSSAI Licence', 'Basic, state, central'],
      ['fema-rbi-compliance.html', 'FEMA &amp; RBI', 'FDI, FC-GPR, ODI, FLA']
    ]],
    ['fin', 'Audit, Bank &amp; Finance', 'Audit, loan file aur books', [
      ['bank-loan-documents.html', 'Bank Loan Documents', 'Provisional, projected, CMA', 'Rate list'],
      ['project-report-loan.html', 'Project Report &amp; CMA', 'Term loan, Mudra, PMEGP'],
      ['ca-certificates.html', 'CA Certificates', 'Net worth, turnover, UDIN'],
      ['audit-assurance.html', 'Audit &amp; Assurance', 'Tax, statutory, internal audit'],
      ['secretarial-audit.html', 'Secretarial Audit', 'Section 204, MR-3'],
      ['stock-audit.html', 'Stock Audit', 'Bank, inventory valuation'],
      ['cost-audit.html', 'Cost Audit (CMA)', 'Cost records, costing'],
      ['due-diligence.html', 'Due Diligence', 'Financial, tax, legal'],
      ['business-valuation.html', 'Business Valuation', 'Rule 11UA, FEMA, ESOP'],
      ['accounting-bookkeeping.html', 'Accounting &amp; Bookkeeping', 'Tally, Zoho, Busy'],
      ['virtual-cfo.html', 'Virtual CFO', 'MIS, cash flow, budget'],
      ['nbfc-nidhi-microfinance.html', 'NBFC, Nidhi &amp; Microfinance', 'RBI, NDH-4, credit society', 'Naya']
    ]],
    ['law', 'Legal &amp; Disputes', 'Advocate-led, court tak', [
      ['legal-notice.html', 'Legal Notice', 'Drafting aur reply'],
      ['cheque-bounce.html', 'Cheque Bounce', 'Section 138 NI Act'],
      ['civil-litigation.html', 'Civil Litigation', 'Recovery, property, injunction'],
      ['criminal-law.html', 'Criminal Law', 'Bail, FIR quashing'],
      ['family-law.html', 'Family Law', 'Divorce, maintenance, custody'],
      ['property-legal.html', 'Property Legal', 'Title search, sale deed, will'],
      ['succession-certificate.html', 'Succession Certificate', 'Probate, legal heir'],
      ['rera-complaint.html', 'RERA Complaint', 'Possession delay, refund'],
      ['consumer-complaint.html', 'Consumer Complaint', 'Consumer commission'],
      ['drt-sarfaesi.html', 'DRT &amp; SARFAESI', 'Bank notice, Section 17'],
      ['insolvency-ibc.html', 'Insolvency &amp; NCLT', 'Section 7, 9, claims'],
      ['arbitration-mediation.html', 'Arbitration &amp; Mediation', 'MSME Samadhaan'],
      ['agreement-drafting.html', 'Agreement Drafting', 'Rent, partnership, NDA']
    ]],
    ['ppl', 'Business &amp; People', 'Payroll, plans aur sector', [
      ['retainers.html', 'Compliance Retainers', 'Monthly plans, ek team'],
      ['payroll-hr.html', 'Payroll &amp; HR', 'PF, ESI, salary TDS'],
      ['labour-code-restructuring.html', 'Labour Code Restructuring', '50% wage rule'],
      ['manufacturing.html', 'Manufacturing Compliance', 'GST, job work, MSME'],
      ['poultry-industry.html', 'Poultry &amp; Hatchery', 'Integration business'],
      ['subsidy.html', 'Government Subsidy', 'Kaunsi subsidy, kaun eligible'],
      ['msme-funding.html', 'MSME Funding', 'PMEGP, collateral-free loan']
    ]]
  ];
  var ICON = {
    tax: '<path d="M7 3h10l4 4v14H3V3h4zM8 12h8M8 16h5"/>',
    co: '<path d="M3 21V8l9-5 9 5v13M9 21v-6h6v6"/>',
    fin: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
    law: '<path d="M12 3v18M5 7h14M5 7l-3 7h6zM19 7l-3 7h6zM8 21h8"/>',
    ppl: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 4.5a3 3 0 0 1 0 6M21 20c0-2.6-1.5-4.4-3.6-5.1"/>'
  };
  var CSS = ''
  + '.nav-links .dropdown.mega.cm-on{padding:0;min-width:0;border-radius:18px;overflow:hidden}'
  + '.cm-rail,.cm-feat{display:none}'
  + '.cm-pan h5{margin:14px 0 4px;padding:0 14px;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:#0e7ea0;font-weight:700}'
  + '.cm-pan .cm-sub,.cm-pan .cm-head p,.cm-pan .cm-all{display:none}'
  + '.cm-pan .cm-head h4{margin:14px 0 4px;padding:0 14px;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:#0e7ea0;font-weight:700}'
  + '.cm-pan a.cm-l{display:block}'
  + '.cm-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 6px}'
  + '.nav-links .cm-pan a.cm-l{padding:9px 10px!important;font-size:.86rem;line-height:1.3}'
  + '.cm-pan a.cm-l b{font-weight:600}'
  + '.cm-badge{display:inline-block;margin-left:6px;font-size:.62rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;background:#e8a317;color:#00293d;border-radius:99px;padding:1px 7px;vertical-align:2px}'
  + '.cm-quick{display:flex;flex-wrap:wrap;gap:6px;padding:10px 14px 4px}'
  + '.cm-quick a{width:auto!important;padding:7px 12px!important;border-radius:99px;background:rgba(0,81,118,.07);font-weight:600;font-size:.82rem}'
  + '.cm-quick a.cm-sos{background:#fdecea;color:#b3261e}'
  + '@media(min-width:1021px){'
  + '.nav-links .dropdown.mega.cm-on{display:flex;align-items:stretch;width:min(1000px,calc(100vw - 32px));right:0;left:auto;box-shadow:0 30px 80px -24px rgba(0,41,61,.45);border:1px solid rgba(0,81,118,.14)}'
  + '.cm-quick{display:none}'
  + '.cm-rail{display:flex;flex-direction:column;gap:2px;width:236px;flex:0 0 236px;background:linear-gradient(180deg,#00293d,#005176);padding:16px 12px}'
  + '.cm-rail .cm-k{font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;color:#7fd3e8;font-weight:700;padding:4px 10px 10px}'
  + '.cm-tab{display:flex!important;align-items:center;gap:10px;width:100%;border:0;background:transparent;color:#d8eef6;text-align:left;padding:10px 10px!important;border-radius:11px;font:inherit;font-size:.9rem;font-weight:600;cursor:pointer;transition:background .15s,color .15s}'
  + '.cm-tab svg{width:20px;height:20px;flex:0 0 20px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}'
  + '.cm-tab small{margin-left:auto;font-size:.72rem;opacity:.7;font-weight:600}'
  + '.cm-tab:hover,.cm-tab.on{background:rgba(255,255,255,.12);color:#fff}'
  + '.cm-tab.on{box-shadow:inset 3px 0 0 #4bbdd8}'
  + '.cm-rail .cm-x{margin-top:auto;padding-top:14px;display:flex;flex-direction:column;gap:6px}'
  + '.cm-rail .cm-x a{color:#fff!important;font-size:.84rem;font-weight:600;padding:9px 11px!important;border-radius:10px;background:rgba(255,255,255,.08);display:block}'
  + '.cm-rail .cm-x a:hover{background:rgba(255,255,255,.18)}'
  + '.cm-rail .cm-x a.cm-sos{background:#b3261e}'
  + '.cm-body{flex:1;min-width:0;padding:20px 22px 18px;background:#fff}'
  + '.cm-pan{display:none}.cm-pan.on{display:block}'
  + '.cm-pan .cm-head{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;border-bottom:1px solid rgba(0,81,118,.12);padding-bottom:10px;margin-bottom:8px}'
  + '.cm-pan .cm-head h4{margin:0;padding:0;font-family:inherit;font-size:1.12rem;letter-spacing:-.01em;text-transform:none;color:#00293d}'
  + '.cm-pan .cm-head p{display:block;margin:3px 0 0;font-size:.82rem;color:#46626f}'
  + '.cm-pan .cm-all{display:inline-block;width:auto!important;padding:0!important;font-size:.8rem;font-weight:700;color:#0e7ea0!important;white-space:nowrap}'
  + '.cm-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px 10px}'
  + '.cm-pan a.cm-l{padding:8px 10px!important;border-radius:10px;line-height:1.25}'
  + '.cm-pan a.cm-l b{display:block;font-weight:600;font-size:.88rem;color:#00293d}'
  + '.cm-pan .cm-sub{display:block;font-size:.74rem;color:#5a7380;margin-top:2px}'
  + '.cm-pan a.cm-l:hover{background:#eef7fb}'
  + '.cm-pan a.cm-l.cur{background:#e3f2f8}'
  + '.cm-feat{display:flex;flex-direction:column;gap:10px;width:228px;flex:0 0 228px;padding:20px 16px;background:#f3f9fc;border-left:1px solid rgba(0,81,118,.1)}'
  + '.cm-card{display:block!important;width:auto!important;padding:14px!important;border-radius:14px;background:#fff;border:1px solid rgba(0,81,118,.12);line-height:1.35}'
  + '.cm-card:hover{border-color:#0e7ea0;background:#fff!important}'
  + '.cm-card i{font-style:normal;font-size:.64rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#0e7ea0}'
  + '.cm-card b{display:block;font-size:.92rem;color:#00293d;margin:4px 0}'
  + '.cm-card span{display:block;font-size:.76rem;color:#46626f}'
  + '.cm-card.hot{background:linear-gradient(135deg,#00293d,#005176);border:0}'
  + '.cm-card.hot i{color:#e8a317}.cm-card.hot b{color:#fff}.cm-card.hot span{color:#cfe3ee}'
  + '.cm-card.hot:hover{background:linear-gradient(135deg,#00394f,#0a6489)!important}'
  + '}';
  function build(mega) {
    var page = (seg[seg.length - 1] || 'index.html');
    var curG = 0;
    G.forEach(function (g, i) { g[3].forEach(function (l) { if (l[0] === page) { curG = i; } }); });
    var rail = '<div class="cm-rail" role="tablist"><span class="cm-k">Services</span>';
    var body = '<div class="cm-body">';
    G.forEach(function (g, i) {
      rail += '<button type="button" class="cm-tab' + (i === curG ? ' on' : '') + '" data-cm="' + i + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[g[0]] + '</svg>' + g[1] + '<small>' + g[3].length + '</small></button>';
      body += '<div class="cm-pan' + (i === curG ? ' on' : '') + '" data-cm="' + i + '"><div class="cm-head"><div><h4>' + g[1] + '</h4><p>' + g[2] + '</p></div><a class="cm-all" href="services.html">Saari services &rarr;</a></div><div class="cm-grid">';
      g[3].forEach(function (l) {
        body += '<a class="cm-l' + (l[0] === page ? ' cur' : '') + '" href="' + l[0] + '"><b>' + l[1] + (l[3] ? '<span class="cm-badge">' + l[3] + '</span>' : '') + '</b><span class="cm-sub">' + l[2] + '</span></a>';
      });
      body += '</div></div>';
    });
    rail += '<div class="cm-x"><a class="cm-sos" href="gst-notice-sos.html">&#9201; GST Notice SOS</a><a href="services.html">Saari services dekhiye</a></div></div>';
    body += '</div>';
    var feat = '<div class="cm-feat">'
      + '<a class="cm-card hot" href="bank-loan-documents.html"><i>Naya &middot; Rate list</i><b>Bank loan documents</b><span>Provisional balance sheet &#8377;1,999 se, CMA data &#8377;4,999 se (+ GST)</span></a>'
      + '<a class="cm-card" href="health-check.html"><i>Free tool</i><b>Compliance Health Check</b><span>2 minute mein jaaniye kya pending hai</span></a>'
      + '<a class="cm-card" href="tax-calculators.html"><i>Free</i><b>Tax Calculators</b><span>New vs old regime, GST, HRA</span></a>'
      + '</div>';
    var quick = '<div class="cm-quick"><a href="services.html">Saari services</a><a class="cm-sos" href="gst-notice-sos.html">&#9201; GST Notice SOS</a><a href="bank-loan-documents.html">Loan documents rate list</a><a href="health-check.html">Free Health Check</a></div>';
    mega.innerHTML = quick + rail + body + feat;
    mega.classList.add('cm-on');
    function show(i) {
      var t = mega.querySelectorAll('.cm-tab'), p = mega.querySelectorAll('.cm-pan');
      for (var k = 0; k < t.length; k++) { t[k].classList.toggle('on', String(k) === String(i)); }
      for (var j = 0; j < p.length; j++) { p[j].classList.toggle('on', String(j) === String(i)); }
    }
    var tabs = mega.querySelectorAll('.cm-tab');
    for (var k = 0; k < tabs.length; k++) {
      (function (b) {
        b.addEventListener('mouseenter', function () { show(b.getAttribute('data-cm')); });
        b.addEventListener('focus', function () { show(b.getAttribute('data-cm')); });
        b.addEventListener('click', function (e) { e.stopPropagation(); show(b.getAttribute('data-cm')); });
      })(tabs[k]);
    }
    var li = mega.parentElement;
    function place() {
      if (window.innerWidth < 1021) { mega.style.right = ''; return; }
      mega.style.right = '0px';
      var r = mega.getBoundingClientRect();
      if (r.left < 16) { mega.style.right = Math.round(r.left - 16) + 'px'; }
    }
    if (li) { li.addEventListener('mouseenter', place); li.addEventListener('focusin', place); }
    window.addEventListener('resize', place);
    place();
  }
  function init() {
    var mega = document.querySelector('.nav-links .dropdown.mega');
    if (!mega || mega.classList.contains('cm-on')) { return; }
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);
    try { build(mega); } catch (e) { mega.classList.remove('cm-on'); }
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();

/* CGA language switcher — folder based. Each language lives at /<code>/<page>. English is the root. */
(function () {
  var LANGS = [
    ['en', 'English'],
    ['hi', 'हिंदी'],
    ['bn', 'বাংলা'],
    ['mr', 'मराठी'],
    ['te', 'తెలుగు'],
    ['ta', 'தமிழ்'],
    ['gu', 'ગુજરાતી'],
    ['ur', 'اردو'],
    ['kn', 'ಕನ್ನಡ'],
    ['or', 'ଓଡ଼ିଆ'],
    ['ml', 'മലയാളം'],
    ['pa', 'ਪੰਜਾਬੀ'],
    ['as', 'অসমীয়া']
  ];
  var LIVE = 'en,hi,pa,mr,gu,bn';
  /* pages already translated, per language; empty string means all pages */
  var DONE = { hi: 'about.html,accounting-bookkeeping.html,achievements.html,agreement-drafting.html,arbitration-mediation.html,article-12ab-80g.html,article-itr-notice.html,article-pvtltd-vs-llp.html,audit-assurance.html,bank-finance-news.html,business-registrations.html,business-valuation.html,ca-certificates.html,ca-in-delhi.html,ca-in-jind.html,ca-in-safidon.html,capital-gains-tax.html,case-laws.html,cga.html,cheque-bounce.html,civil-litigation.html,clients.html,company-closure.html,company-secretarial.html,compliance-calendar.html,consumer-complaint.html,contact.html,cost-audit.html,criminal-law.html,crypto-tax.html,drt-sarfaesi.html,due-diligence.html,ecommerce-sellers.html,family-law.html,fema-rbi-compliance.html,foreign-income.html,fssai-licence.html,gallery.html,govt-updates.html,gst-annual-return.html,gst-notice-sos.html,gst-refund.html,gst-registration.html,gst-return-filing.html,gujarat-startup-funding.html,health-check.html,income-tax-notice.html,index.html,insights.html,insolvency-ibc.html,international-tax.html,iso-certification.html,istart-rajasthan.html,itr-filing.html,labour-code-restructuring.html,legal-notice.html,llp-partnership.html,maharashtra-startup-grant.html,manufacturing.html,msme-funding.html,ngo-registration.html,nidhi-sss-higher-support.html,nidhi-sss-seed-support.html,payroll-hr.html,poultry-industry.html,praceasy.html,privacy.html,problems-solutions.html,producer-company.html,project-report-loan.html,property-legal.html,pvt-ltd-incorporation.html,refund.html,rera-complaint.html,retainers.html,review.html,roc-annual-compliance.html,secretarial-audit.html,section-8-company.html,services.html,social-impact.html,startup-india-certificate.html,startup-india.html,startup-tax-exemption-80iac.html,startup.html,stock-audit.html,subsidy.html,succession-certificate.html,tax-calculators.html,tax-litigation.html,tds-returns.html,team.html,terms.html,tide-2-funding.html,trademark-ip.html,updates.html,videos.html,virtual-cfo.html', pa: 'about.html,accounting-bookkeeping.html,achievements.html,agreement-drafting.html,arbitration-mediation.html,article-12ab-80g.html,article-itr-notice.html,article-pvtltd-vs-llp.html,audit-assurance.html,bank-finance-news.html,business-registrations.html,business-valuation.html,ca-certificates.html,ca-in-delhi.html,ca-in-jind.html,ca-in-safidon.html,capital-gains-tax.html,case-laws.html,cga.html,cheque-bounce.html,civil-litigation.html,clients.html,company-closure.html,company-secretarial.html,compliance-calendar.html,consumer-complaint.html,contact.html,cost-audit.html,criminal-law.html,crypto-tax.html,drt-sarfaesi.html,due-diligence.html,ecommerce-sellers.html,family-law.html,fema-rbi-compliance.html,foreign-income.html,fssai-licence.html,gallery.html,govt-updates.html,gst-annual-return.html,gst-notice-sos.html,gst-refund.html,gst-registration.html,gst-return-filing.html,gujarat-startup-funding.html,health-check.html,income-tax-notice.html,index.html,insights.html,insolvency-ibc.html,international-tax.html,iso-certification.html,istart-rajasthan.html,itr-filing.html,labour-code-restructuring.html,legal-notice.html,llp-partnership.html,maharashtra-startup-grant.html,manufacturing.html,msme-funding.html,ngo-registration.html,nidhi-sss-higher-support.html,nidhi-sss-seed-support.html,payroll-hr.html,poultry-industry.html,praceasy.html,privacy.html,problems-solutions.html,producer-company.html,project-report-loan.html,property-legal.html,pvt-ltd-incorporation.html,refund.html,rera-complaint.html,retainers.html,review.html,roc-annual-compliance.html,secretarial-audit.html,section-8-company.html,services.html,social-impact.html,startup-india-certificate.html,startup-india.html,startup-tax-exemption-80iac.html,startup.html,stock-audit.html,subsidy.html,succession-certificate.html,tax-calculators.html,tax-litigation.html,tds-returns.html,team.html,terms.html,tide-2-funding.html,trademark-ip.html,updates.html,videos.html,virtual-cfo.html', mr: 'about.html,accounting-bookkeeping.html,achievements.html,agreement-drafting.html,arbitration-mediation.html,article-12ab-80g.html,article-itr-notice.html,article-pvtltd-vs-llp.html,audit-assurance.html,bank-finance-news.html,business-registrations.html,business-valuation.html,ca-certificates.html,ca-in-delhi.html,ca-in-jind.html,ca-in-safidon.html,capital-gains-tax.html,case-laws.html,cga.html,cheque-bounce.html,civil-litigation.html,clients.html,company-closure.html,company-secretarial.html,compliance-calendar.html,consumer-complaint.html,contact.html,cost-audit.html,criminal-law.html,crypto-tax.html,drt-sarfaesi.html,due-diligence.html,ecommerce-sellers.html,family-law.html,fema-rbi-compliance.html,foreign-income.html,fssai-licence.html,gallery.html,govt-updates.html,gst-annual-return.html,gst-notice-sos.html,gst-refund.html,gst-registration.html,gst-return-filing.html,gujarat-startup-funding.html,health-check.html,income-tax-notice.html,index.html,insights.html,insolvency-ibc.html,international-tax.html,iso-certification.html,istart-rajasthan.html,itr-filing.html,labour-code-restructuring.html,legal-notice.html,llp-partnership.html,maharashtra-startup-grant.html,manufacturing.html,msme-funding.html,ngo-registration.html,nidhi-sss-higher-support.html,nidhi-sss-seed-support.html,payroll-hr.html,poultry-industry.html,praceasy.html,privacy.html,problems-solutions.html,producer-company.html,project-report-loan.html,property-legal.html,pvt-ltd-incorporation.html,refund.html,rera-complaint.html,retainers.html,review.html,roc-annual-compliance.html,secretarial-audit.html,section-8-company.html,services.html,social-impact.html,startup-india-certificate.html,startup-india.html,startup-tax-exemption-80iac.html,startup.html,stock-audit.html,subsidy.html,succession-certificate.html,tax-calculators.html,tax-litigation.html,tds-returns.html,team.html,terms.html,tide-2-funding.html,trademark-ip.html,updates.html,videos.html,virtual-cfo.html', gu: 'about.html,accounting-bookkeeping.html,achievements.html,agreement-drafting.html,arbitration-mediation.html,article-12ab-80g.html,article-itr-notice.html,article-pvtltd-vs-llp.html,audit-assurance.html,bank-finance-news.html,business-registrations.html,business-valuation.html,ca-certificates.html,ca-in-delhi.html,ca-in-jind.html,ca-in-safidon.html,capital-gains-tax.html,case-laws.html,cga.html,cheque-bounce.html,civil-litigation.html,clients.html,company-closure.html,company-secretarial.html,compliance-calendar.html,consumer-complaint.html,contact.html,cost-audit.html,criminal-law.html,crypto-tax.html,drt-sarfaesi.html,due-diligence.html,ecommerce-sellers.html,family-law.html,fema-rbi-compliance.html,foreign-income.html,fssai-licence.html,gallery.html,govt-updates.html,gst-annual-return.html,gst-notice-sos.html,gst-refund.html,gst-registration.html,gst-return-filing.html,gujarat-startup-funding.html,health-check.html,income-tax-notice.html,index.html,insights.html,insolvency-ibc.html,international-tax.html,iso-certification.html,istart-rajasthan.html,itr-filing.html,labour-code-restructuring.html,legal-notice.html,llp-partnership.html,maharashtra-startup-grant.html,manufacturing.html,msme-funding.html,ngo-registration.html,nidhi-sss-higher-support.html,nidhi-sss-seed-support.html,payroll-hr.html,poultry-industry.html,praceasy.html,privacy.html,problems-solutions.html,producer-company.html,project-report-loan.html,property-legal.html,pvt-ltd-incorporation.html,refund.html,rera-complaint.html,retainers.html,review.html,roc-annual-compliance.html,secretarial-audit.html,section-8-company.html,services.html,social-impact.html,startup-india-certificate.html,startup-india.html,startup-tax-exemption-80iac.html,startup.html,stock-audit.html,subsidy.html,succession-certificate.html,tax-calculators.html,tax-litigation.html,tds-returns.html,team.html,terms.html,tide-2-funding.html,trademark-ip.html,updates.html,videos.html,virtual-cfo.html', bn: 'about.html,accounting-bookkeeping.html,achievements.html,agreement-drafting.html,arbitration-mediation.html,article-12ab-80g.html,article-itr-notice.html,article-pvtltd-vs-llp.html,audit-assurance.html,bank-finance-news.html,business-registrations.html,business-valuation.html,ca-certificates.html,ca-in-delhi.html,ca-in-jind.html,ca-in-safidon.html,capital-gains-tax.html,case-laws.html,cga.html,cheque-bounce.html,civil-litigation.html,clients.html,company-closure.html,company-secretarial.html,compliance-calendar.html,consumer-complaint.html,contact.html,cost-audit.html,criminal-law.html,crypto-tax.html,drt-sarfaesi.html,due-diligence.html,ecommerce-sellers.html,family-law.html,fema-rbi-compliance.html,foreign-income.html,fssai-licence.html,gallery.html,govt-updates.html,gst-annual-return.html,gst-notice-sos.html,gst-refund.html,gst-registration.html,gst-return-filing.html,gujarat-startup-funding.html,health-check.html,income-tax-notice.html,index.html,insights.html,insolvency-ibc.html,international-tax.html,iso-certification.html,istart-rajasthan.html,itr-filing.html,labour-code-restructuring.html,legal-notice.html,llp-partnership.html,maharashtra-startup-grant.html,manufacturing.html,msme-funding.html,ngo-registration.html,nidhi-sss-higher-support.html,nidhi-sss-seed-support.html,payroll-hr.html,poultry-industry.html,praceasy.html,privacy.html,problems-solutions.html,producer-company.html,project-report-loan.html,property-legal.html,pvt-ltd-incorporation.html,refund.html,rera-complaint.html,retainers.html,review.html,roc-annual-compliance.html,secretarial-audit.html,section-8-company.html,services.html,social-impact.html,startup-india-certificate.html,startup-india.html,startup-tax-exemption-80iac.html,startup.html,stock-audit.html,subsidy.html,succession-certificate.html,tax-calculators.html,tax-litigation.html,tds-returns.html,team.html,terms.html,tide-2-funding.html,trademark-ip.html,updates.html,videos.html,virtual-cfo.html' };
  var RTL_LANGS = ',ur,'; (function () { var p = location.pathname.split('/').filter(Boolean); if (p.length > 1 && RTL_LANGS.indexOf(',' + p[0] + ',') >= 0) document.documentElement.setAttribute('dir', 'rtl'); })();
  var live = LIVE.split(',');
  var codes = {}; for (var i = 0; i < LANGS.length; i++) codes[LANGS[i][0]] = LANGS[i];

  var parts = location.pathname.split('/').filter(Boolean);
  var cur = 'en', page = parts.length ? parts[parts.length - 1] : '';
  if (parts.length > 1 && codes[parts[0]]) cur = parts[0];
  if (!page || page.indexOf('.') < 0) page = 'index.html';

  function has(code) {
    if (code === 'en') return true;
    var d = DONE[code];
    if (d == null || d === '') return true;
    return (',' + d + ',').indexOf(',' + page + ',') >= 0;
  }
  function urlFor(code) { return (code === 'en' ? '/' : '/' + code + '/') + page; }

  /* Link guard: on a translated page, a link to a page not yet translated opens the
     English page (no 404); a link to a translated page stays in the language folder.
     The click handler also covers links added later by scripts (health-check). */
  function fixLink(a) {
    if (cur === 'en' || !a || !a.getAttribute) return;
    var h = a.getAttribute('href');
    if (!h || h.indexOf(':') >= 0 || h.charAt(0) === '/' || h.charAt(0) === '#') return;
    if (h.indexOf('../') === 0) h = h.slice(3);
    var cut = h.search(/[#?]/), pg = cut < 0 ? h : h.slice(0, cut), tail = cut < 0 ? '' : h.slice(cut);
    if (!/^[A-Za-z0-9_-]+[.]html$/.test(pg)) return;
    var d = DONE[cur], ok = (d == null || d === '') || (',' + d + ',').indexOf(',' + pg + ',') >= 0;
    var want = (ok ? '/' + cur + '/' : '/') + pg + tail;
    if (a.getAttribute('href') !== want) a.setAttribute('href', want);
  }
  if (cur !== 'en') {
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (a) fixLink(a);
    }, true);
    var fixAll = function () { var as = document.querySelectorAll('a[href]'); for (var k = 0; k < as.length; k++) fixLink(as[k]); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fixAll); else fixAll();
  }

  var css = document.createElement('style');
  css.textContent = '.cga-lang{display:inline-flex;align-items:center;gap:.3rem;margin-left:auto;flex:0 0 auto}'
    + '.cga-lang select{appearance:none;background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.35);'
    + 'border-radius:4px;font:inherit;font-size:.78rem;font-weight:600;padding:.12rem 1.4rem .12rem .5rem;cursor:pointer}'
    + '.cga-lang select option{color:#111;background:#fff}'
    + '.cga-lang svg{margin-left:-1.25rem;pointer-events:none;opacity:.8}'
    + '@media(max-width:700px){.topbar .tb-left a:nth-child(3){display:none}}';
  document.head.appendChild(css);

  var box = document.createElement('div');
  box.className = 'cga-lang';
  var sel = document.createElement('select');
  sel.setAttribute('aria-label', 'Choose language / भाषा चुनें');
  var shown = 0;
  for (var j = 0; j < LANGS.length; j++) {
    var L = LANGS[j];
    if (live.indexOf(L[0]) < 0) continue;
    if (!has(L[0]) && L[0] !== cur) continue;
    var o = document.createElement('option');
    o.value = L[0]; o.textContent = L[1];
    if (L[0] === cur) o.selected = true;
    sel.appendChild(o); shown++;
  }
  if (shown < 2) return;
  sel.onchange = function () {
    try { localStorage.setItem('cga_lang', sel.value); } catch (e) {}
    location.href = urlFor(sel.value);
  };
  box.appendChild(sel);
  var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  arrow.setAttribute('width', '10'); arrow.setAttribute('height', '10'); arrow.setAttribute('viewBox', '0 0 10 10');
  arrow.innerHTML = '<path d="M1 3l4 4 4-4" fill="none" stroke="#fff" stroke-width="1.6"/>';
  box.appendChild(arrow);

  function mount() {
    var bar = document.querySelector('.topbar .wrap');
    if (bar) bar.appendChild(box);
    else { box.style.position = 'fixed'; box.style.top = '8px'; box.style.right = '8px'; box.style.zIndex = 99; document.body.appendChild(box); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();

/* CGA visitor analytics (first-party, no cookies, no raw IP stored).
   Sends one small beacon per page view + WhatsApp / call / pay clicks to n8n.
   Team members can exclude their own visits by opening any page with ?notrack=1 (undo: ?notrack=0). */
(function () {
  try {
    var API = 'https://cga.app.n8n.cloud/webhook/cga-track';
    if (navigator.webdriver || /bot|crawl|spider|headless|lighthouse/i.test(navigator.userAgent || '')) { return; }
    var q = location.search || '';
    if (/[?&]notrack=1/.test(q)) { localStorage.setItem('cga_notrack', '1'); }
    if (/[?&]notrack=0/.test(q)) { localStorage.removeItem('cga_notrack'); }
    if (localStorage.getItem('cga_notrack') === '1') { return; }
    var rnd = function () { return Date.now().toString(36) + Math.random().toString(36).slice(2, 10); };
    var vid = localStorage.getItem('cga_vid'), nv = 0;
    if (!vid) { vid = rnd(); localStorage.setItem('cga_vid', vid); nv = 1; }
    var sid = sessionStorage.getItem('cga_sid'), ns = 0;
    if (!sid) { sid = rnd(); sessionStorage.setItem('cga_sid', sid); ns = 1; }
    var n = Number(sessionStorage.getItem('cga_pv') || 0) + 1;
    sessionStorage.setItem('cga_pv', String(n));
    var p = new URLSearchParams(q);
    var ref = document.referrer || '';
    if (ref.indexOf(location.host) >= 0) { ref = ''; }
    var send = function (d) {
      d.v = vid; d.s = sid;
      try { fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d), keepalive: true }).catch(function () {}); } catch (e) {}
    };
    send({ e: 'pageview', nv: nv, ns: ns, n: n, p: location.pathname, t: (document.title || '').slice(0, 120), r: ref.slice(0, 200), us: p.get('utm_source') || '', um: p.get('utm_medium') || '', uc: p.get('utm_campaign') || '', l: navigator.language || '' });
    document.addEventListener('click', function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest('a,button') : null;
      if (!a) { return; }
      var href = a.getAttribute('href') || '';
      var type = '';
      if (href.indexOf('wa.me') >= 0 || href.indexOf('whatsapp') >= 0) { type = 'whatsapp'; }
      else if (href.indexOf('tel:') === 0) { type = 'call'; }
      else if (href.indexOf('mailto:') === 0) { type = 'email'; }
      else if (a.classList.contains('cga-paybtn') || href.indexOf('pay.html') >= 0) { type = 'pay_click'; }
      if (type) { send({ e: type, ns: 0, p: location.pathname, t: (a.textContent || '').trim().slice(0, 80) }); }
    }, true);
  } catch (e) {}
})();
