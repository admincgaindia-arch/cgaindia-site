/* CGA lead boost (20 Nov 2026): turns readers into enquiries.
   1. An inline "free expert call" card inside the content of judgment, insight, notice and service pages.
   2. A slide-in card after the visitor has read 45% of the page or spent 35 seconds, once per session.
   Both post to the same n8n Lead Capture webhook as lead-form.js (name + mobile only), with
   a prefilled WhatsApp fallback so no enquiry is lost. */
(function () {
  'use strict';
  if (window.__cgaBoost) { return; }
  window.__cgaBoost = 1;

  var path = (location.pathname || '/').toLowerCase();
  if (/portal|client-kit|kit-staff|engagement|pay\.html|contact|book-consultation|draft|careers|associate|attendance|partner-dash|404/.test(path)) { return; }

  var ENDPOINT = 'https://cga.app.n8n.cloud/webhook/lead';
  var WA = 'https://wa.me/919996647888?text=';
  var store = function (k, v) { try { if (v === undefined) { return window.localStorage.getItem(k); } window.localStorage.setItem(k, v); } catch (e) { return null; } return null; };
  var sess = function (k, v) { try { if (v === undefined) { return window.sessionStorage.getItem(k); } window.sessionStorage.setItem(k, v); } catch (e) { return null; } return null; };
  if (store('cgaLeadDone')) { return; }

  var page = path.split('/').pop() || 'index.html';
  var h1 = document.querySelector('h1');
  var topic = ((h1 && h1.textContent) || document.title || '').replace(/\s*\|.*$/, '').replace(/\s+/g, ' ').trim().slice(0, 90);

  var kind = /\/judgments\//.test(path) ? 'judgment' : /\/insights\/|article-/.test(path) ? 'insight'
    : /notice|decoder|ais-mismatch|recovery|cheque-bounce|litigation|sarfaesi/.test(path) ? 'notice'
    : (path === '/' || /index\.html$/.test(path)) ? 'home' : 'service';
  var COPY = {
    judgment: ['Aapke case mein bhi aisa hi notice ya demand hai?', 'Is faisle ka fayda aapke case mein mil sakta hai ya nahi, hamare expert 15 minute mein bata denge. Free call.'],
    insight: ['Apni situation ke liye seedha jawab chahiye?', 'Har case ke facts alag hote hain. Naam aur number chhodiye, CGA ka expert aapko khud call karega. Free 15-minute call.'],
    notice: ['Notice ki deadline nikalne se pehle free review', 'Notice ki photo WhatsApp kariye ya number chhodiye. Hamare tax aur legal expert aaj hi call karke batayenge kya karna hai.'],
    service: ['Is kaam ki fee aur time abhi jaaniye', 'Number chhodiye, CGA ka expert 15 minute mein call karke documents, fee aur time saaf bata dega. Koi charge nahi.'],
    home: ['Tax, GST ya legal kaam? Free 15-minute call', 'Number chhodiye, CGA ka expert aapko call karega.']
  }[kind];

  var CSS = ''
    + '.cgb-card{border:1.5px solid #4bbdd8;border-radius:14px;background:#f2f9fc;padding:18px 18px 16px;margin:28px 0;font-family:inherit;color:#13303d;box-sizing:border-box}'
    + '.cgb-card *{box-sizing:border-box}'
    + '.cgb-card h3{margin:0 0 6px;font-size:1.08rem;line-height:1.35;color:#005176}'
    + '.cgb-card p{margin:0 0 12px;font-size:.93rem;line-height:1.5;color:#36515d}'
    + '.cgb-f{display:flex;flex-wrap:wrap;gap:8px}'
    + '.cgb-f input{flex:1 1 150px;min-width:0;height:44px;border:1px solid #b9d3dd;border-radius:10px;padding:0 12px;font-size:16px;background:#fff;color:#13303d}'
    + '.cgb-f button{flex:1 1 150px;height:44px;border:0;border-radius:10px;background:#005176;color:#fff;font-weight:700;font-size:15px;cursor:pointer}'
    + '.cgb-f button:disabled{opacity:.6}'
    + '.cgb-wa{display:inline-block;margin-top:10px;font-size:.88rem;color:#0a7a3c;font-weight:600;text-decoration:none}'
    + '.cgb-err{display:none;color:#b42318;font-size:.85rem;margin-top:6px}'
    + '.cgb-hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;opacity:0}'
    + '.cgb-ok{font-size:.98rem;line-height:1.5;color:#0b5a2e;font-weight:600}'
    + '#cgbSlide{position:fixed;right:16px;bottom:16px;width:min(380px,calc(100vw - 32px));z-index:9990;margin:0;box-shadow:0 12px 40px rgba(0,40,60,.25);transform:translateY(130%);transition:transform .35s ease;max-height:calc(100vh - 32px);overflow:auto}'
    + '#cgbSlide.on{transform:none}'
    + '#cgbSlide .cgb-x{position:absolute;top:6px;right:8px;border:0;background:none;font-size:22px;line-height:1;color:#5a7380;cursor:pointer;padding:6px}'
    + '@media (max-width:760px){#cgbSlide{right:12px;left:12px;width:auto;bottom:84px}}'
    + '@media print{.cgb-card{display:none!important}}';

  var form = function (id) {
    return '<form class="cgb-f" id="' + id + '" novalidate>'
      + '<input name="name" type="text" autocomplete="name" placeholder="Aapka naam" aria-label="Aapka naam">'
      + '<input name="mobile" type="tel" inputmode="numeric" autocomplete="tel" placeholder="Mobile number" aria-label="Mobile number">'
      + '<input name="company" class="cgb-hp" tabindex="-1" autocomplete="off" aria-hidden="true">'
      + '<button type="submit">Mujhe call kariye</button></form>'
      + '<div class="cgb-err"></div>'
      + '<a class="cgb-wa" target="_blank" rel="noopener" href="' + WA + encodeURIComponent('Namaste CGA, mujhe is baare mein madad chahiye: ' + topic) + '">Ya seedha WhatsApp kariye &rarr;</a>';
  };

  var wire = function (box, where) {
    var f = box.querySelector('form');
    var err = box.querySelector('.cgb-err');
    var btn = f.querySelector('button');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = f.name.value.trim(), mobile = f.mobile.value.trim();
      var digits = mobile.replace(/[^0-9]/g, '');
      if (name.length < 2) { err.textContent = 'Apna naam likh dijiye.'; err.style.display = 'block'; return; }
      if (digits.length < 10) { err.textContent = 'Sahi 10 digit mobile number likhiye.'; err.style.display = 'block'; return; }
      err.style.display = 'none';
      btn.disabled = true; btn.textContent = 'Bhej rahe hain…';
      var d = { name: name, mobile: mobile, service: kind === 'notice' ? 'Notice review' : (kind === 'judgment' ? 'Case / notice advice' : 'Free call'), message: 'Call back (' + where + '): ' + topic, company: f.company.value, page: page };
      var ended = false;
      var fin = function (ok) {
        if (ended) { return; } ended = true;
        store('cgaLeadDone', '1');
        try { if (window.gtag) { window.gtag('event', 'generate_lead', { method: 'lead_boost_' + where, page_type: kind }); } } catch (x) {}
        box.querySelector('.cgb-body').innerHTML = ok
          ? '<div class="cgb-ok">Shukriya ' + name.replace(/[<>&]/g, '') + ' ji. CGA ka expert jaldi aapko call karega (office time 10 se 7).</div>'
          : '<div class="cgb-ok">Network issue aaya. <a class="cgb-wa" style="margin:0" target="_blank" rel="noopener" href="' + WA + encodeURIComponent('Namaste CGA, main ' + name + ' (' + mobile + '). Mujhe madad chahiye: ' + topic) + '">WhatsApp par bhej dijiye &rarr;</a></div>';
      };
      var t = setTimeout(function () { fin(false); }, 12000);
      try {
        fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
          .then(function (r) { clearTimeout(t); fin(!!(r && r.ok)); })
          .catch(function () { clearTimeout(t); fin(false); });
      } catch (x) { clearTimeout(t); fin(false); }
    });
  };

  var card = function (id, inner) {
    var el = document.createElement('div');
    el.className = 'cgb-card'; el.id = id;
    el.innerHTML = inner + '<div class="cgb-body"><h3>' + COPY[0] + '</h3><p>' + COPY[1] + '</p>' + form(id + 'F') + '</div>';
    return el;
  };

  var start = function () {
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

    // 1. Inline card after the 3rd paragraph of the main content (not on the home page).
    if (kind !== 'home') {
      var root = document.querySelector('main article, article, main') || document.body;
      var ps = Array.prototype.filter.call(root.querySelectorAll('p'), function (p) {
        return p.textContent.trim().length > 80 && !p.closest('footer,nav,header,.ft,.cgl-card,#cgaLead,.az-box,.page-hero,.cgb-card,form,table');
      });
      var after = ps[2] || ps[ps.length - 1];
      if (after && after.parentNode) {
        var inl = card('cgbInline', '');
        after.parentNode.insertBefore(inl, after.nextSibling);
        wire(inl, 'inline');
      }
    }

    // 2. Slide-in card, once per session, after 45% scroll or 35 seconds.
    if (sess('cgbShown')) { return; }
    var shown = false;
    var show = function () {
      if (shown || store('cgaLeadDone') || store('cga_cpn')) { return; }
      // First visit belongs to the welcome-coupon popup in lang.js; the slide-in only follows once that was closed.
      if (!store('cga_cpn_x') || document.querySelector('.cpn-ov')) { return; }
      var vis = function (el) { if (!el) { return false; } var r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; };
      if (vis(document.getElementById('cgbInline')) || vis(document.getElementById('cgaLead')) || vis(document.querySelector('footer'))) { return; }
      shown = true; sess('cgbShown', '1');
      var sl = card('cgbSlide', '<button type="button" class="cgb-x" aria-label="Band kariye">&times;</button>');
      document.body.appendChild(sl);
      wire(sl, 'slide');
      sl.querySelector('.cgb-x').addEventListener('click', function () { sl.classList.remove('on'); setTimeout(function () { if (sl.parentNode) { sl.parentNode.removeChild(sl); } }, 400); });
      setTimeout(function () { sl.classList.add('on'); }, 30);
    };
    var onScroll = function () {
      var h = document.documentElement.scrollHeight - innerHeight;
      if (h > 0 && (window.scrollY || window.pageYOffset) / h > 0.45) { show(); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    setTimeout(show, 35000);
  };

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start); } else { start(); }
})();
