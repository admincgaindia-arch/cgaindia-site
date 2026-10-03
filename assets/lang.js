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
  var DONE = { hi: 'about.html,accounting-bookkeeping.html,achievements.html,agreement-drafting.html,article-12ab-80g.html,article-itr-notice.html,article-pvtltd-vs-llp.html,audit-assurance.html,bank-finance-news.html,business-registrations.html,ca-certificates.html,ca-in-delhi.html,ca-in-jind.html,ca-in-safidon.html,case-laws.html,cga.html,cheque-bounce.html,civil-litigation.html,clients.html,company-closure.html,company-secretarial.html,compliance-calendar.html,contact.html,cost-audit.html,criminal-law.html,crypto-tax.html,ecommerce-sellers.html,foreign-income.html,fssai-licence.html,gallery.html,govt-updates.html,gst-notice-sos.html,gst-registration.html,gst-return-filing.html,gujarat-startup-funding.html,health-check.html,income-tax-notice.html,index.html,insights.html,international-tax.html,iso-certification.html,istart-rajasthan.html,itr-filing.html,labour-code-restructuring.html,legal-notice.html,llp-partnership.html,maharashtra-startup-grant.html,manufacturing.html,msme-funding.html,ngo-registration.html,nidhi-sss-higher-support.html,nidhi-sss-seed-support.html,payroll-hr.html,poultry-industry.html,praceasy.html,privacy.html,problems-solutions.html,project-report-loan.html,property-legal.html,pvt-ltd-incorporation.html,refund.html,retainers.html,review.html,roc-annual-compliance.html,services.html,social-impact.html,startup-india-certificate.html,startup-india.html,startup-tax-exemption-80iac.html,startup.html,subsidy.html,tax-calculators.html,tax-litigation.html,tds-returns.html,team.html,terms.html,tide-2-funding.html,trademark-ip.html,updates.html,videos.html,virtual-cfo.html', pa: 'about.html,accounting-bookkeeping.html,achievements.html,agreement-drafting.html,article-12ab-80g.html,article-itr-notice.html,article-pvtltd-vs-llp.html,audit-assurance.html,bank-finance-news.html,business-registrations.html,ca-certificates.html,ca-in-delhi.html,ca-in-jind.html,ca-in-safidon.html,case-laws.html,cga.html,cheque-bounce.html,civil-litigation.html,clients.html,company-closure.html,company-secretarial.html,compliance-calendar.html,contact.html,cost-audit.html,criminal-law.html,crypto-tax.html,ecommerce-sellers.html,foreign-income.html,fssai-licence.html,gallery.html,govt-updates.html,gst-notice-sos.html,gst-registration.html,gst-return-filing.html,gujarat-startup-funding.html,health-check.html,income-tax-notice.html,index.html,insights.html,international-tax.html,iso-certification.html,istart-rajasthan.html,itr-filing.html,labour-code-restructuring.html,legal-notice.html,llp-partnership.html,maharashtra-startup-grant.html,manufacturing.html,msme-funding.html,ngo-registration.html,nidhi-sss-higher-support.html,nidhi-sss-seed-support.html,payroll-hr.html,poultry-industry.html,praceasy.html,privacy.html,problems-solutions.html,project-report-loan.html,property-legal.html,pvt-ltd-incorporation.html,refund.html,retainers.html,review.html,roc-annual-compliance.html,services.html,social-impact.html,startup-india-certificate.html,startup-india.html,startup-tax-exemption-80iac.html,startup.html,subsidy.html,tax-calculators.html,tax-litigation.html,tds-returns.html,team.html,terms.html,tide-2-funding.html,trademark-ip.html,updates.html,videos.html,virtual-cfo.html', mr: 'about.html,accounting-bookkeeping.html,achievements.html,agreement-drafting.html,article-12ab-80g.html,article-itr-notice.html,article-pvtltd-vs-llp.html,audit-assurance.html,bank-finance-news.html,business-registrations.html,ca-certificates.html,ca-in-delhi.html,ca-in-jind.html,ca-in-safidon.html,case-laws.html,cga.html,cheque-bounce.html,civil-litigation.html,clients.html,company-closure.html,company-secretarial.html,compliance-calendar.html,contact.html,cost-audit.html,criminal-law.html,crypto-tax.html,ecommerce-sellers.html,foreign-income.html,fssai-licence.html,gallery.html,govt-updates.html,gst-notice-sos.html,gst-registration.html,gst-return-filing.html,gujarat-startup-funding.html,health-check.html,income-tax-notice.html,index.html,insights.html,international-tax.html,iso-certification.html,istart-rajasthan.html,itr-filing.html,labour-code-restructuring.html,legal-notice.html,llp-partnership.html,maharashtra-startup-grant.html,manufacturing.html,msme-funding.html,ngo-registration.html,nidhi-sss-higher-support.html,nidhi-sss-seed-support.html,payroll-hr.html,poultry-industry.html,praceasy.html,privacy.html,problems-solutions.html,project-report-loan.html,property-legal.html,pvt-ltd-incorporation.html,refund.html,retainers.html,review.html,roc-annual-compliance.html,services.html,social-impact.html,startup-india-certificate.html,startup-india.html,startup-tax-exemption-80iac.html,startup.html,subsidy.html,tax-calculators.html,tax-litigation.html,tds-returns.html,team.html,terms.html,tide-2-funding.html,trademark-ip.html,updates.html,videos.html,virtual-cfo.html', gu: 'about.html,accounting-bookkeeping.html,achievements.html,agreement-drafting.html,article-12ab-80g.html,article-itr-notice.html,article-pvtltd-vs-llp.html,audit-assurance.html,bank-finance-news.html,business-registrations.html,ca-certificates.html,ca-in-delhi.html,ca-in-jind.html,ca-in-safidon.html,case-laws.html,cga.html,cheque-bounce.html,civil-litigation.html,clients.html,company-closure.html,company-secretarial.html,compliance-calendar.html,contact.html,cost-audit.html,criminal-law.html,crypto-tax.html,ecommerce-sellers.html,foreign-income.html,fssai-licence.html,gallery.html,govt-updates.html,gst-notice-sos.html,gst-registration.html,gst-return-filing.html,gujarat-startup-funding.html,health-check.html,income-tax-notice.html,index.html,insights.html,international-tax.html,iso-certification.html,istart-rajasthan.html,itr-filing.html,labour-code-restructuring.html,legal-notice.html,llp-partnership.html,maharashtra-startup-grant.html,manufacturing.html,msme-funding.html,ngo-registration.html,nidhi-sss-higher-support.html,nidhi-sss-seed-support.html,payroll-hr.html,poultry-industry.html,praceasy.html,privacy.html,problems-solutions.html,project-report-loan.html,property-legal.html,pvt-ltd-incorporation.html,refund.html,retainers.html,review.html,roc-annual-compliance.html,services.html,social-impact.html,startup-india-certificate.html,startup-india.html,startup-tax-exemption-80iac.html,startup.html,subsidy.html,tax-calculators.html,tax-litigation.html,tds-returns.html,team.html,terms.html,tide-2-funding.html,trademark-ip.html,updates.html,videos.html,virtual-cfo.html', bn: 'about.html,accounting-bookkeeping.html,achievements.html,agreement-drafting.html,article-12ab-80g.html,article-itr-notice.html,article-pvtltd-vs-llp.html,audit-assurance.html,bank-finance-news.html,business-registrations.html,ca-certificates.html,ca-in-delhi.html,ca-in-jind.html,ca-in-safidon.html,case-laws.html,cga.html,cheque-bounce.html,civil-litigation.html,clients.html,company-closure.html,company-secretarial.html,compliance-calendar.html,contact.html,cost-audit.html,criminal-law.html,crypto-tax.html,ecommerce-sellers.html,foreign-income.html,fssai-licence.html,gallery.html,govt-updates.html,gst-notice-sos.html,gst-registration.html,gst-return-filing.html,gujarat-startup-funding.html,health-check.html,income-tax-notice.html,index.html,insights.html,international-tax.html,iso-certification.html,istart-rajasthan.html,itr-filing.html,labour-code-restructuring.html,legal-notice.html,llp-partnership.html,maharashtra-startup-grant.html,manufacturing.html,msme-funding.html,ngo-registration.html,nidhi-sss-higher-support.html,nidhi-sss-seed-support.html,payroll-hr.html,poultry-industry.html,praceasy.html,privacy.html,problems-solutions.html,project-report-loan.html,property-legal.html,pvt-ltd-incorporation.html,refund.html,retainers.html,review.html,roc-annual-compliance.html,services.html,social-impact.html,startup-india-certificate.html,startup-india.html,startup-tax-exemption-80iac.html,startup.html,subsidy.html,tax-calculators.html,tax-litigation.html,tds-returns.html,team.html,terms.html,tide-2-funding.html,trademark-ip.html,updates.html,videos.html,virtual-cfo.html' };
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
