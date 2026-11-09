/* CGA templates store: opens Razorpay (pay.js) with the template code locked in the service name. */
(function () {
  'use strict';
  function msg(t) { var m = document.getElementById('tpMsg'); if (m) { m.textContent = t; } }
  Array.prototype.forEach.call(document.querySelectorAll('[data-tpl]'), function (b) {
    b.addEventListener('click', function () {
      var code = b.getAttribute('data-tpl'), name = b.getAttribute('data-name'), amt = Number(b.getAttribute('data-amt'));
      if (window.CGAPay && window.CGAPay.open) {
        window.CGAPay.open({ service: 'Template ' + code + ': ' + name, amount: amt, invoice: code, tier: code, lockService: true });
        msg('Payment form mein apna email zaroor daaliye - template ka link usi par aayega.');
      } else {
        location.href = 'https://wa.me/919996647888?text=' + encodeURIComponent('Mujhe template chahiye: ' + code + ' ' + name + ' (Rs ' + amt + ')');
      }
    });
  });
})();
