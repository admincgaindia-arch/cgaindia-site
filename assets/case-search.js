/* CGA Case Law Search over judgments/manifest.json */
(function () {
  'use strict';
  var app = document.getElementById('csApp'); if (!app) { return; }
  var ALL = [], shown = 30;
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function kind(c) { c = String(c || ''); if (/supreme/i.test(c)) { return 'Supreme Court'; } if (/high court/i.test(c)) { return 'High Court'; } if (/itat|tribunal|cestat|nclat|nclt|appellate/i.test(c)) { return 'Tribunal'; } return 'Other'; }
  function $(id) { return document.getElementById(id); }
  function render() {
    var q = ($('csQ').value || '').toLowerCase().trim(), law = $('csLaw').value, ct = $('csCourt').value, yr = $('csYear').value;
    var words = q ? q.split(' ').filter(Boolean) : [];
    var list = ALL.filter(function (x) {
      if (law && x.law !== law) { return false; } if (ct && x.kind !== ct) { return false; } if (yr && String(x.date).slice(0, 4) !== yr) { return false; }
      var hay = (x.t + ' ' + x.court + ' ' + x.law + ' ' + x.section).toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) >= 0; });
    });
    $('csCount').textContent = list.length + ' judgments';
    $('csList').innerHTML = list.slice(0, shown).map(function (x) { return '<a class="cs-i" href="judgments/' + esc(x.slug) + '.html"><b>' + esc(x.t) + '</b><span>' + esc(x.court) + ' &middot; ' + esc(x.law) + (x.section ? ' &middot; ' + esc(x.section) : '') + ' &middot; ' + esc(x.date) + '</span></a>'; }).join('') + (list.length > shown ? '<button type="button" class="btn cs-more" id="csMore">Aur dikhaiye (' + (list.length - shown) + ')</button>' : '') + (list.length ? '' : '<p class="cs-m">Koi judgment nahi mila. Shabd badal kar dekhiye.</p>');
    var mb = $('csMore'); if (mb) { mb.onclick = function () { shown += 30; render(); }; }
  }
  fetch('judgments/manifest.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (m) {
    var it = m.items || {};
    ALL = Object.keys(it).map(function (k) { var x = it[k]; return { slug: k, t: x.t || k, court: x.court || '', law: x.law || '', section: x.section || '', date: x.date || '', kind: kind(x.court) }; }).sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
    var laws = {}, yrs = {}; ALL.forEach(function (x) { if (x.law) { laws[x.law] = 1; } if (x.date) { yrs[String(x.date).slice(0, 4)] = 1; } });
    $('csLaw').innerHTML = '<option value="">Sab kanoon</option>' + Object.keys(laws).sort().map(function (l) { return '<option>' + esc(l) + '</option>'; }).join('');
    $('csYear').innerHTML = '<option value="">Sab saal</option>' + Object.keys(yrs).sort().reverse().map(function (y) { return '<option>' + y + '</option>'; }).join('');
    ['csQ', 'csLaw', 'csCourt', 'csYear'].forEach(function (id) { $(id).addEventListener('input', function () { shown = 30; render(); }); $(id).addEventListener('change', function () { shown = 30; render(); }); });
    var q0 = new URLSearchParams(location.search).get('q'); if (q0) { $('csQ').value = q0; }
    render();
  }).catch(function () { $('csList').innerHTML = '<p class="cs-m">Judgments load nahi ho paaye. Page refresh kariye.</p>'; });
})();
