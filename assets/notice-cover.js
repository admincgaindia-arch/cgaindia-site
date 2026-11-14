/* CGA Notice Cover: plan purchase buttons */
(function () {
  [].forEach.call(document.querySelectorAll('[data-nc]'), function (b) {
    b.addEventListener('click', function () {
      var plan = b.getAttribute('data-nc'), amt = parseInt(b.getAttribute('data-amt'), 10);
      var ref = 'NC-' + Date.now().toString(36).toUpperCase();
      try { if (window.gtag) { window.gtag('event', 'begin_checkout', { item: plan, value: amt }); } } catch (e) {}
      if (window.CGAPay) { window.CGAPay.open({ service: 'Notice Cover - ' + plan + ' (12 mahine)', amount: amt, invoice: ref, tier: 'notice-cover', lockService: true }); }
      else { location.href = 'https://wa.me/919996647888?text=' + encodeURIComponent('Notice Cover ' + plan + ' lena hai'); }
    });
  });
})();
