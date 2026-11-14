/* CGA Recovery Desk: unpaid invoice / cheque bounce intake -> enquiry + legal notice payment */
(function () {
  var box = document.getElementById('rdApp');
  if (!box) { return; }
  var API = 'https://cga.app.n8n.cloud/webhook/cga-enquiry';
  function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function inr(x) { return '₹' + Math.round(x).toLocaleString('en-IN'); }
  var today = new Date(Date.now() + 19800000).toISOString().slice(0, 10);
  box.innerHTML = '<form class="rd-card" id="rdForm" novalidate><input class="rd-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">'
    + '<h2>1. Aapki details</h2><div class="rd-g">'
    + '<div><label>Aapka naam *</label><input name="name" maxlength="80" autocomplete="name"></div>'
    + '<div><label>Business / firm ka naam</label><input name="firm" maxlength="100"></div>'
    + '<div><label>Mobile (10 digit) *</label><input name="mobile" type="tel" inputmode="numeric" maxlength="14" autocomplete="tel"></div>'
    + '<div><label>Email *</label><input name="email" type="email" maxlength="120" autocomplete="email"></div>'
    + '<div><label>City</label><input name="city" maxlength="60"></div>'
    + '<div><label>Udyam (MSME) registration hai?</label><select name="udyam"><option value="">Chuniye</option><option value="micro-small">Haan, Micro ya Small</option><option value="medium">Haan, Medium</option><option value="no">Nahi</option><option value="unknown">Pata nahi</option></select></div></div>'
    + '<h2>2. Jisse paisa lena hai</h2><div class="rd-g">'
    + '<div><label>Party ka naam *</label><input name="debtor" maxlength="100"></div>'
    + '<div><label>Party ka shehar</label><input name="dcity" maxlength="60"></div>'
    + '<div><label>Kul baaki raqam (₹) *</label><input name="amount" inputmode="decimal" maxlength="14"></div>'
    + '<div><label>Sabse purani unpaid invoice ki date *</label><input name="invdate" type="date" max="' + today + '"></div>'
    + '<div><label>Cheque bounce hua hai?</label><select name="cheque"><option value="no">Nahi</option><option value="yes">Haan</option></select></div>'
    + '<div class="rd-chq" style="display:none"><label>Bank ka return memo kab mila?</label><input name="memodate" type="date" max="' + today + '"></div>'
    + '<div class="rd-full"><label>Kuch aur batana hai?</label><textarea name="notes" rows="2" maxlength="600" placeholder="Jaise: party ne likhit mein maana hai, aadha paisa aa chuka hai, koi agreement hai"></textarea></div></div>'
    + '<label class="rd-decl"><input type="checkbox" name="ok"> <span>Main maanta/maanti hun ki di gayi jaankari sahi hai aur CGA team mujhse call/WhatsApp par sampark kar sakti hai.</span></label>'
    + '<button type="submit" class="btn btn-gold">Mera case check kariye</button><p class="rd-msg" role="status" aria-live="polite"></p></form><div id="rdOut"></div>';
  var f = document.getElementById('rdForm');
  f.cheque.addEventListener('change', function () { box.querySelector('.rd-chq').style.display = f.cheque.value === 'yes' ? '' : 'none'; });
  function days(d) { if (!d) { return null; } var t = Date.parse(d + 'T00:00:00+05:30'); return isFinite(t) ? Math.floor((Date.now() - t) / 86400000) : null; }
  f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var msg = f.querySelector('.rd-msg');
    var mob = String(f.mobile.value).replace(/[^0-9]/g, '').slice(-10);
    var amt = parseFloat(String(f.amount.value).replace(/[^0-9.]/g, '')) || 0;
    if (f.name.value.trim().length < 2 || !/^[6-9][0-9]{9}$/.test(mob) || !/^[^@ ]+@[^@ ]+[.][^@ ]+$/.test(f.email.value.trim()) || f.debtor.value.trim().length < 2 || amt <= 0 || !f.invdate.value || !f.ok.checked) {
      msg.className = 'rd-msg err'; msg.textContent = 'Naam, mobile, email, party ka naam, raqam, invoice date aur sahmati ka tick zaroori hai.'; return;
    }
    var dInv = days(f.invdate.value), cheque = f.cheque.value === 'yes', dMemo = cheque ? days(f.memodate.value) : null;
    var routes = [];
    if (cheque) {
      if (dMemo !== null && dMemo <= 30) { routes.push(['hot', 'Cheque bounce notice (NI Act dhara 138)', 'Return memo mile ' + dMemo + ' din hue hain. Demand notice 30 din ke andar bhejna zaroori hai, yani aapke paas ' + (30 - dMemo) + ' din bache hain. Turant shuru kariye.']); }
      else if (dMemo !== null) { routes.push(['warn', 'Cheque bounce: 30 din nikal chuke hain', 'Return memo ke 30 din baad dhara 138 ka notice ka raasta band ho sakta hai. Civil recovery ya doosre raaste par advocate se baat kariye.']); }
      else { routes.push(['warn', 'Cheque bounce', 'Return memo ki date bataiye. Dhara 138 ka notice memo milne ke 30 din ke andar jaana chahiye.']); }
    }
    if (f.udyam.value === 'micro-small' && dInv !== null && dInv > 45) { routes.push(['hot', 'MSME Samadhaan (MSMED Act)', 'Micro/Small supplier ko 45 din se zyada deri par buyer se compound interest maangne ka haq hai, aur MSME Samadhaan portal par case daala ja sakta hai. Invoice ' + dInv + ' din purani hai.']); }
    routes.push(['base', 'Legal notice: ₹999 (GST sahit)', 'Advocate ka drafted demand notice, aapke documents milne ke 1 working day mein. Zyadatar maamle notice ke baad hi settle ho jaate hain.']);
    routes.push(['base', 'GST aur tax ka hissa (CA team)', 'Jo paisa nahi mila, uska GST already bhar diya hai to uska hisaab, aur bad debt ka income tax treatment: CGA ki CA team dekhegi.']);
    var body = { kind: 'enquiry', name: f.name.value.trim(), mobile: mob, email: f.email.value.trim().toLowerCase(), city: f.city.value.trim(), service: '', service_name: 'Recovery Desk' + (cheque ? ' - cheque bounce' : '') + ' - ' + inr(amt), website: f.website.value, page: location.pathname,
      message: 'Firm: ' + f.firm.value.trim() + ' | Party: ' + f.debtor.value.trim() + (f.dcity.value ? ' (' + f.dcity.value.trim() + ')' : '') + ' | Amount: ' + inr(amt) + ' | Oldest invoice: ' + f.invdate.value + ' (' + dInv + ' din) | Udyam: ' + (f.udyam.value || '-') + ' | Cheque bounce: ' + (cheque ? 'haan, memo ' + (f.memodate.value || '-') : 'nahi') + ' | Notes: ' + f.notes.value.trim() };
    var b = f.querySelector('button[type=submit]'); b.disabled = true; msg.className = 'rd-msg'; msg.textContent = 'Check ho raha hai...';
    var ref = 'RD-' + Date.now().toString(36).toUpperCase();
    function show(saved) {
      b.disabled = false; msg.textContent = '';
      var wa = 'https://wa.me/919996647888?text=' + encodeURIComponent('Recovery Desk ' + ref + ': ' + body.name + ', party ' + f.debtor.value.trim() + ', ' + inr(amt) + '. Invoice copies bhej raha/rahi hun.');
      document.getElementById('rdOut').innerHTML = '<div class="rd-card rd-res"><p class="eyebrow">Aapke case ke raaste</p><h2>' + esc(f.debtor.value.trim()) + ' se ' + inr(amt) + ' ki recovery</h2>'
        + routes.map(function (r) { return '<div class="rd-route rd-' + r[0] + '"><b>' + esc(r[1]) + '</b><p>' + esc(r[2]) + '</p></div>'; }).join('')
        + '<div class="rd-cta"><button type="button" class="btn btn-gold" id="rdPay">Legal notice shuru kariye: ₹999</button><a class="btn btn-ghost" href="' + wa + '" target="_blank" rel="noopener">WhatsApp par invoice bhejiye</a></div>'
        + '<p class="rd-fine">' + (saved ? 'Aapki details team ko mil gayi hain. Team 1 working day mein call karegi. ' : '') + 'Ref: ' + ref + '. Ye shuruaati jaankari hai, kanooni raay aapke documents dekh kar hi di jaati hai.</p></div>';
      document.getElementById('rdPay').addEventListener('click', function () {
        if (window.CGAPay) { window.CGAPay.open({ service: 'Recovery Desk legal notice - ' + f.debtor.value.trim().slice(0, 40), amount: 999, invoice: ref, tier: 'recovery', lockService: true }); } else { location.href = wa; }
      });
      try { if (window.gtag) { window.gtag('event', 'generate_lead', { method: 'recovery_desk' }); } } catch (e) {}
      document.getElementById('rdOut').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(function (r) { return r.json(); }).then(function (r) { show(!!(r && r.ok)); }).catch(function () { show(false); });
  });
})();
