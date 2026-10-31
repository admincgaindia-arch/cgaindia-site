/* CGA Document Locker: adds a Documents section to the client/staff/admin portal.
   Reads the portal session from localStorage and talks to its own n8n API.
   Files are kept in a private Google Drive folder; every download is checked server-side. */
(function () {
  var API = 'https://cga.app.n8n.cloud/webhook/cga-portal-docs';
  var KEY = 'cga_portal_session';
  var MAX = 8 * 1024 * 1024;
  var app = document.getElementById('cp-app');
  if (!app) { return; }
  var C = null, loading = false, q = '', open = false, flash = null;

  var css = document.createElement('style');
  css.textContent = '#cp-locker .lk-h{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:.6rem}' +
    '#cp-locker h2{margin:0;font-size:1.15rem}' +
    '#cp-locker .lk-grp{margin:1rem 0 .3rem;font-weight:700;color:var(--cp-navy);font-size:.92rem}' +
    '#cp-locker .lk-doc{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:.5rem;border:1px solid var(--cp-line);border-radius:10px;padding:.7rem .85rem;margin:0 0 .5rem;background:#fff}' +
    '#cp-locker .lk-doc b{display:block;font-size:.95rem;color:#1d2a33;word-break:break-word}' +
    '#cp-locker .lk-ic{display:inline-block;width:2.1rem;height:2.1rem;line-height:2.1rem;text-align:center;border-radius:8px;background:#e3f3f9;color:var(--cp-navy);font-weight:800;font-size:.62rem;margin-right:.6rem;vertical-align:middle;flex:none}' +
    '#cp-locker .lk-l{display:flex;align-items:center;min-width:0;flex:1 1 15rem}' +
    '#cp-locker .lk-cat{display:inline-block;padding:.1rem .5rem;border-radius:999px;background:#eef4f7;color:var(--cp-navy);font-size:.7rem;font-weight:700;margin-right:.35rem}' +
    '#cp-locker .lk-cat.ack{background:#e6f6ec;color:#17773f}#cp-locker .lk-cat.cli{background:#fff4e0;color:#8a5a00}' +
    '#cp-locker .lk-up{background:#f6fafc;border:1px dashed #c9d6de;border-radius:12px;padding:.9rem 1rem;margin:.9rem 0 0}' +
    '#cp-locker .lk-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0 .8rem}' +
    '#cp-locker .lk-empty{background:#f6fafc;border-radius:10px;padding:1rem;color:var(--cp-mute);font-size:.9rem;margin-top:.8rem}';
  document.head.appendChild(css);

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function sess() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function kb(n) { n = Number(n || 0); return n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB'; }
  function ext(f) { var e = String(f || '').split('.').pop().toUpperCase(); return e.length > 4 ? 'FILE' : e; }
  function call(body) {
    var s = sess();
    if (!s || !s.token) { return Promise.resolve({ ok: false, auth: false, error: 'Login kariye.' }); }
    body.token = s.token;
    return fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(function (r) { return r.json(); });
  }

  function load() {
    loading = true;
    call({ action: 'list' }).then(function (r) { loading = false; C = r || { ok: false, error: 'Load nahi hua.' }; paint(); })
      .catch(function () { loading = false; C = { ok: false, error: 'Documents load nahi ho paaye. Refresh kariye.' }; paint(); });
  }

  function catCls(c) { return c === 'Acknowledgement' || c === 'Certificate' || c === 'Final document' ? 'lk-cat ack' : (c === 'Client upload' ? 'lk-cat cli' : 'lk-cat'); }
  function docRow(d, staffView) {
    var canDel = C.role === 'admin' || C.role === 'staff' || d.by_role === 'client';
    return '<div class="lk-doc"><div class="lk-l"><span class="lk-ic">' + esc(ext(d.file_name)) + '</span><div style="min-width:0"><b>' + esc(d.title) + '</b>' +
      '<div class="cp-meta"><span class="' + catCls(d.category) + '">' + esc(d.category || 'Document') + '</span>' + esc(d.date) + ' &middot; ' + kb(d.size) +
      (staffView ? ' &middot; ' + esc(d.client || d.client_email) + (d.service ? ' &middot; ' + esc(d.service) : '') : '') + '</div></div></div>' +
      '<div class="cp-row" style="margin:0"><button class="cp-btn s" data-dl="' + esc(d.doc_id) + '">Download</button>' +
      (canDel ? '<button class="cp-btn o s" data-rm="' + esc(d.doc_id) + '">Hataiye</button>' : '') + '</div></div>';
  }

  function uploadForm() {
    var r = C.role, E = C.engagements || [];
    var h = '<div class="lk-up"><div class="lk-g">';
    var so = E.map(function (e) { return '<option value="' + esc(e.eng_id) + '">' + esc(e.service) + (r !== 'client' ? ' - ' + esc(e.client || e.email) : '') + ' (' + esc(e.eng_id) + ')</option>'; }).join('');
    if (r === 'client') {
      h += '<div><label class="cp-lbl">Kis service ke liye?</label><select class="cp-in" id="lk-eng"><option value="">General / permanent document</option>' + so + '</select></div>';
    } else if (r === 'admin') {
      h += '<div><label class="cp-lbl">Service (engagement)</label><select class="cp-in" id="lk-eng"><option value="">Service nahi - seedha client ko</option>' + so + '</select></div>' +
        '<div id="lk-cw"><label class="cp-lbl">Client ka email (agar service nahi chuni)</label><input class="cp-in" id="lk-ce" type="email" placeholder="client@email.com"></div>' +
        '<div id="lk-cnw"><label class="cp-lbl">Client ka naam</label><input class="cp-in" id="lk-cn"></div>';
    } else {
      h += '<div><label class="cp-lbl">Service (engagement)</label><select class="cp-in" id="lk-eng"><option value="">Service chuniye</option>' + so + '</select></div>';
    }
    if (r !== 'client') {
      h += '<div><label class="cp-lbl">Document type</label><select class="cp-in" id="lk-cat">' + (C.cats || []).map(function (c) { return '<option>' + esc(c) + '</option>'; }).join('') + '</select></div>';
    }
    h += '<div><label class="cp-lbl">Document ka naam</label><input class="cp-in" id="lk-t" placeholder="' + (r === 'client' ? 'e.g. PAN card, bank statement' : 'e.g. ITR-V AY 2026-27') + '" maxlength="120"></div>' +
      '<div><label class="cp-lbl">File (PDF, photo, Word, Excel, ZIP; max 8 MB)</label><input class="cp-in" id="lk-f" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.doc,.docx,.xls,.xlsx,.csv,.txt,.zip,.json,.xml"></div></div>' +
      '<div class="cp-row"><button class="cp-btn s" id="lk-go">Upload kariye</button><button class="cp-btn o s" id="lk-x">Band kariye</button></div><p class="cp-msg" id="lk-m"></p></div>';
    return h;
  }

  function html() {
    var h = '<div class="lk-h"><div><h2>Document Locker</h2><div class="cp-meta">';
    if (!C) { return h + 'Aapke documents load ho rahe hain...</div></div></div>'; }
    if (!C.ok) { return h + '</div></div></div><p class="cp-msg e">' + esc(C.error || 'Documents load nahi ho paaye.') + '</p>'; }
    var r = C.role, D = C.docs || [];
    h += r === 'client' ? 'CGA ke saath li gayi har service ke documents yahan hamesha surakshit hain. Jab chahein download kariye.' :
      (r === 'admin' ? 'Saare clients ke documents. Upload karte hi client ko email chala jaata hai.' : 'Aapko allot kiye gaye kaam ke documents. Upload karte hi client ko email chala jaata hai.');
    h += '</div></div><div class="cp-row" style="margin:0"><button class="cp-btn s" id="lk-open">' + (r === 'client' ? 'Document bhejiye' : 'Document upload kariye') + '</button></div></div>';
    if (flash) { h += '<p class="cp-msg ' + flash[0] + '">' + esc(flash[1]) + '</p>'; }
    if (open) { h += uploadForm(); }
    if (r !== 'client') {
      h += '<div class="cp-row" style="margin:.9rem 0 .4rem"><input class="cp-in cp-search" id="lk-q" placeholder="Search client, service, document..." value="' + esc(q) + '" style="max-width:420px"><span class="cp-meta">' + D.length + (C.total > D.length ? ' of ' + C.total : '') + ' documents</span></div>';
    }
    var L = D;
    if (q) { var k = q.toLowerCase(); L = D.filter(function (d) { return JSON.stringify([d.title, d.file_name, d.client, d.client_email, d.service, d.eng_id, d.category]).toLowerCase().indexOf(k) >= 0; }); }
    if (!L.length) {
      return h + '<div class="lk-empty">' + (q ? 'Is search se koi document nahi mila.' : (r === 'client' ? 'Abhi aapke locker mein koi document nahi hai. Jaise hi CGA team aapka kaam pura karke document daalegi, aapko email aayega aur wo yahan dikhega.' : 'Abhi koi document nahi hai.')) + '</div>';
    }
    if (r === 'client') {
      var groups = {}, order = [];
      L.forEach(function (d) { var g = d.category === 'Client upload' ? 'Aapke bheje hue documents' : (d.service ? d.service + (d.eng_id ? ' (' + d.eng_id + ')' : '') : 'General / permanent documents'); if (!groups[g]) { groups[g] = []; order.push(g); } groups[g].push(d); });
      order.forEach(function (g) { h += '<div class="lk-grp">' + esc(g) + '</div>' + groups[g].map(function (d) { return docRow(d, false); }).join(''); });
    } else {
      h += L.map(function (d) { return docRow(d, true); }).join('');
    }
    return h;
  }

  function paint() {
    var box = document.getElementById('cp-locker');
    if (!box) { return; }
    var qf = document.getElementById('lk-q'), had = qf && document.activeElement === qf, pos = had ? qf.selectionStart : 0;
    box.innerHTML = html();
    wire(box);
    if (had) { var q2 = document.getElementById('lk-q'); if (q2) { q2.focus(); q2.setSelectionRange(pos, pos); } }
  }

  function say(t, c) { var m = document.getElementById('lk-m'); if (m) { m.className = 'cp-msg ' + (c || ''); m.textContent = t; } }

  function b64Blob(b64, mime) {
    var bin = atob(b64), n = bin.length, u = new Uint8Array(n);
    for (var i = 0; i < n; i++) { u[i] = bin.charCodeAt(i); }
    return new Blob([u], { type: mime || 'application/octet-stream' });
  }

  function wire(box) {
    var o = document.getElementById('lk-open');
    if (o) { o.onclick = function () { open = !open; flash = null; paint(); }; }
    var x = document.getElementById('lk-x');
    if (x) { x.onclick = function () { open = false; paint(); }; }
    var qf = document.getElementById('lk-q');
    if (qf) { qf.oninput = function () { q = qf.value; paint(); }; }
    var eng = document.getElementById('lk-eng'), cw = document.getElementById('lk-cw'), cnw = document.getElementById('lk-cnw');
    if (eng && cw) { var tg = function () { var show = !eng.value; cw.style.display = show ? '' : 'none'; cnw.style.display = show ? '' : 'none'; }; eng.onchange = tg; tg(); }
    var go = document.getElementById('lk-go');
    if (go) {
      go.onclick = function () {
        var fi = document.getElementById('lk-f'), f = fi && fi.files && fi.files[0];
        if (!f) { say('File chuniye.', 'e'); return; }
        if (f.size > MAX) { say('File 8 MB se badi hai. Chhoti karke upload kariye.', 'e'); return; }
        var body = { action: 'upload', file_name: f.name, mime: f.type || '', title: (document.getElementById('lk-t').value || '').trim() || f.name, eng_id: eng ? eng.value : '' };
        var ct = document.getElementById('lk-cat'); if (ct) { body.category = ct.value; }
        var ce = document.getElementById('lk-ce'); if (ce && !body.eng_id) { body.client_email = ce.value.trim(); body.client_name = (document.getElementById('lk-cn').value || '').trim(); }
        if (C.role === 'staff' && !body.eng_id) { say('Pehle service chuniye.', 'e'); return; }
        if (C.role === 'admin' && !body.eng_id && !/^[^@ ]+@[^@ ]+\.[^@ ]+$/.test(body.client_email || '')) { say('Service chuniye, ya client ka sahi email daaliye.', 'e'); return; }
        go.disabled = true; say('Upload ho raha hai... (' + kb(f.size) + ')');
        var rd = new FileReader();
        rd.onerror = function () { go.disabled = false; say('File padh nahi paaye. Dobara chuniye.', 'e'); };
        rd.onload = function () {
          body.b64 = String(rd.result).split(',')[1] || '';
          call(body).then(function (r) {
            go.disabled = false;
            if (r && r.auth === false) { say(r.error, 'e'); return; }
            if (r && r.ok) { open = false; flash = ['k', r.msg || 'Upload ho gaya.']; C = null; paint(); load(); }
            else { say((r && r.error) || 'Upload nahi hua.', 'e'); }
          }).catch(function () { go.disabled = false; say('Network error. Dobara try kariye.', 'e'); });
        };
        rd.readAsDataURL(f);
      };
    }
    Array.prototype.forEach.call(box.querySelectorAll('[data-dl]'), function (b) {
      b.onclick = function () {
        var id = b.getAttribute('data-dl'), t = b.textContent;
        b.disabled = true; b.textContent = 'Aa raha hai...';
        call({ action: 'download', doc_id: id }).then(function (r) {
          b.disabled = false; b.textContent = t;
          if (!r || !r.ok || !r.b64) { alert((r && r.error) || 'Download nahi hua.'); return; }
          var url = URL.createObjectURL(b64Blob(r.b64, r.mime)), a = document.createElement('a');
          a.href = url; a.download = r.name || 'document'; document.body.appendChild(a); a.click();
          setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 15000);
        }).catch(function () { b.disabled = false; b.textContent = t; alert('Network error. Dobara try kariye.'); });
      };
    });
    Array.prototype.forEach.call(box.querySelectorAll('[data-rm]'), function (b) {
      b.onclick = function () {
        if (!confirm('Ye document locker se hata dein?')) { return; }
        b.disabled = true;
        call({ action: 'delete', doc_id: b.getAttribute('data-rm') }).then(function (r) {
          if (r && r.ok) { flash = ['k', r.msg || 'Hata diya.']; load(); } else { b.disabled = false; alert((r && r.error) || 'Nahi hua.'); }
        }).catch(function () { b.disabled = false; });
      };
    });
  }

  function inject() {
    var top = app.querySelector('.cp-top');
    if (!top) { if (!sess()) { C = null; } return; }
    if (document.getElementById('cp-locker')) { return; }
    var box = document.createElement('div');
    box.id = 'cp-locker'; box.className = 'cp-card';
    var anchor = app.querySelector('.cp-kpis') || top;
    anchor.parentNode.insertBefore(box, anchor.nextSibling);
    paint();
    if (!C && !loading) { load(); }
  }

  document.addEventListener('click', function (ev) {
    var t = ev.target;
    if (t && (t.id === 'cp-ref' || t.id === 'cp-out')) { C = null; flash = null; open = false; }
  }, true);
  new MutationObserver(inject).observe(app, { childList: true });
  inject();
})();
