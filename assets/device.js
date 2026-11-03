/* CGA Portal trusted-device helper: gives this browser a stable device id + readable name and
   attaches them to portal login (OTP) requests. Shows a one-time notice when a staff device is trusted. */
(function () {
  'use strict';
  var K = 'cga_device_id', id = '';
  try { id = localStorage.getItem(K) || ''; if (!/^d[a-z0-9]{12,40}$/.test(id)) { id = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 12); localStorage.setItem(K, id); } } catch (e) { id = ''; }
  function dname() {
    var u = navigator.userAgent || '';
    var os = /Android/.test(u) ? 'Android' : (/iPhone|iPad|iPod/.test(u) ? 'iPhone/iPad' : (/Windows/.test(u) ? 'Windows' : (/Mac OS X|Macintosh/.test(u) ? 'Mac' : (/Linux/.test(u) ? 'Linux' : 'Device'))));
    var br = /Edg\//.test(u) ? 'Edge' : (/OPR\//.test(u) ? 'Opera' : (/Chrome\//.test(u) ? 'Chrome' : (/Firefox\//.test(u) ? 'Firefox' : (/Safari\//.test(u) ? 'Safari' : 'Browser'))));
    return br + ' - ' + os;
  }
  var of = window.fetch;
  if (!of) { return; }
  window.fetch = function (url, opts) {
    try {
      var u = typeof url === 'string' ? url : (url && url.url) || '';
      if (/\/webhook\/cga-portal$/.test(u) && opts && typeof opts.body === 'string') {
        var b = JSON.parse(opts.body);
        if (b && (b.action === 'verify' || b.action === 'otp')) {
          b.device = id; b.dname = dname();
          opts = Object.assign({}, opts, { body: JSON.stringify(b) });
          var p = of.call(this, url, opts);
          if (b.action === 'verify') {
            p.then(function (r) { return r.clone().json(); }).then(function (j) {
              if (j && j.first_device) { setTimeout(function () { alert('Ye device (' + dname() + ') ab aapke CGA staff account se jud gaya hai.\n\nSuraksha ke liye: kisi naye phone / computer / browser se login karne par admin ki approval lagegi, aur aapko email aayega.'); }, 400); }
            }).catch(function () {});
          }
          return p;
        }
      }
    } catch (e) {}
    return of.apply(this, arguments);
  };
})();
