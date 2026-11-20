/* CGA Refer & Earn (20 Nov 2026)
   - Every coupon owner gets a personal share link (cgaindia.com/?ref=CODE).
   - 3 different people opening that link upgrade the coupon from 10% (max Rs 500) to 15% (max Rs 1,000) + 30 more days.
   - A friend who comes through the link and pays online earns the sharer Rs 500 referral credit.
   Backend: n8n webhook cga-coupon-x (actions visit / status / check / paid). */
(function () {
  'use strict';
  if (window.CGARewards) { return; }
  var API = 'https://cga.app.n8n.cloud/webhook/cga-coupon-x';
  var SITE = 'https://cgaindia.com/';
  var get = function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } };
  var set = function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} };
  var post = function (d) { return fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }).then(function (r) { return r.json(); }); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var mine = function () { try { var c = JSON.parse(get('cga_cpn') || 'null'); return c && c.code ? c : null; } catch (e) { return null; } };
  var vid = function () { var v = get('cga_vid'); if (!v) { v = Math.random().toString(36).slice(2) + Date.now().toString(36); set('cga_vid', v); } return v; };
  var path = location.pathname || '/';
  if (/(portal|client-kit|kit-staff|engagement|attendance)\.html$/.test(path)) { return; }

  /* 1. Arriving through someone's share link */
  try {
    var q = new URLSearchParams(location.search);
    var ref = String(q.get('ref') || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);
    var own = mine();
    if (ref && /^CGA[A-Z0-9]{4,8}$/.test(ref) && !(own && own.code === ref)) {
      set('cga_ref', JSON.stringify({ code: ref, at: Date.now() }));
      if (!get('cga_refv_' + ref)) { set('cga_refv_' + ref, '1'); post({ action: 'visit', code: ref, vid: vid(), page: path }).catch(function () {}); }
    }
  } catch (e) {}
  window.CGA_REF = function () { try { var r = JSON.parse(get('cga_ref') || 'null'); return r && Date.now() - r.at < 60 * 864e5 ? r.code : ''; } catch (e) { return ''; } };

  /* 2. Owner panel */
  var CSS = ''
    + '.rw-ov{position:fixed;inset:0;z-index:2147483646;background:rgba(0,26,40,.55);display:flex;align-items:center;justify-content:center;padding:16px}'
    + '.rw-box{position:relative;width:min(440px,100%);max-height:calc(100vh - 32px);overflow:auto;background:#fff;border-radius:20px;box-shadow:0 30px 80px -20px rgba(0,0,0,.5);font-family:inherit;color:#13303d}'
    + '.rw-top{background:linear-gradient(135deg,#00293d,#005176);color:#fff;padding:20px 22px 16px;text-align:center}'
    + '.rw-top small{display:block;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:#7fd3e8;font-weight:700}'
    + '.rw-top b{display:block;font-size:1.9rem;line-height:1.15;margin:6px 0 2px;color:#e8a317}'
    + '.rw-top span{font-size:.92rem;color:#d8eef6}'
    + '.rw-x{position:absolute;top:10px;right:12px;border:0;background:rgba(255,255,255,.15);color:#fff;width:30px;height:30px;border-radius:50%;font-size:18px;line-height:30px;cursor:pointer;padding:0}'
    + '.rw-b{padding:16px 22px 20px}.rw-b p{margin:0 0 10px;font-size:.92rem;line-height:1.5}'
    + '.rw-steps{display:flex;gap:8px;margin:6px 0 12px}.rw-steps i{flex:1;height:10px;border-radius:6px;background:#e3edf2}.rw-steps i.on{background:#1d9b5c}'
    + '.rw-link{display:flex;gap:8px;align-items:center;border:1.5px dashed #4bbdd8;border-radius:10px;padding:9px 10px;margin:8px 0;font-size:.85rem;word-break:break-all;background:#f4fafc}'
    + '.rw-link button{flex:none;border:0;background:#00293d;color:#fff;border-radius:8px;padding:7px 10px;font:inherit;font-size:.8rem;cursor:pointer}'
    + '.rw-btn{display:block;width:100%;box-sizing:border-box;border:0;border-radius:999px;padding:12px;font:inherit;font-weight:700;font-size:.98rem;text-align:center;text-decoration:none;cursor:pointer;margin-top:8px}'
    + '.rw-wa{background:#25d366;color:#fff}.rw-sh{background:#005176;color:#fff}'
    + '.rw-in{width:100%;box-sizing:border-box;border:1px solid #c9dbe4;border-radius:10px;padding:10px 12px;font:inherit;font-size:1rem;margin:4px 0 8px}'
    + '.rw-t{font-size:.72rem!important;color:#6b8290!important;margin-top:12px!important}'
    + '.rw-ok{background:#eefaf3;color:#0b5a2e;border-radius:10px;padding:9px 12px;font-weight:600}'
    + '#rwChip{position:fixed;left:14px;bottom:96px;z-index:9980;border:0;border-radius:999px;background:#e8a317;color:#00293d;font:inherit;font-weight:700;font-size:.84rem;padding:9px 14px;box-shadow:0 8px 22px rgba(0,0,0,.22);cursor:pointer}'
    + '@media (max-width:760px){#rwChip{bottom:150px;left:10px;font-size:.8rem;padding:8px 12px}}'
    + '@media print{#rwChip,.rw-ov{display:none!important}}';
  var styled = false;
  var addCss = function () { if (styled) { return; } styled = true; var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s); };

  var open = function () {
    addCss();
    var c = mine();
    var ov = document.createElement('div');
    ov.className = 'rw-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Refer and earn');
    ov.innerHTML = '<div class="rw-box"><button type="button" class="rw-x" aria-label="Band kariye">&times;</button><div class="rw-top"><small>Refer &amp; Earn</small><b>10% se 15% OFF</b><span>3 dost link kholein to coupon upgrade &middot; dost client bane to &#8377;500 credit</span></div><div class="rw-b">Loading&hellip;</div></div>';
    document.body.appendChild(ov);
    var shut = function () { if (ov.parentNode) { ov.parentNode.removeChild(ov); } };
    ov.querySelector('.rw-x').addEventListener('click', shut);
    ov.addEventListener('click', function (e) { if (e.target === ov) { shut(); } });
    var body = ov.querySelector('.rw-b');
    if (!c) {
      body.innerHTML = '<p>Pehle apna free welcome coupon lijiye (mobile number se, 10 second).</p><a class="rw-btn rw-sh" href="' + SITE + 'services.html?coupon=1">Coupon paiye</a>';
      return;
    }
    var render = function (s) {
      var link = SITE + '?ref=' + c.code;
      var n = Math.min(Number(s.visits || 0), Number(s.need || 3)), need = Number(s.need || 3);
      var steps = ''; for (var i = 0; i < need; i++) { steps += '<i class="' + (i < n ? 'on' : '') + '"></i>'; }
      var msg = 'Main CGA (Canjain Global Advisors) se GST, Income Tax, company registration aur legal kaam karwata hoon. Achhe aur bharosemand log hain. Aap bhi dekhiye, is link se aane par aapko bhi welcome discount milega: ' + link;
      body.innerHTML = '<p>Aapka coupon: <b>' + esc(c.code) + '</b> &middot; abhi <b>' + esc(s.pct || 10) + '% OFF</b> (max &#8377;' + esc(s.max || 500) + ')' + (s.expires_on ? ' &middot; valid ' + esc(s.expires_on) + ' tak' : '') + '</p>'
        + (s.tier === 'PLUS' ? '<p class="rw-ok">Upgrade ho gaya! Aapka coupon ab 15% OFF (max &#8377;1,000) hai.</p>' : '<p><b>' + n + ' / ' + need + '</b> dost aapke link se aa chuke hain. ' + (need - n) + ' aur aayein to coupon 15% ho jayega.</p><div class="rw-steps">' + steps + '</div>')
        + (Number(s.credit || 0) > 0 ? '<p class="rw-ok">Referral credit: &#8377;' + esc(s.credit) + ' (agle online payment mein apne aap lagega)</p>' : '')
        + '<div class="rw-link"><span>' + esc(link) + '</span><button type="button" data-cp>Copy</button></div>'
        + '<a class="rw-btn rw-wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(msg) + '">WhatsApp par share kariye</a>'
        + (navigator.share ? '<button type="button" class="rw-btn rw-sh" data-sh>Aur apps mein share kariye</button>' : '')
        + '<p class="rw-t">Ek dost ek hi baar gina jata hai. Aapke link se aaya dost online payment karta hai to aapko &#8377;500 credit milta hai. Credit aur coupon government fee, stamp duty, audit aur UDIN certificate par lagu nahi. Coupon online payment ke form mein ya WhatsApp / call par order karte waqt bataiye.</p>';
      var cp = body.querySelector('[data-cp]');
      cp.addEventListener('click', function () { try { navigator.clipboard.writeText(link); cp.textContent = 'Copied'; } catch (x) { cp.textContent = 'Copy nahi hua'; } });
      var sh = body.querySelector('[data-sh]');
      if (sh) { sh.addEventListener('click', function () { navigator.share({ title: 'CGA India', text: msg, url: link }).catch(function () {}); }); }
      try { if (window.gtag) { window.gtag('event', 'refer_open', { tier: s.tier || 'BASE' }); } } catch (x) {}
    };
    var ask = function (why) {
      body.innerHTML = '<p>' + (why || 'Apna coupon status dekhne ke liye wahi mobile number daaliye jis par coupon liya tha.') + '</p><input class="rw-in" type="tel" inputmode="numeric" maxlength="13" placeholder="Mobile number"><button type="button" class="rw-btn rw-sh">Status dekhiye</button>';
      var inp = body.querySelector('input');
      body.querySelector('button').addEventListener('click', function () {
        var m = inp.value.replace(/[^0-9]/g, '').slice(-10);
        if (m.length !== 10) { inp.focus(); return; }
        c.m = m; set('cga_cpn', JSON.stringify(c)); load();
      });
    };
    var load = function () {
      if (!c.m) { ask(); return; }
      post({ action: 'status', code: c.code, mobile: c.m }).then(function (s) {
        if (s && s.ok) { render(s); } else { ask('Ye number is coupon se match nahi hua. Coupon wala mobile number daaliye.'); }
      }).catch(function () { render({ pct: 10, max: 500, visits: 0, need: 3 }); });
    };
    load();
  };
  window.CGARewards = { open: open };

  /* 3. Small "Refer & Earn" chip for coupon owners, and #refer deep link */
  var start = function () {
    if (/#refer/.test(location.hash)) { open(); }
    if (!mine() || /(pay|client-kit)\.html$/.test(path)) { return; }
    addCss();
    var b = document.createElement('button');
    b.id = 'rwChip'; b.type = 'button'; b.textContent = 'Refer & Earn: 15% OFF';
    b.addEventListener('click', open);
    document.body.appendChild(b);
  };
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start); } else { start(); }
})();
