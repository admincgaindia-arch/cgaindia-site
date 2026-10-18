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

/* CGA layout guard: long words (e.g. ACIT/ITO) never push a page sideways */
(function () { var st = document.createElement('style'); st.textContent = 'h1,h2,h3,h4{overflow-wrap:break-word}'; (document.head || document.documentElement).appendChild(st); })();

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
    rail += '<div class="cm-x"><a class="cm-sos" href="gst-notice-sos.html">&#9201; GST Notice SOS</a><a href="documents-checklist.html">Documents checklist</a><a href="services.html">Saari services dekhiye</a></div></div>';
    body += '</div>';
    var feat = '<div class="cm-feat">'
      + '<a class="cm-card hot" href="bank-loan-documents.html"><i>Naya &middot; Rate list</i><b>Bank loan documents</b><span>Provisional balance sheet &#8377;1,999 se, CMA data &#8377;4,999 se (+ GST)</span></a>'
      + '<a class="cm-card" href="health-check.html"><i>Free tool</i><b>Compliance Health Check</b><span>2 minute mein jaaniye kya pending hai</span></a>'
      + '<a class="cm-card" href="tax-calculators.html"><i>Free</i><b>Tax Calculators</b><span>New vs old regime, GST, HRA</span></a>'
      + '</div>';
    var quick = '<div class="cm-quick"><a href="services.html">Saari services</a><a class="cm-sos" href="gst-notice-sos.html">&#9201; GST Notice SOS</a><a href="documents-checklist.html">Documents checklist</a><a href="bank-loan-documents.html">Loan documents rate list</a><a href="health-check.html">Free Health Check</a></div>';
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
  /* ---- site search (header button, Ctrl+K or /) ---- */
  function cmSearch(mega) {
    var X = [
      ['health-check.html', 'Free Compliance Health Check', 'Tool', 'risk pending check gst tds roc'],
      ['tax-calculators.html', 'Tax Calculators', 'Tool', 'new old regime hra gst calculator income tax'],
      ['gst-notice-sos.html', 'GST Notice SOS', 'Urgent', 'notice reply asmt drc reg-17 gstr-3a decoder'],
      ['compliance-calendar.html', 'Compliance Calendar', 'Learn', 'due date deadline calendar'],
      ['case-laws.html', 'Latest Case Laws', 'Learn', 'judgment itat high court ruling'],
      ['updates.html', 'Daily Tax Updates', 'Learn', 'news circular notification'],
      ['govt-updates.html', 'Govt Updates', 'Learn', 'state central scheme notification'],
      ['bank-finance-news.html', 'Bank & Finance News', 'Learn', 'rbi bank loan news'],
      ['insights.html', 'Insights & Articles', 'Learn', 'blog article guide'],
      ['videos.html', 'Videos', 'Learn', 'youtube video'],
      ['problems-solutions.html', 'Common Problems', 'Learn', 'problem solution'],
      ['about.html', 'About CGA', 'Firm', 'firm about ca advocate'],
      ['team.html', 'Our Team', 'Firm', 'team partner ca cs'],
      ['gallery.html', 'Offices & Gallery', 'Firm', 'office address burari noida rohtak safidon'],
      ['contact.html', 'Contact & Offices', 'Firm', 'contact phone address whatsapp email office'],
      ['clients.html', 'Clients', 'Firm', 'clients'],
      ['pay.html', 'Pay Online', 'Pay', 'payment upi razorpay fee pay'],
      ['portal.html', 'Client Login', 'Portal', 'login portal'],
      ['praceasy.html', 'PracEasy', 'Product', 'software practice management'],
      ['careers.html', 'Careers & Training', 'Firm', 'job internship articleship training career join apply resume naukri vacancy'],
      ['documents-checklist.html', 'Documents Checklist', 'Tool', 'documents kaagaz papers list required checklist kya chahiye']
    ];
    var KW = {
      'bank-loan-documents.html': 'cma provisional projected estimated balance sheet loan cc od net worth turnover certificate',
      'project-report-loan.html': 'project report mudra pmegp dscr term loan',
      'society-compliance.html': 'society co-operative cooperative credit society annual return projections multi state',
      'company-buy-sell.html': 'company kharid bech buy sell takeover share transfer ready company old company',
      'nbfc-nidhi-microfinance.html': 'nbfc nidhi microfinance mfi lending finance company credit society rbi',
      'ngo-registration.html': 'ngo trust 12a 12ab 80g society registration',
      'income-tax-notice.html': 'income tax notice 143 148 scrutiny demand',
      'cheque-bounce.html': 'cheque bounce 138',
      'pvt-ltd-incorporation.html': 'company registration incorporation private limited',
      'gst-registration.html': 'gst number gstin registration',
      'itr-filing.html': 'itr income tax return filing',
      'trademark-ip.html': 'trademark brand logo copyright',
      'fssai-licence.html': 'food licence fssai',
      'business-registrations.html': 'udyam msme iec import export dsc'
    };
    var IDX = [];
    G.forEach(function (g) { g[3].forEach(function (l) { IDX.push([l[0], l[1].replace(/&amp;/g, '&').replace(/&middot;/g, '·'), g[1].replace(/&amp;/g, '&'), l[2] + ' ' + (KW[l[0]] || ''), l[2]]); }); });
    X.forEach(function (x) { IDX.push(x); });
    var css = ''
      + '.cms-btn{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;border:1.5px solid rgba(0,81,118,.25);background:#fff;color:#005176;cursor:pointer;flex:0 0 40px;margin-left:10px;padding:0}'
      + '.cms-btn:hover{background:#eef7fb}.cms-btn svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round}'
      + '@media(max-width:1020px){.cms-btn{margin-left:auto;margin-right:8px}}'
      + '.cms-ov{position:fixed;inset:0;z-index:2147483646;background:rgba(0,26,40,.55);backdrop-filter:blur(3px);display:none;align-items:flex-start;justify-content:center;padding:9vh 14px 14px}'
      + '.cms-ov.on{display:flex}'
      + '.cms-box{width:min(640px,100%);background:#fff;border-radius:18px;box-shadow:0 30px 80px -20px rgba(0,0,0,.5);overflow:hidden;display:flex;flex-direction:column;max-height:78vh}'
      + '.cms-top{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid rgba(0,81,118,.12)}'
      + '.cms-top svg{width:20px;height:20px;stroke:#0e7ea0;fill:none;stroke-width:2;stroke-linecap:round;flex:0 0 20px}'
      + '.cms-in{flex:1;border:0;outline:0;font:inherit;font-size:1.05rem;color:#00293d;background:transparent;min-width:0}'
      + '.cms-x{border:0;background:#eef3f6;color:#46626f;border-radius:8px;padding:5px 9px;font:inherit;font-size:.75rem;cursor:pointer}'
      + '.cms-res{overflow-y:auto;padding:6px}'
      + '.cms-res a{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:11px;text-decoration:none;color:#00293d}'
      + '.cms-res a b{font-weight:600;font-size:.95rem}.cms-res a small{display:block;color:#5a7380;font-size:.78rem;margin-top:1px}'
      + '.cms-res a i{margin-left:auto;font-style:normal;font-size:.68rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#0e7ea0;background:#eef7fb;border-radius:99px;padding:3px 8px;white-space:nowrap}'
      + '.cms-res a.sel,.cms-res a:hover{background:#eef7fb}'
      + '.cms-empty{padding:18px;color:#46626f;font-size:.92rem}'
      + '.cms-empty a{color:#0e7ea0;font-weight:700}'
      + '.cms-hint{padding:8px 16px;border-top:1px solid rgba(0,81,118,.1);font-size:.74rem;color:#5a7380}'
      + '@media(max-width:600px){.cms-res a i,.cms-hint{display:none}.cms-ov{padding-top:12px}}';
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var ov = document.createElement('div');
    ov.className = 'cms-ov';
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Search');
    ov.innerHTML = '<div class="cms-box"><div class="cms-top"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input class="cms-in" type="search" placeholder="Service dhundhiye: GST notice, CMA, ITR, NBFC..." aria-label="Search services" autocomplete="off"><button type="button" class="cms-x">Esc</button></div><div class="cms-res"></div><div class="cms-hint">&uarr; &darr; se chuniye, Enter se kholiye. Shortcut: Ctrl + K</div></div>';
    document.body.appendChild(ov);
    var inp = ov.querySelector('.cms-in'), res = ov.querySelector('.cms-res'), sel = 0, cur = [];
    function norm(s) { return String(s).toLowerCase().replace(/[^a-z0-9\u0900-\u097f ]+/g, ' ').replace(/\s+/g, ' ').trim(); }
    function score(it, toks) {
      var t = norm(it[1]), all = norm(it[1] + ' ' + it[2] + ' ' + it[3]), s = 0;
      for (var i = 0; i < toks.length; i++) {
        var k = toks[i];
        if ((k.length < 4 ? (' ' + all).indexOf(' ' + k) : all.indexOf(k)) < 0) { return -1; }
        if (t.indexOf(k) === 0) { s += 6; } else if ((' ' + t).indexOf(' ' + k) > -1) { s += 4; } else if (t.indexOf(k) > -1) { s += 2; } else { s += 1; }
      }
      return s;
    }
    function draw() {
      var q = norm(inp.value), toks = q ? q.split(' ') : [];
      if (!toks.length) {
        cur = IDX.filter(function (x) { return /bank-loan-documents|gst-notice-sos|itr-filing|pvt-ltd-incorporation|health-check|company-buy-sell/.test(x[0]); });
      } else {
        cur = IDX.map(function (x) { return [score(x, toks), x]; }).filter(function (p) { return p[0] > 0; })
          .sort(function (a, b) { return b[0] - a[0]; }).map(function (p) { return p[1]; });
        var seen = {}; cur = cur.filter(function (x) { if (seen[x[0] + x[1]]) { return false; } seen[x[0] + x[1]] = 1; return true; }).slice(0, 9);
      }
      sel = 0;
      if (!cur.length) {
        res.innerHTML = '<div class="cms-empty">Kuch nahi mila. <a href="services.html">Saari services dekhiye</a> ya <a href="https://wa.me/919996647888?text=BIZ" target="_blank" rel="noopener">WhatsApp par poochiye</a>.</div>';
        return;
      }
      res.innerHTML = cur.map(function (x, i) {
        return '<a href="' + x[0] + '"' + (i === 0 ? ' class="sel"' : '') + '><span><b>' + x[1].replace(/</g, '&lt;') + '</b>' + (x[4] ? '<small>' + x[4].replace(/</g, '&lt;') + '</small>' : '') + '</span><i>' + x[2].replace(/</g, '&lt;') + '</i></a>';
      }).join('');
    }
    function mark() { var a = res.querySelectorAll('a[href]'); for (var i = 0; i < a.length; i++) { a[i].classList.toggle('sel', i === sel); } if (a[sel] && a[sel].scrollIntoView) { a[sel].scrollIntoView({ block: 'nearest' }); } }
    function open() { ov.classList.add('on'); inp.value = ''; draw(); setTimeout(function () { inp.focus(); }, 30); document.documentElement.style.overflow = 'hidden'; }
    function close() { ov.classList.remove('on'); document.documentElement.style.overflow = ''; }
    inp.addEventListener('input', draw);
    inp.addEventListener('keydown', function (e) {
      var n = res.querySelectorAll('.cms-res > a').length;
      if (e.key === 'ArrowDown') { e.preventDefault(); if (n) { sel = (sel + 1) % n; mark(); } }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (n) { sel = (sel - 1 + n) % n; mark(); } }
      else if (e.key === 'Enter') { e.preventDefault(); if (cur[sel]) { location.href = cur[sel][0]; } }
      else if (e.key === 'Escape') { close(); }
    });
    ov.addEventListener('click', function (e) { if (e.target === ov) { close(); } });
    ov.querySelector('.cms-x').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); open(); }
      else if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(tag) && !e.target.isContentEditable) { e.preventDefault(); open(); }
      else if (e.key === 'Escape' && ov.classList.contains('on')) { close(); }
    });
    var nav = document.querySelector('.nav-in');
    if (nav) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'cms-btn'; b.setAttribute('aria-label', 'Search services'); b.title = 'Search (Ctrl + K)';
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';
      b.addEventListener('click', function (e) { e.stopPropagation(); open(); });
      var mb = nav.querySelector('.menu-btn');
      if (window.matchMedia('(max-width:1020px)').matches && mb) { nav.insertBefore(b, mb); } else { nav.appendChild(b); }
      window.addEventListener('resize', function () {
        var m = window.matchMedia('(max-width:1020px)').matches;
        if (m && mb && b.nextSibling !== mb) { nav.insertBefore(b, mb); }
        else if (!m && b.parentNode === nav && nav.lastElementChild !== b) { nav.appendChild(b); }
      });
    }
  }
  /* ---- welcome coupon (one per mobile, 10% off up to Rs 500) ---- */
  function cmCoupon() {
    var path = location.pathname;
    if (/(careers|portal|pay|review|engagement|404|offline)\.html$/.test(path)) { return; }
    var LS = window.localStorage;
    function get(k) { try { return LS.getItem(k); } catch (e) { return null; } }
    function set(k, v) { try { LS.setItem(k, v); } catch (e) {} }
    if (get('cga_cpn')) { return; }
    var x = Number(get('cga_cpn_x') || 0);
    if (x && Date.now() - x < 7 * 86400000) { return; }
    var shown = false;
    var css = ''
      + '.cpn-ov{position:fixed;inset:0;z-index:2147483647;background:rgba(0,26,40,.55);display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity .25s}'
      + '.cpn-ov.on{opacity:1}'
      + '.cpn-box{position:relative;width:min(420px,100%);background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 30px 80px -20px rgba(0,0,0,.5);font-family:inherit}'
      + '.cpn-top{background:linear-gradient(135deg,#00293d,#005176);color:#fff;padding:22px 22px 18px;text-align:center}'
      + '.cpn-top small{display:block;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:#7fd3e8;font-weight:700}'
      + '.cpn-top b{display:block;font-size:2.4rem;line-height:1.1;margin:6px 0 2px;color:#e8a317}'
      + '.cpn-top span{font-size:.95rem;color:#d8eef6}'
      + '.cpn-x{position:absolute;top:10px;right:12px;border:0;background:rgba(255,255,255,.15);color:#fff;width:30px;height:30px;border-radius:50%;font-size:18px;line-height:30px;cursor:pointer;padding:0}'
      + '.cpn-body{padding:18px 22px 20px}'
      + '.cpn-body p{margin:0 0 12px;font-size:.92rem;color:#2c4552}'
      + '.cpn-body input{width:100%;box-sizing:border-box;border:1px solid #c9dbe4;border-radius:10px;padding:11px 12px;font:inherit;font-size:1rem;margin-bottom:10px;color:#00293d;background:#fbfdfe}'
      + '.cpn-body input:focus{outline:2px solid #4bbdd8;border-color:#4bbdd8}'
      + '.cpn-btn{display:block;width:100%;border:0;background:#005176;color:#fff;font:inherit;font-weight:700;font-size:1rem;padding:13px;border-radius:999px;cursor:pointer;text-align:center;text-decoration:none;box-sizing:border-box}'
      + '.cpn-btn:disabled{opacity:.6;cursor:wait}'
      + '.cpn-btn.wa{background:#25d366;margin-top:10px}'
      + '.cpn-btn.ln{background:transparent;color:#005176;border:1.5px solid #c9dbe4;margin-top:10px}'
      + '.cpn-code{display:flex;align-items:center;justify-content:space-between;gap:10px;border:2px dashed #e8a317;border-radius:12px;padding:12px 14px;margin:4px 0 8px;background:#fffaf0}'
      + '.cpn-code b{font-size:1.5rem;letter-spacing:.08em;color:#00293d}'
      + '.cpn-code button{border:0;background:#00293d;color:#fff;border-radius:8px;padding:7px 12px;font:inherit;font-size:.8rem;cursor:pointer}'
      + '.cpn-t{font-size:.72rem!important;color:#6b8290!important;margin:12px 0 0!important;line-height:1.45}'
      + '.cpn-err{color:#b3261e!important;font-size:.85rem!important;display:none}'
      + '.cpn-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}';
    var TERMS = 'Sirf pehle order par &middot; min order &#8377;999 &middot; zyada se zyada &#8377;500 off &middot; 30 din valid &middot; ek mobile par ek coupon &middot; government fee, stamp duty, audit aur certificate (UDIN) kaam par lagu nahi.';
    function close(ov) { set('cga_cpn_x', String(Date.now())); ov.classList.remove('on'); setTimeout(function () { if (ov.parentNode) { ov.parentNode.removeChild(ov); } }, 250); document.documentElement.style.overflow = ''; }
    function fmt(d) { var M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; var p = String(d || '').split('-'); return p.length === 3 ? Number(p[2]) + ' ' + M[Number(p[1]) - 1] + ' ' + p[0] : d; }
    function show() {
      if (shown || get('cga_cpn')) { return; }
      if (document.querySelector('.cms-ov.on')) { return; }
      shown = true;
      var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
      var ov = document.createElement('div');
      ov.className = 'cpn-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Welcome coupon');
      ov.innerHTML = '<div class="cpn-box"><button type="button" class="cpn-x" aria-label="Band kariye">&times;</button>'
        + '<div class="cpn-top"><small>Welcome coupon</small><b>10% OFF</b><span>pehli service par, &#8377;500 tak ki bachat</span></div>'
        + '<div class="cpn-body"><form class="cpn-f" novalidate><p>Apna mobile number daaliye, coupon code turant yahin mil jayega.</p>'
        + '<input class="cpn-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">'
        + '<input name="name" maxlength="60" placeholder="Aapka naam" autocomplete="name">'
        + '<input name="mobile" type="tel" inputmode="numeric" maxlength="13" placeholder="Mobile number (10 digit)" autocomplete="tel" required>'
        + '<p class="cpn-err" role="alert"></p>'
        + '<button type="submit" class="cpn-btn">Coupon paiye</button>'
        + '<p class="cpn-t">' + TERMS + '</p></form></div></div>';
      document.body.appendChild(ov);
      document.documentElement.style.overflow = 'hidden';
      setTimeout(function () { ov.classList.add('on'); }, 20);
      ov.querySelector('.cpn-x').addEventListener('click', function () { close(ov); });
      ov.addEventListener('click', function (e) { if (e.target === ov) { close(ov); } });
      document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape' && ov.parentNode) { close(ov); document.removeEventListener('keydown', esc); } });
      var f = ov.querySelector('.cpn-f'), err = ov.querySelector('.cpn-err'), btn = f.querySelector('.cpn-btn');
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var m = f.mobile.value.replace(/[^0-9]/g, '').slice(-10);
        if (m.length !== 10 || /^[0-5]/.test(m)) { err.textContent = 'Sahi 10 digit mobile number daaliye.'; err.style.display = 'block'; return; }
        err.style.display = 'none'; btn.disabled = true; btn.textContent = 'Coupon ban raha hai...';
        fetch('https://cga.app.n8n.cloud/webhook/cga-coupon', { method: 'POST', body: JSON.stringify({ name: f.name.value.trim(), mobile: m, page: path, website: f.website.value }) })
          .then(function (r) { return r.json(); })
          .then(function (d) {
            if (!d || !d.ok || !d.code) { throw new Error('x'); }
            var code = String(d.code).replace(/[^A-Z0-9]/g, '');
            set('cga_cpn', JSON.stringify({ code: code, exp: d.expires_on }));
            try { if (window.gtag) { window.gtag('event', 'generate_lead', { method: 'coupon' }); } } catch (x) {}
            var wa = 'https://wa.me/919996647888?text=' + encodeURIComponent('Namaste CGA, mera coupon code ' + code + ' hai. Mujhe is service ke liye madad chahiye: ');
            ov.querySelector('.cpn-body').innerHTML = '<p><b>Badhai ho!</b> Aapka coupon taiyaar hai' + (d.isNew === false ? ' (is number par pehle se bana hua)' : '') + ':</p>'
              + '<div class="cpn-code"><b>' + code + '</b><button type="button" class="cpn-cp">Copy</button></div>'
              + '<p style="font-size:.85rem;color:#46626f">Valid: ' + fmt(d.expires_on) + ' tak. Order karte waqt ye code WhatsApp ya call par bataiye, discount bill mein lag jayega.</p>'
              + '<a class="cpn-btn wa" href="' + wa + '" target="_blank" rel="noopener">WhatsApp par coupon use kariye</a>'
              + '<a class="cpn-btn ln" href="services.html">Services aur rates dekhiye</a>'
              + '<p class="cpn-t">' + TERMS + '</p>';
            var cp = ov.querySelector('.cpn-cp');
            cp.addEventListener('click', function () { try { navigator.clipboard.writeText(code); cp.textContent = 'Copied'; } catch (x) { cp.textContent = code; } });
          })
          .catch(function () { btn.disabled = false; btn.textContent = 'Coupon paiye'; err.innerHTML = 'Abhi coupon nahi ban paaya. <a href="https://wa.me/919996647888?text=' + encodeURIComponent('Namaste CGA, mujhe website wala 10% welcome coupon chahiye.') + '" target="_blank" rel="noopener">WhatsApp par maangiye</a>.'; err.style.display = 'block'; });
      });
    }
    setTimeout(show, 25000);
    window.addEventListener('scroll', function onS() {
      var h = document.documentElement.scrollHeight - innerHeight;
      if (h > 0 && scrollY / h > 0.5) { window.removeEventListener('scroll', onS); show(); }
    }, { passive: true });
  }
  /* ---- Team CGA ki zubaani: approved staff quotes, one featured per day ---- */
  function cmTeamQuotes() {
    var p = location.pathname.split('/').pop() || 'index.html';
    if (['index.html', 'about.html', 'team.html', 'careers.html', 'services.html', 'contact.html'].indexOf(p) < 0) { return; }
    var foot = document.querySelector('footer');
    if (!foot || document.getElementById('cgaTeamQ')) { return; }
    var KEY = 'cga_tq', TTL = 6 * 3600000;
    function render(list) {
      if (!list || !list.length) { return; }
      var css = ''
        + '.tq{padding:56px 16px;background:linear-gradient(180deg,#f3f9fc,#fff)}'
        + '.tq-in{max-width:880px;margin:0 auto;text-align:center}'
        + '.tq-k{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:#0e7ea0;font-weight:700}'
        + '.tq h2{margin:6px 0 22px;font-size:clamp(1.4rem,3vw,1.9rem);color:#00293d}'
        + '.tq-card{position:relative;background:#fff;border:1px solid rgba(0,81,118,.14);border-radius:20px;padding:34px clamp(18px,4vw,44px) 26px;box-shadow:0 24px 60px -36px rgba(0,41,61,.45);min-height:190px}'
        + '.tq-card:before{content:"\\201C";position:absolute;top:-8px;left:22px;font-size:6rem;line-height:1;color:#e8a317;font-family:Georgia,serif;opacity:.55}'
        + '.tq-q{font-size:clamp(1.02rem,2.1vw,1.22rem);line-height:1.6;color:#1d3340;margin:0 0 20px;transition:opacity .35s}'
        + '.tq-who{display:inline-flex;align-items:center;gap:12px;text-align:left;transition:opacity .35s}'
        + '.tq-av{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#005176,#4bbdd8);color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:1rem;flex:0 0 46px}'
        + '.tq-who b{display:block;color:#00293d}.tq-who small{color:#5a7380;font-size:.84rem}'
        + '.tq-nav{display:flex;justify-content:center;align-items:center;gap:10px;margin-top:18px}'
        + '.tq-nav button{width:36px;height:36px;border-radius:50%;border:1.5px solid #c9dbe4;background:#fff;color:#005176;font-size:1rem;cursor:pointer}'
        + '.tq-dots{display:flex;gap:6px}.tq-dots i{width:8px;height:8px;border-radius:50%;background:#c9dbe4;display:block}.tq-dots i.on{background:#005176}'
        + '.tq-foot{margin-top:16px;font-size:.84rem;color:#5a7380}.tq-foot a{color:#0e7ea0;font-weight:700}';
      var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
      var day = Math.floor((Date.now() + 19800000) / 86400000);
      var idx = day % list.length;
      var sec = document.createElement('section');
      sec.className = 'tq'; sec.id = 'cgaTeamQ';
      sec.innerHTML = '<div class="tq-in"><span class="tq-k">Team CGA ki zubaani</span><h2>Aaj ka vichaar, hamari team se</h2><div class="tq-card"><p class="tq-q"></p><div class="tq-who"><span class="tq-av"></span><span><b></b><small></small></span></div></div>'
        + (list.length > 1 ? '<div class="tq-nav"><button type="button" class="tq-p" aria-label="Pichhla vichaar">&#8249;</button><span class="tq-dots"></span><button type="button" class="tq-n" aria-label="Agla vichaar">&#8250;</button></div>' : '')
        + '<p class="tq-foot">CGA team members ke apne shabd. <a href="careers.html">Team join kariye &rarr;</a></p></div>';
      foot.parentNode.insertBefore(sec, foot);
      var q = sec.querySelector('.tq-q'), av = sec.querySelector('.tq-av'), nm = sec.querySelector('.tq-who b'), rl = sec.querySelector('.tq-who small'), who = sec.querySelector('.tq-who'), dots = sec.querySelector('.tq-dots');
      var shown = Math.min(list.length, 7);
      if (dots) { for (var i = 0; i < shown; i++) { dots.appendChild(document.createElement('i')); } }
      function initials(n) { return String(n).split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join(''); }
      function show(k) {
        idx = (k + list.length) % list.length;
        var it = list[idx];
        q.style.opacity = 0; who.style.opacity = 0;
        setTimeout(function () {
          q.textContent = it.q; nm.textContent = it.n; rl.textContent = [it.r, it.o].filter(Boolean).join(' \u00b7 '); av.textContent = initials(it.n);
          q.style.opacity = 1; who.style.opacity = 1;
          if (dots) { var d = dots.children; for (var j = 0; j < d.length; j++) { d[j].className = (j === idx % shown) ? 'on' : ''; } }
        }, 180);
      }
      show(idx);
      if (list.length > 1) {
        var timer = setInterval(function () { show(idx + 1); }, 9000);
        sec.querySelector('.tq-p').addEventListener('click', function () { clearInterval(timer); show(idx - 1); });
        sec.querySelector('.tq-n').addEventListener('click', function () { clearInterval(timer); show(idx + 1); });
      }
    }
    var cached = null;
    try { cached = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
    if (cached && cached.t && Date.now() - cached.t < TTL) { render(cached.q); return; }
    fetch('https://cga.app.n8n.cloud/webhook/cga-team-quotes').then(function (r) { return r.json(); }).then(function (d) {
      var list = (d && d.quotes) || [];
      try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), q: list })); } catch (e) {}
      render(list);
    }).catch(function () { if (cached && cached.q) { render(cached.q); } });
  }
  function init() {
    var mega = document.querySelector('.nav-links .dropdown.mega');
    if (!mega || mega.classList.contains('cm-on')) { return; }
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);
    try { build(mega); } catch (e) { mega.classList.remove('cm-on'); }
    try { cmSearch(mega); } catch (e) {}
    try { cmCoupon(); } catch (e) {}
    try { cmTeamQuotes(); } catch (e) {}
    try { var fa = document.querySelector('.nav-links .dropdown a[href="about.html"]'); if (fa && !fa.parentNode.querySelector('a[href="careers.html"]')) { var ca = document.createElement('a'); ca.href = 'careers.html'; ca.textContent = 'Careers \u00b7 Join CGA'; fa.parentNode.appendChild(ca); } } catch (e) {}
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
