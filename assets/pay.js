/* CGA website payments (Razorpay).
   Tier cards (pay-config.js) aur pay.html dono yahi file use karte hain.
   Flow: client ek chhota form bharta hai (service + amount pehle se bhare hote hain)
   -> n8n webhook Razorpay order banata hai (notes mein service, tier, invoice)
   -> Razorpay Checkout khulta hai naam/email/mobile prefill ke saath.
   n8n 15 min baad check karta hai aur CGA ko email karta hai: PAID / FAILED / ABANDONED.
   Agar order na ban paaye to purana Razorpay Payment Button (pl_) fallback dikhta hai. */
(function () {
  'use strict';

  var ORDER_URL = 'https://cga.app.n8n.cloud/webhook/cga-pay-order';
  var CHECKOUT = 'https://checkout.razorpay.com/v1/checkout.js';
  var BUTTON_SDK = 'https://checkout.razorpay.com/v1/payment-button.js';
  var FALLBACK_BTN = 'pl_TijZaZb3LDmmgb';
  var STORE = 'cgaPayUser';

  var CSS =
    '.cga-pay{margin:12px 0 0;padding-top:12px;border-top:1px dashed var(--line,#e2e2e8)}' +
    '.cga-pay p{margin:0 0 8px;font-size:.8rem;color:var(--slate,#5a7180)}' +
    '.cga-paybtn{display:block;width:100%;box-sizing:border-box;border:0;cursor:pointer;text-align:center;' +
    'background:#005176;color:#fff;font:inherit;font-weight:700;font-size:.97rem;padding:12px 18px;border-radius:999px}' +
    '.cga-paybtn:hover{background:#003b57}.cga-paybtn small{display:block;font-weight:500;font-size:.74rem;opacity:.85}' +
    '.cga-pm{position:fixed;inset:0;z-index:9999;background:rgba(0,20,32,.55);display:flex;align-items:center;justify-content:center;padding:14px}' +
    '.cga-pm-box{background:#fff;color:#0c1b25;border-radius:14px;width:100%;max-width:430px;max-height:92vh;overflow:auto;padding:22px 22px 18px;box-shadow:0 30px 80px rgba(0,0,0,.35);position:relative;font-size:15px}' +
    '.cga-pm-box h3{margin:0 0 4px;font-size:1.2rem;color:#003b57}.cga-pm-sub{margin:0 0 14px;font-size:.85rem;color:#46626f}' +
    '.cga-pm-x{position:absolute;right:10px;top:8px;border:0;background:none;font-size:1.6rem;cursor:pointer;color:#46626f;line-height:1}' +
    '.cga-pm label{display:block;font-size:.78rem;font-weight:700;margin:0 0 3px}' +
    '.cga-pm input,.cga-pm select{width:100%;box-sizing:border-box;font:inherit;font-size:.95rem;padding:9px 11px;border:1.5px solid #c3d2da;border-radius:7px;margin:0 0 10px;background:#fff;color:#0c1b25}' +
    '.cga-pm input:focus{outline:none;border-color:#005176;box-shadow:0 0 0 3px rgba(0,81,118,.13)}' +
    '.cga-pm input[readonly]{background:#f1f7fa}' +
    '.cga-pm-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}' +
    '.cga-pm-err{color:#b3261e;font-size:.82rem;margin:0 0 8px;display:none}' +
    '.cga-pm-msg{border-radius:8px;padding:10px 12px;font-size:.88rem;margin:0 0 10px;display:none}' +
    '.cga-pm-msg.ok{background:#e8f6ee;color:#1d5c3a;display:block}.cga-pm-msg.bad{background:#fdecea;color:#8a1f17;display:block}.cga-pm-msg.info{background:#e7f5fa;color:#003b57;display:block}' +
    '.cga-pm-fine{font-size:.74rem;color:#5a7180;margin:10px 0 0;line-height:1.45}' +
    '.cga-pm-fb{text-align:center;margin:6px 0 0}';

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) { for (var k in attrs) { if (Object.prototype.hasOwnProperty.call(attrs, k)) { e.setAttribute(k, attrs[k]); } } }
    if (html != null) { e.innerHTML = html; }
    return e;
  }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  var STATES = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
  function stateOpts(sel) { return '<option value="">Select state</option>' + STATES.map(function (s) { return '<option' + (s === sel ? ' selected' : '') + '>' + s + '</option>'; }).join(''); }
  function fmt(n) { try { return Number(n).toLocaleString('en-IN'); } catch (e) { return String(n); } }
  function page() { return (location.pathname || '').split('/').pop() || 'index.html'; }
  function pageName() {
    var t = (document.title || '').split('|')[0].split(' \u2014 ')[0].trim();
    return t || 'CGA service';
  }
  function saved() { try { return JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) { return {}; } }
  function save(d) { try { localStorage.setItem(STORE, JSON.stringify({ name: d.name, mobile: d.mobile, email: d.email, state: d.state, gstin: d.gstin })); } catch (e) { /* storage off */ } }

  var cssDone = false;
  function addCss() {
    if (cssDone) { return; }
    cssDone = true;
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  var sdkPromise = null;
  function loadCheckout() {
    if (window.Razorpay) { return Promise.resolve(); }
    if (sdkPromise) { return sdkPromise; }
    sdkPromise = new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = CHECKOUT;
      s.onload = function () { res(); };
      s.onerror = function () { sdkPromise = null; rej(new Error('checkout load failed')); };
      document.head.appendChild(s);
    });
    return sdkPromise;
  }

  function fallbackButton(box) {
    var wrap = el('div', { 'class': 'cga-pm-fb' });
    var form = document.createElement('form');
    var s = document.createElement('script');
    s.src = BUTTON_SDK;
    s.async = false;
    s.setAttribute('data-payment_button_id', FALLBACK_BTN);
    form.appendChild(s);
    wrap.appendChild(form);
    box.appendChild(wrap);
  }

  /* opts: { service, tier, amount, invoice, lockService } */
  function openPay(opts) {
    addCss();
    opts = opts || {};
    var u = saved();
    var amt = opts.amount ? String(opts.amount) : '';
    var ov = el('div', { 'class': 'cga-pm', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Online payment' });
    var box = el('div', { 'class': 'cga-pm-box' });
    box.innerHTML =
      '<button type="button" class="cga-pm-x" aria-label="Band kariye">&times;</button>' +
      '<h3>Online payment</h3>' +
      '<p class="cga-pm-sub">Card, UPI, netbanking, wallet ya EMI &mdash; Razorpay secure checkout.</p>' +
      '<div class="cga-pm-msg" data-msg></div>' +
      '<form novalidate data-f>' +
      '<label for="cpSvc">Service</label><input id="cpSvc" name="service" value="' + esc(opts.service || '') + '"' + (opts.lockService ? ' readonly' : ' placeholder="Jaise ITR filing, GST return"') + '>' +
      '<div class="cga-pm-row"><div><label for="cpAmt">Amount (&#8377;)</label><input id="cpAmt" name="amount" inputmode="numeric" value="' + esc(amt) + '" placeholder="Jaise 5900"></div>' +
      '<div><label for="cpInv">Invoice / Ref no.</label><input id="cpInv" name="invoice" value="' + esc(opts.invoice || '') + '" placeholder="Optional"></div></div>' +
      '<label for="cpName">Aapka naam / firm</label><input id="cpName" name="name" autocomplete="name" value="' + esc(u.name || '') + '">' +
      '<div class="cga-pm-row"><div><label for="cpMob">Mobile</label><input id="cpMob" name="mobile" type="tel" inputmode="numeric" autocomplete="tel" value="' + esc(u.mobile || '') + '"></div>' +
      '<div><label for="cpMail">Email</label><input id="cpMail" name="email" type="email" autocomplete="email" value="' + esc(u.email || '') + '"></div></div>' +
      '<div class="cga-pm-row"><div><label for="cpState">State</label><select id="cpState" name="state">' + stateOpts(u.state || '') + '</select></div>' +
      '<div><label for="cpGst">GSTIN (optional)</label><input id="cpGst" name="gstin" maxlength="15" value="' + esc(u.gstin || '') + '" placeholder="Business ho to"></div></div>' +
      '<p class="cga-pm-err" data-err></p>' +
      '<button type="submit" class="cga-paybtn" data-go>Aage badhiye &mdash; pay kariye</button>' +
      '</form>' +
      '<p class="cga-pm-fine">Payment Canjain Global Advisors Pvt Ltd ke Razorpay account mein jaata hai. Receipt email par aati hai, GST invoice CGA alag se bhejta hai. <a href="refund.html">Refund policy</a></p>';
    ov.appendChild(box);
    document.body.appendChild(ov);

    var f = box.querySelector('[data-f]');
    var msg = box.querySelector('[data-msg]');
    var err = box.querySelector('[data-err]');
    var go = box.querySelector('[data-go]');
    function close() { if (ov.parentNode) { ov.parentNode.removeChild(ov); } }
    function say(cls, html) { msg.className = 'cga-pm-msg ' + cls; msg.innerHTML = html; }
    box.querySelector('.cga-pm-x').addEventListener('click', close);
    ov.addEventListener('click', function (e) { if (e.target === ov) { close(); } });
    setTimeout(function () { var t = !amt ? '#cpAmt' : (!u.name ? '#cpName' : '[data-go]'); var x = box.querySelector(t); if (x) { x.focus(); } }, 50);

    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (n) { var x = f.querySelector('[name="' + n + '"]'); return x ? x.value.trim() : ''; };
      var d = {
        service: v('service') || pageName(),
        amount: Math.round(Number(v('amount').replace(/[^0-9.]/g, ''))),
        invoice: v('invoice'),
        name: v('name'),
        mobile: v('mobile').replace(/[^0-9+]/g, ''),
        email: v('email'),
        gstin: v('gstin').toUpperCase().replace(/[^0-9A-Z]/g, ''),
        state: v('state'),
        tier: opts.tier || '',
        page: location.pathname
      };
      var problems = [];
      if (!(d.amount >= 1)) { problems.push('amount'); }
      if (d.name.length < 2) { problems.push('naam'); }
      if (d.mobile.replace(/[^0-9]/g, '').length < 10) { problems.push('10 digit mobile'); }
      if (d.gstin && d.gstin.length !== 15) { problems.push('sahi 15-digit GSTIN'); }
      if (d.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) { problems.push('sahi email'); }
      if (problems.length) { err.textContent = 'Kripya ' + problems.join(', ') + ' bhariye.'; err.style.display = 'block'; return; }
      err.style.display = 'none';
      save(d);
      go.disabled = true;
      go.textContent = 'Ek second...';

      var fail = function () {
        go.style.display = 'none';
        say('info', 'Neeche <b>Pay Now</b> dabaiye aur &#8377;' + fmt(d.amount) + ' bhariye. Service mein &ldquo;' + esc(d.service) + (d.invoice ? ' / ' + esc(d.invoice) : '') + '&rdquo; likhiye.');
        f.style.display = 'none';
        fallbackButton(box);
      };

      fetch(ORDER_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
        .then(function (r) { return r.json(); })
        .then(function (o) {
          if (!o || !o.live || !o.order_id || !o.key_id) { fail(); return; }
          return loadCheckout().then(function () {
            var rzp = new window.Razorpay({
              key: o.key_id,
              order_id: o.order_id,
              amount: d.amount * 100,
              currency: 'INR',
              name: 'Canjain Global Advisors',
              description: (d.service + (d.tier ? ' (' + d.tier + ')' : '')).slice(0, 250),
              image: 'https://cgaindia.com/assets/icon-512.png',
              prefill: { name: d.name, email: d.email, contact: d.mobile },
              notes: { service: d.service, tier: d.tier, invoice: d.invoice, page: d.page },
              theme: { color: '#005176' },
              handler: function (resp) {
                f.style.display = 'none';
                say('ok', '<b>Payment ho gaya, shukriya!</b><br>Payment ID: ' + esc(resp.razorpay_payment_id) + '<br>Receipt aapke email par aa rahi hai. CGA team jaldi confirm karegi.');
              },
              modal: {
                ondismiss: function () {
                  go.disabled = false;
                  go.textContent = 'Dobara try kariye';
                  say('bad', 'Payment complete nahi hua. Dobara try kar sakte hain, ya WhatsApp kariye: <a href="https://wa.me/919996647888?text=PAYMENT" target="_blank" rel="noopener">+91 99966 47888</a>');
                }
              }
            });
            rzp.on('payment.failed', function (r) {
              var reason = (r && r.error && (r.error.description || r.error.reason)) || 'Payment fail hua';
              say('bad', 'Payment fail hua: ' + esc(reason) + '. Doosra card / UPI try kariye.');
            });
            rzp.open();
          });
        })
        .catch(function () { fail(); });
    });
  }

  window.CGAPay = { open: openPay };

  function mountCard(card, raw, code) {
    var bar = String(raw).indexOf('|');
    var amount = bar === -1 ? '' : String(raw).slice(bar + 1).trim();
    var title = card.querySelector('h3');
    var tierName = title ? title.textContent.trim() : '';
    var box = el('div', { 'class': 'cga-pay' });
    box.appendChild(el('p', null, amount
      ? 'Ya advance &#8377;' + fmt(amount) + ' abhi online pay kariye &mdash; baaki scope dekhne ke baad'
      : 'Quote ya invoice mil gaya? Fees yahin se online pay kariye'));
    var btn = el('button', { type: 'button', 'class': 'cga-paybtn' },
      (amount ? '&#8377;' + fmt(amount) + ' online pay kariye' : 'Online pay kariye') + '<small>Card &middot; UPI &middot; Netbanking &middot; EMI</small>');
    btn.addEventListener('click', function () {
      openPay({ service: pageName() + (tierName ? ' \u2014 ' + tierName : ''), tier: code, amount: amount, lockService: true });
    });
    box.appendChild(btn);
    card.appendChild(box);
  }

  function start() {
    var cfg = window.CGA_PAY || {};
    var cards = document.querySelectorAll('.tier');
    var p = page();
    for (var i = 0; i < cards.length; i++) {
      var codeEl = cards[i].querySelector('.tier-code');
      if (!codeEl) { continue; }
      var code = (codeEl.textContent || '').trim();
      var id = cfg[p + ':' + code];
      if (!id) { continue; }
      addCss();
      mountCard(cards[i], id, code);
    }

    var openers = document.querySelectorAll('[data-cga-pay-open]');
    if (openers.length) { addCss(); }
    for (var j = 0; j < openers.length; j++) {
      openers[j].addEventListener('click', function (e) {
        e.preventDefault();
        var t = e.currentTarget;
        openPay({ service: t.getAttribute('data-service') || '', amount: t.getAttribute('data-amount') || '', invoice: t.getAttribute('data-invoice') || '' });
      });
    }

    /* Payment link jo team WhatsApp par bhej sakti hai:
       cgaindia.com/pay.html?amt=5900&svc=ITR%20Filing&inv=CGA-123  -> form pehle se bhara khulta hai */
    try {
      var q = new URLSearchParams(location.search);
      if (q.get('amt') || q.get('svc') || q.get('inv')) {
        openPay({ amount: (q.get('amt') || '').replace(/[^0-9]/g, ''), service: q.get('svc') || '', invoice: q.get('inv') || '', lockService: !!q.get('svc') });
      }
    } catch (e) { /* old browser */ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
