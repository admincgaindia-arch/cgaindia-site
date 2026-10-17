/* CGA careers / training application form */
(function () {
  var form = document.getElementById('cgaJoinForm');
  if (!form) { return; }
  var STATES = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'];
  var sel = form.querySelector('[name=state]');
  STATES.forEach(function (s) { var o = document.createElement('option'); o.value = s; o.textContent = s; sel.appendChild(o); });
  var LIMITS = { resume: 2, photo: 1, docs: 5 };
  var OK = { resume: /\.(pdf|doc|docx)$/i, photo: /\.(jpe?g|png|webp)$/i, docs: /\.(pdf|jpe?g|png)$/i };
  var msg = document.getElementById('cgaJoinMsg');
  var btn = form.querySelector('button[type=submit]');
  function show(t, ok) { msg.innerHTML = t; msg.className = 'cj-msg ' + (ok ? 'ok' : 'err'); msg.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  function filesOk() {
    var keys = ['resume', 'photo', 'docs'];
    for (var i = 0; i < keys.length; i++) {
      var inp = form.querySelector('[name=' + keys[i] + ']');
      var fl = inp ? inp.files : [];
      var tot = 0;
      for (var j = 0; j < fl.length; j++) {
        if (!OK[keys[i]].test(fl[j].name)) { return inp.getAttribute('data-label') + ': ye file type allowed nahi hai (' + fl[j].name + ').'; }
        tot += fl[j].size;
      }
      if (tot > LIMITS[keys[i]] * 1048576) { return inp.getAttribute('data-label') + ': size ' + LIMITS[keys[i]] + ' MB se zyada hai.'; }
    }
    if (form.querySelector('[name=docs]').files.length > 3) { return 'Certificates: zyada se zyada 3 files.'; }
    return '';
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var m = form.querySelector('[name=mobile]').value.replace(/[^0-9]/g, '');
    if (m.length < 10) { show('Mobile number 10 digit ka daaliye.', false); return; }
    var fe = filesOk();
    if (fe) { show(fe, false); return; }
    var fd = new FormData(form);
    var sk = [].slice.call(form.querySelectorAll('[name=skill]:checked')).map(function (c) { return c.value; });
    fd.delete('skill');
    fd.append('skills', sk.join(', ') + (form.querySelector('[name=skills_other]').value ? (sk.length ? ', ' : '') + form.querySelector('[name=skills_other]').value : ''));
    fd.delete('skills_other');
    fd.append('page', location.pathname);
    btn.disabled = true; btn.textContent = 'Bhej rahe hain...';
    fetch('https://cga.app.n8n.cloud/webhook/cga-careers', { method: 'POST', body: fd })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || !d.ok) { throw new Error('fail'); }
        form.style.display = 'none';
        show('<b>Shukriya! Aapki application mil gayi.</b><br>Application ID: <b>' + String(d.id).replace(/</g, '') + '</b><br>Iski copy aapke email par bhi bhej di gayi hai. Shortlist hone par hamari team phone ya WhatsApp par sampark karegi.', true);
        try { if (window.gtag) { window.gtag('event', 'job_application', { apply_for: fd.get('apply_for') }); } } catch (x) {}
      })
      .catch(function () {
        btn.disabled = false; btn.textContent = 'Application bhejiye';
        show('Abhi form submit nahi ho paaya. Thodi der baad dobara try kariye, ya apna resume <a href="https://wa.me/919996647888?text=' + encodeURIComponent('Training / job application: ' + (fd.get('name') || '') + ', ' + (fd.get('city') || '') + ', ' + (fd.get('apply_for') || '')) + '" target="_blank" rel="noopener">WhatsApp par bhejiye</a>.', false);
      });
  });
})();
