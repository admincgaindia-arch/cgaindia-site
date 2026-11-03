/* CGA Client Workspace (portal): documents grouped by client + encrypted portal-login vault.
   Staff/admin: client list -> client page with Documents and Portal logins tabs.
   Client: own documents by service + portal logins CGA has chosen to share. */
(function () {
  var DOCS = 'https://cga.app.n8n.cloud/webhook/cga-portal-docs';
  var VAULT = 'https://cga.app.n8n.cloud/webhook/cga-portal-vault';
  var KEY = 'cga_portal_session';
  var MAX = 8 * 1024 * 1024;
  var app = document.getElementById('cp-app');
  if (!app) { return; }
  var S = { docs: null, clients: null, portals: [], sel: null, tab: 'docs', creds: {}, q: '', upOpen: false, credForm: null, flash: null, revealed: {}, myCreds: null, loading: false, ents: null, ent: '', ctab: 'docs', groups: null, gview: false, gform: null };

  var css = document.createElement('style');
  css.textContent = [
    '#cp-locker .lk-h{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:.6rem}',
    '#cp-locker h2{margin:0;font-size:1.2rem}#cp-locker h3{margin:0;font-size:1.05rem}',
    '#cp-locker .lk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:.75rem;margin-top:.8rem}',
    '#cp-locker .lk-cc{border:1px solid var(--cp-line);border-radius:12px;padding:.85rem .95rem;background:#fff;cursor:pointer;text-align:left;font:inherit;transition:box-shadow .15s,border-color .15s;width:100%}',
    '#cp-locker .lk-cc:hover,#cp-locker .lk-cc:focus{border-color:var(--cp-navy);box-shadow:0 4px 16px rgba(0,41,61,.08);outline:none}',
    '#cp-locker .lk-av{display:inline-flex;align-items:center;justify-content:center;width:2.2rem;height:2.2rem;border-radius:50%;background:#e3f3f9;color:var(--cp-navy);font-weight:800;margin-right:.6rem;flex:none}',
    '#cp-locker .lk-ct{display:flex;align-items:center;min-width:0}#cp-locker .lk-ct b{display:block;color:#1d2a33;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '#cp-locker .lk-ct small{display:block;color:var(--cp-mute);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.78rem}',
    '#cp-locker .lk-chips{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.6rem}',
    '#cp-locker .lk-chip{font-size:.72rem;font-weight:700;padding:.15rem .5rem;border-radius:999px;background:#eef4f7;color:var(--cp-navy)}',
    '#cp-locker .lk-chip.w{background:#fff4e0;color:#8a5a00}',
    '#cp-locker .lk-tabs{display:flex;gap:.3rem;border-bottom:1px solid var(--cp-line);margin:.9rem 0 .8rem}',
    '#cp-locker .lk-tab{background:none;border:0;border-bottom:3px solid transparent;padding:.55rem .8rem;font:inherit;font-weight:700;color:var(--cp-mute);cursor:pointer}',
    '#cp-locker .lk-tab.on{color:var(--cp-navy);border-bottom-color:var(--cp-navy)}',
    '#cp-locker .lk-grp{margin:1rem 0 .3rem;font-weight:700;color:var(--cp-navy);font-size:.92rem}',
    '#cp-locker .lk-doc{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:.5rem;border:1px solid var(--cp-line);border-radius:10px;padding:.7rem .85rem;margin:0 0 .5rem;background:#fff}',
    '#cp-locker .lk-doc b{display:block;font-size:.95rem;color:#1d2a33;word-break:break-word}',
    '#cp-locker .lk-ic{display:inline-block;width:2.1rem;height:2.1rem;line-height:2.1rem;text-align:center;border-radius:8px;background:#e3f3f9;color:var(--cp-navy);font-weight:800;font-size:.62rem;margin-right:.6rem;flex:none}',
    '#cp-locker .lk-l{display:flex;align-items:center;min-width:0;flex:1 1 15rem}',
    '#cp-locker .lk-cat{display:inline-block;padding:.1rem .5rem;border-radius:999px;background:#eef4f7;color:var(--cp-navy);font-size:.7rem;font-weight:700;margin-right:.35rem}',
    '#cp-locker .lk-cat.ack{background:#e6f6ec;color:#17773f}#cp-locker .lk-cat.cli{background:#fff4e0;color:#8a5a00}',
    '#cp-locker .lk-up{background:#f6fafc;border:1px dashed #c9d6de;border-radius:12px;padding:.9rem 1rem;margin:.9rem 0}',
    '#cp-locker .lk-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0 .8rem}',
    '#cp-locker .lk-empty{background:#f6fafc;border-radius:10px;padding:1rem;color:var(--cp-mute);font-size:.9rem;margin-top:.6rem}',
    '#cp-locker .lk-back{background:none;border:0;color:var(--cp-navy);font:inherit;font-weight:700;cursor:pointer;padding:0;margin:0 0 .6rem}',
    '#cp-locker .lk-cr{border:1px solid var(--cp-line);border-radius:10px;padding:.75rem .9rem;margin:0 0 .55rem;background:#fff;display:grid;grid-template-columns:minmax(150px,1.1fr) minmax(150px,1fr) minmax(170px,1.2fr) auto;gap:.5rem .9rem;align-items:center}',
    '@media(max-width:760px){#cp-locker .lk-cr{grid-template-columns:1fr}}',
    '#cp-locker .lk-k{font-size:.7rem;color:var(--cp-mute);text-transform:uppercase;letter-spacing:.04em;display:block}',
    '#cp-locker .lk-v{font-weight:700;color:#1d2a33;word-break:break-all}',
    '#cp-locker .lk-pw{font-family:ui-monospace,Menlo,Consolas,monospace;font-weight:700;letter-spacing:.06em}',
    '#cp-locker .lk-sw{display:inline-flex;align-items:center;gap:.4rem;font-size:.8rem;font-weight:700;color:var(--cp-mute);cursor:pointer;user-select:none}',
    '#cp-locker .lk-sw input{appearance:none;-webkit-appearance:none;width:2.3rem;height:1.3rem;border-radius:999px;background:#c9d6de;position:relative;cursor:pointer;margin:0;transition:background .15s}',
    '#cp-locker .lk-sw input:after{content:"";position:absolute;top:.15rem;left:.15rem;width:1rem;height:1rem;border-radius:50%;background:#fff;transition:left .15s}',
    '#cp-locker .lk-sw input:checked{background:#17773f}#cp-locker .lk-sw input:checked:after{left:1.15rem}',
    '#cp-locker .lk-sw.on{color:#17773f}',
    '#cp-locker .lk-note{font-size:.8rem;color:var(--cp-mute);margin-top:.2rem}',
    '#cp-locker .lk-hero{background:linear-gradient(135deg,#00293d 0%,#005176 60%,#0b6f99 100%);color:#fff;border-radius:14px;padding:1.2rem 1.3rem;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem}',
    '#cp-locker .lk-hero h2{color:#fff;font-size:1.3rem}#cp-locker .lk-hero p{margin:.25rem 0 0;color:#cfe8f2;font-size:.9rem}',
    '#cp-locker .lk-stats{display:flex;gap:.6rem;flex-wrap:wrap}#cp-locker .lk-stat{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:12px;padding:.55rem .9rem;min-width:88px;text-align:center}',
    '#cp-locker .lk-stat b{display:block;font-size:1.35rem;color:#fff}#cp-locker .lk-stat span{font-size:.72rem;color:#cfe8f2;text-transform:uppercase;letter-spacing:.05em}',
    '#cp-locker .lk-ents{display:flex;gap:.45rem;flex-wrap:wrap;margin:1rem 0 .2rem}',
    '#cp-locker .lk-ent{border:1px solid var(--cp-line);background:#fff;border-radius:999px;padding:.4rem .85rem;font:inherit;font-size:.85rem;font-weight:700;color:#1d2a33;cursor:pointer}',
    '#cp-locker .lk-ent small{font-weight:600;color:var(--cp-mute);margin-left:.3rem}#cp-locker .lk-ent.on{background:var(--cp-navy);border-color:var(--cp-navy);color:#fff}#cp-locker .lk-ent.on small{color:#cfe8f2}',
    '#cp-locker details.lk-fy{border:1px solid var(--cp-line);border-radius:12px;margin:0 0 .6rem;background:#fbfdfe}',
    '#cp-locker details.lk-fy>summary{cursor:pointer;list-style:none;padding:.75rem .95rem;font-weight:800;color:var(--cp-navy);display:flex;justify-content:space-between;align-items:center}',
    '#cp-locker details.lk-fy>summary::-webkit-details-marker{display:none}#cp-locker details.lk-fy>summary:after{content:"+";font-size:1.1rem}#cp-locker details.lk-fy[open]>summary:after{content:"-"}',
    '#cp-locker details.lk-fy .lk-fyb{padding:0 .8rem .4rem}',
    '#cp-locker .lk-who{display:inline-block;font-size:.7rem;font-weight:700;padding:.1rem .45rem;border-radius:6px;background:#eaf0ff;color:#2b4aa0;margin-right:.35rem}',
    '#cp-locker .lk-lg{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:.7rem}',
    '#cp-locker .lk-lc{border:1px solid var(--cp-line);border-radius:12px;padding:.9rem;background:#fff}',
    '#cp-locker .lk-pt{display:inline-block;font-weight:800;color:#fff;background:var(--cp-navy);border-radius:8px;padding:.25rem .55rem;font-size:.8rem;margin-bottom:.5rem}',
    '#cp-locker .lk-gr{border:1px solid var(--cp-line);border-radius:12px;padding:.8rem .95rem;margin:0 0 .6rem;background:#fff}',
    '#cp-locker .lk-mrow{display:grid;grid-template-columns:2fr 1.5fr 1.2fr auto auto;gap:.5rem;align-items:center;margin:.35rem 0}',
    '@media(max-width:760px){#cp-locker .lk-mrow{grid-template-columns:1fr}}'
  ].join('');
  document.head.appendChild(css);

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function sess() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function kb(n) { n = Number(n || 0); return n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB'; }
  function ext(f) { var e = String(f || '').split('.').pop().toUpperCase(); return e.length > 4 ? 'FILE' : e; }
  function initials(n) { var p = String(n || '?').trim().split(/\s+/); return ((p[0] || '?')[0] + (p[1] ? p[1][0] : '')).toUpperCase(); }
  function fyOf(d) {
    var t = String(d.title || '') + ' ' + String(d.file_name || '');
    var m = t.match(/A\.?\s?Y\.?\s*(20\d\d)\s*[-\/]\s*(\d{2,4})/i);
    if (m) { var a = Number(m[1]) - 1; return 'FY ' + a + '-' + String(a + 1).slice(2); }
    m = t.match(/F\.?\s?Y\.?\s*(20\d\d)\s*[-\/]\s*(\d{2,4})/i);
    if (m) { var f = Number(m[1]); return 'FY ' + f + '-' + String(f + 1).slice(2); }
    var dt = String(d.date || ''); var y = Number(dt.slice(0, 4)), mo = Number(dt.slice(5, 7));
    if (!y) { return 'Other'; }
    var s0 = mo >= 4 ? y : y - 1; return 'FY ' + s0 + '-' + String(s0 + 1).slice(2);
  }
  function byFY(D, showWho) {
    var g = {}, o = [];
    D.forEach(function (d) { var k = fyOf(d); if (!g[k]) { g[k] = []; o.push(k); } g[k].push(d); });
    o.sort(function (a, b) { return a < b ? 1 : -1; });
    return o.map(function (k, i) { return '<details class="lk-fy"' + (i === 0 ? ' open' : '') + '><summary>' + esc(k) + ' <span class="cp-meta" style="font-weight:600">' + g[k].length + ' documents</span></summary><div class="lk-fyb">' + g[k].map(function (d) { return docRow(d, showWho); }).join('') + '</div></details>'; }).join('');
  }
  function entName(em) { var e = (S.ents || []).find(function (x) { return x.email === String(em || '').toLowerCase(); }); return e ? e.name : ''; }
  function call(url, body) {
    var s = sess();
    if (!s || !s.token) { return Promise.resolve({ ok: false, auth: false, error: 'Login kariye.' }); }
    body.token = s.token;
    return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(function (r) { return r.json(); });
  }
  function role() { return S.docs && S.docs.role; }
  function isTeam() { var r = role(); return r === 'admin' || r === 'senior' || r === 'staff'; }
  function isAll() { var r = role(); return r === 'admin' || r === 'senior'; }

  function loadAll() {
    S.loading = true;
    call(DOCS, { action: 'list' }).then(function (r) {
      S.docs = r || { ok: false, error: 'Load nahi hua.' };
      if (S.docs.ok && isTeam()) {
        return call(VAULT, { action: 'clients' }).then(function (v) { S.clients = (v && v.ok) ? v.clients : []; S.portals = (v && v.portals) || []; });
      }
      if (S.docs.ok && role() === 'client') {
        return call(VAULT, { action: 'list' }).then(function (v) { S.myCreds = (v && v.ok) ? v.creds : []; S.ents = (v && v.entities) || []; });
      }
    }).then(function () { S.loading = false; paint(); })
      .catch(function () { S.loading = false; S.docs = { ok: false, error: 'Load nahi ho paaya. Refresh kariye.' }; paint(); });
  }
  function loadCreds(em) {
    call(VAULT, { action: 'list', client_email: em }).then(function (v) { S.creds[em] = (v && v.ok) ? v.creds : []; if (v && v.portals) { S.portals = v.portals; } paint(); })
      .catch(function () { S.creds[em] = []; paint(); });
  }

  function catCls(c) { return c === 'Acknowledgement' || c === 'Certificate' || c === 'Final document' ? 'lk-cat ack' : (c === 'Client upload' ? 'lk-cat cli' : 'lk-cat'); }
  function docRow(d, showWho) {
    var canDel = isTeam() || d.by_role === 'client';
    var who = showWho ? entName(d.client_email) : '';
    return '<div class="lk-doc"><div class="lk-l"><span class="lk-ic">' + esc(ext(d.file_name)) + '</span><div style="min-width:0"><b>' + esc(d.title) + '</b>' +
      '<div class="cp-meta">' + (who ? '<span class="lk-who">' + esc(who) + '</span>' : '') + '<span class="' + catCls(d.category) + '">' + esc(d.category || 'Document') + '</span>' + esc(d.date) + ' &middot; ' + kb(d.size) + (d.service ? ' &middot; ' + esc(d.service) : '') + '</div></div></div>' +
      '<div class="cp-row" style="margin:0"><button class="cp-btn s" data-dl="' + esc(d.doc_id) + '">Download</button>' +
      (canDel ? '<button class="cp-btn o s" data-rm="' + esc(d.doc_id) + '">Hataiye</button>' : '') + '</div></div>';
  }
  function credRow(c, clientView) {
    var pw = S.revealed[c.cred_id];
    var h = '<div class="lk-cr"><div><span class="lk-k">Portal</span><span class="lk-v">' + esc(c.portal) + '</span>' + (c.extra ? '<div class="lk-note">' + esc(c.extra) + '</div>' : '') + '</div>' +
      '<div><span class="lk-k">Login ID / username</span><span class="lk-v">' + esc(c.login_id) + '</span> <button class="cp-btn o s" data-cp="' + esc(c.login_id) + '" style="padding:.15rem .5rem;font-size:.72rem">Copy</button></div>' +
      '<div><span class="lk-k">Password</span><span class="lk-pw">' + (pw != null ? esc(pw) : '&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;') + '</span> ' +
      (pw != null ? '<button class="cp-btn o s" data-cp="' + esc(pw) + '" style="padding:.15rem .5rem;font-size:.72rem">Copy</button> <button class="cp-btn o s" data-hide="' + esc(c.cred_id) + '" style="padding:.15rem .5rem;font-size:.72rem">Chhupaiye</button>' : '<button class="cp-btn s" data-rv="' + esc(c.cred_id) + '" style="padding:.15rem .55rem;font-size:.72rem">Dikhaiye</button>') + '</div>';
    if (!clientView) {
      h += '<div class="cp-row" style="margin:0;justify-content:flex-end"><label class="lk-sw' + (c.show_client ? ' on' : '') + '" title="On karne par client apne portal mein ye login dekh sakega"><input type="checkbox" data-tg="' + esc(c.cred_id) + '"' + (c.show_client ? ' checked' : '') + '>Client ko dikhe</label>' +
        '<button class="cp-btn o s" data-ed="' + esc(c.cred_id) + '">Edit</button>' + (isAll() ? '<button class="cp-btn o s" data-rc="' + esc(c.cred_id) + '">Hataiye</button>' : '') + '</div>';
      h += '<div class="lk-note" style="grid-column:1/-1">Update: ' + esc(c.updated || '-') + (c.updated_by ? ' &middot; ' + esc(c.updated_by) : '') + '</div>';
    }
    return h + '</div>';
  }

  function uploadForm(preEmail) {
    var r = role(), E = (S.docs.engagements || []).filter(function (e) { return !preEmail || String(e.email || '').toLowerCase() === preEmail; });
    var so = E.map(function (e) { return '<option value="' + esc(e.eng_id) + '">' + esc(e.service) + ' (' + esc(e.eng_id) + ')</option>'; }).join('');
    var h = '<div class="lk-up"><div class="lk-g">';
    if (r === 'client') {
      if (S.ents && S.ents.length > 1) { h += '<div><label class="cp-lbl">Kiske liye?</label><select class="cp-in" id="lk-who">' + S.ents.map(function (x) { return '<option value="' + esc(x.email) + '"' + (x.email === S.ent ? ' selected' : '') + '>' + esc(x.name) + (x.type ? ' (' + esc(x.type) + ')' : '') + '</option>'; }).join('') + '</select></div>'; }
      h += '<div><label class="cp-lbl">Kis service ke liye?</label><select class="cp-in" id="lk-eng"><option value="">General / permanent document</option>' + so + '</select></div>';
    } else {
      h += '<div><label class="cp-lbl">Service (engagement)</label><select class="cp-in" id="lk-eng"><option value="">' + (isAll() ? 'Service nahi - seedha client ko' : 'Service chuniye') + '</option>' + so + '</select></div>';
      if (isAll() && !preEmail) { h += '<div><label class="cp-lbl">Client ka email</label><input class="cp-in" id="lk-ce" type="email"></div><div><label class="cp-lbl">Client ka naam</label><input class="cp-in" id="lk-cn"></div>'; }
      h += '<div><label class="cp-lbl">Document type</label><select class="cp-in" id="lk-cat">' + (S.docs.cats || []).map(function (c) { return '<option>' + esc(c) + '</option>'; }).join('') + '</select></div>';
    }
    h += '<div><label class="cp-lbl">Document ka naam</label><input class="cp-in" id="lk-t" maxlength="120" placeholder="' + (r === 'client' ? 'jaise PAN card, bank statement' : 'jaise ITR-V AY 2026-27') + '"></div>' +
      '<div><label class="cp-lbl">File (PDF, photo, Word, Excel, ZIP; max 8 MB)</label><input class="cp-in" id="lk-f" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.doc,.docx,.xls,.xlsx,.csv,.txt,.zip,.json,.xml"></div></div>' +
      '<div class="cp-row"><button class="cp-btn s" id="lk-go">Upload kariye</button><button class="cp-btn o s" id="lk-x">Band kariye</button></div><p class="cp-msg" id="lk-m"></p></div>';
    return h;
  }
  function credForm() {
    var f = S.credForm || {};
    return '<div class="lk-up"><div class="lk-g">' +
      '<div><label class="cp-lbl">Portal</label><select class="cp-in" id="vf-p">' + S.portals.map(function (p) { return '<option' + (p === f.portal ? ' selected' : '') + '>' + esc(p) + '</option>'; }).join('') + '</select></div>' +
      '<div><label class="cp-lbl">Login ID / username</label><input class="cp-in" id="vf-l" maxlength="120" autocomplete="off" value="' + esc(f.login_id || '') + '"></div>' +
      '<div><label class="cp-lbl">Password' + (f.cred_id ? ' (khaali chhodein to purana rahega)' : '') + '</label><input class="cp-in" id="vf-s" type="password" maxlength="200" autocomplete="new-password"></div>' +
      '<div><label class="cp-lbl">Note (optional)</label><input class="cp-in" id="vf-x" maxlength="300" placeholder="jaise GSTIN, registered mobile, security question" value="' + esc(f.extra || '') + '"></div></div>' +
      '<label class="lk-sw" style="margin-top:.6rem"><input type="checkbox" id="vf-sh"' + (f.show_client ? ' checked' : '') + '>Client ko bhi dikhe</label>' +
      '<div class="cp-row"><button class="cp-btn s" id="vf-go">' + (f.cred_id ? 'Update kariye' : 'Save kariye') + '</button><button class="cp-btn o s" id="vf-x2">Band kariye</button></div><p class="cp-msg" id="vf-m"></p>' +
      '<p class="lk-note">Password encrypted (AES-256) rakha jaata hai. Har baar dekhne ka record rehta hai.</p></div>';
  }

  function clientPage() {
    var em = S.sel, c = (S.clients || []).find(function (x) { return x.email === em; }) || { email: em, name: em };
    var D = (S.docs.docs || []).filter(function (d) { return String(d.client_email || '').toLowerCase() === em; });
    var CR = S.creds[em];
    var h = '<button class="lk-back" id="lk-back">&larr; Saare clients</button>' +
      '<div class="lk-h"><div class="lk-ct"><span class="lk-av">' + esc(initials(c.name)) + '</span><div><h3>' + esc(c.name) + '</h3><div class="cp-meta">' + esc(em) + (c.work ? ' &middot; ' + c.work + ' kaam' + (c.pending_work ? ' (' + c.pending_work + ' chal rahe)' : '') : '') + '</div></div></div>' +
      '<div class="cp-row" style="margin:0">' + (S.tab === 'docs' ? '<button class="cp-btn s" id="lk-open">Document upload kariye</button>' : '<button class="cp-btn s" id="vf-open">+ Portal login jodiye</button>') + '</div></div>';
    if (S.flash) { h += '<p class="cp-msg ' + S.flash[0] + '">' + esc(S.flash[1]) + '</p>'; }
    h += '<div class="lk-tabs"><button class="lk-tab' + (S.tab === 'docs' ? ' on' : '') + '" data-tab="docs">Documents (' + D.length + ')</button><button class="lk-tab' + (S.tab === 'creds' ? ' on' : '') + '" data-tab="creds">Portal logins (' + (CR ? CR.length : c.creds || 0) + ')</button></div>';
    if (S.tab === 'docs') {
      if (S.upOpen) { h += uploadForm(em); }
      h += D.length ? byFY(D, false) : '<div class="lk-empty">Is client ke abhi koi documents nahi hain.</div>';
    } else {
      if (S.credForm) { h += credForm(); }
      if (!CR) { h += '<div class="lk-empty">Load ho raha hai...</div>'; }
      else { h += CR.length ? CR.map(function (x) { return credRow(x, false); }).join('') : '<div class="lk-empty">Abhi koi portal login save nahi hai. "+ Portal login jodiye" se GST, Income Tax, MCA jaise logins jodiye.</div>'; }
    }
    return h;
  }
  function teamHome() {
    var r = role(), L = S.clients || [];
    var h = '<div class="lk-h"><div><h2>Client Workspace</h2><div class="cp-meta">' + (isAll() ? 'Saare clients ke documents aur portal logins ek jagah.' : 'Aapko allot kiye gaye clients ke documents aur portal logins.') + '</div></div>' +
      (isAll() ? '<div class="cp-row" style="margin:0"><button class="cp-btn o s" id="gp-open">Family / Business Groups</button><button class="cp-btn s" id="lk-open">Document upload kariye</button></div>' : '') + '</div>';
    if (S.flash) { h += '<p class="cp-msg ' + S.flash[0] + '">' + esc(S.flash[1]) + '</p>'; }
    if (S.upOpen) { h += uploadForm(''); }
    h += '<div class="cp-row" style="margin:.9rem 0 0"><input class="cp-in cp-search" id="lk-q" placeholder="Client ka naam ya email dhoondhiye..." value="' + esc(S.q) + '" style="max-width:420px"><span class="cp-meta">' + L.length + ' clients</span></div>';
    var q = S.q.toLowerCase();
    var F = q ? L.filter(function (c) { return (c.name + ' ' + c.email).toLowerCase().indexOf(q) >= 0; }) : L;
    if (!F.length) { return h + '<div class="lk-empty">' + (q ? 'Is naam se koi client nahi mila.' : (r === 'staff' ? 'Abhi aapko koi client allot nahi hai.' : 'Abhi koi client nahi hai.')) + '</div>'; }
    h += '<div class="lk-grid">' + F.slice(0, 200).map(function (c) {
      return '<button class="lk-cc" data-cl="' + esc(c.email) + '"><div class="lk-ct"><span class="lk-av">' + esc(initials(c.name)) + '</span><div style="min-width:0"><b>' + esc(c.name) + '</b><small>' + esc(c.email) + '</small></div></div>' +
        '<div class="lk-chips"><span class="lk-chip">' + c.docs + ' documents</span><span class="lk-chip">' + c.creds + ' logins</span>' + (c.pending_work ? '<span class="lk-chip w">' + c.pending_work + ' kaam chal raha</span>' : '') + (c.groups ? '<span class="lk-chip" style="background:#eaf0ff;color:#2b4aa0">' + esc(c.groups) + '</span>' : '') + '</div></button>';
    }).join('') + '</div>';
    if (F.length > 200) { h += '<p class="cp-meta">Pehle 200 dikhaye. Search se dhoondhiye.</p>'; }
    return h;
  }
  function clientHome() {
    var D = S.docs.docs || [], E = S.ents || [], CR = S.myCreds || [];
    var multi = E.length > 1;
    if (S.ent) { D = D.filter(function (d) { return String(d.client_email || '').toLowerCase() === S.ent; }); CR = CR.filter(function (c) { return String(c.client_email || '').toLowerCase() === S.ent; }); }
    var grp = (E.find(function (x) { return x.group; }) || {}).group || '';
    var h = '<div class="lk-hero"><div><h2>' + (grp ? esc(grp) + ' &middot; ' : '') + 'Digital Locker</h2><p>Aapke saare documents aur portal logins ek surakshit jagah. CGA India.</p></div><div class="lk-stats">' +
      (multi ? '<div class="lk-stat"><b>' + E.length + '</b><span>Members</span></div>' : '') + '<div class="lk-stat"><b>' + (S.docs.docs || []).length + '</b><span>Documents</span></div><div class="lk-stat"><b>' + (S.myCreds || []).length + '</b><span>Logins</span></div></div></div>';
    if (multi) {
      h += '<div class="lk-ents"><button class="lk-ent' + (!S.ent ? ' on' : '') + '" data-ent="">Sab</button>' + E.map(function (x) { return '<button class="lk-ent' + (S.ent === x.email ? ' on' : '') + '" data-ent="' + esc(x.email) + '">' + esc(x.name) + (x.type ? '<small>' + esc(x.type) + '</small>' : '') + '</button>'; }).join('') + '</div>';
    }
    if (S.flash) { h += '<p class="cp-msg ' + S.flash[0] + '">' + esc(S.flash[1]) + '</p>'; }
    h += '<div class="lk-h" style="margin-top:.6rem"><div class="lk-tabs" style="margin:.4rem 0 .2rem;border:0"><button class="lk-tab' + (S.ctab === 'docs' ? ' on' : '') + '" data-ctab="docs">Documents (' + D.length + ')</button><button class="lk-tab' + (S.ctab === 'logins' ? ' on' : '') + '" data-ctab="logins">Portal logins (' + CR.length + ')</button></div>' +
      (S.ctab === 'docs' ? '<div class="cp-row" style="margin:0"><button class="cp-btn s" id="lk-open">Document bhejiye</button></div>' : '') + '</div>';
    if (S.ctab === 'docs') {
      if (S.upOpen) { h += uploadForm(''); }
      h += D.length ? byFY(D, multi && !S.ent) : '<div class="lk-empty">Abhi yahan koi document nahi hai. CGA team document daalegi to aapko email aayega.</div>';
    } else {
      h += CR.length ? '<p class="lk-note" style="margin:.2rem 0 .7rem">Ye logins CGA team ne aapke liye save kiye hain. Kisi ke saath share na kariye.</p><div class="lk-lg">' + CR.map(function (c) {
        var pw = S.revealed[c.cred_id], who = multi && !S.ent ? entName(c.client_email) : '';
        return '<div class="lk-lc"><span class="lk-pt">' + esc(c.portal) + '</span>' + (who ? ' <span class="lk-who">' + esc(who) + '</span>' : '') +
          '<span class="lk-k">Login ID</span><div class="lk-v">' + esc(c.login_id) + ' <button class="cp-btn o s" data-cp="' + esc(c.login_id) + '" style="padding:.1rem .45rem;font-size:.7rem">Copy</button></div>' +
          '<span class="lk-k" style="margin-top:.4rem">Password</span><div><span class="lk-pw">' + (pw != null ? esc(pw) : '&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;') + '</span> ' +
          (pw != null ? '<button class="cp-btn o s" data-cp="' + esc(pw) + '" style="padding:.1rem .45rem;font-size:.7rem">Copy</button> <button class="cp-btn o s" data-hide="' + esc(c.cred_id) + '" style="padding:.1rem .45rem;font-size:.7rem">Chhupaiye</button>' : '<button class="cp-btn s" data-rv="' + esc(c.cred_id) + '" style="padding:.1rem .5rem;font-size:.7rem">Dikhaiye</button>') + '</div>' +
          (c.extra ? '<div class="lk-note">' + esc(c.extra) + '</div>' : '') + '</div>';
      }).join('') + '</div>' : '<div class="lk-empty">Abhi koi portal login share nahi kiya gaya hai.</div>';
    }
    return h;
  }
  function groupsView() {
    var h = '<button class="lk-back" id="gp-back">&larr; Client Workspace</button><div class="lk-h"><div><h2>Family / Business Groups</h2><div class="cp-meta">Group ka "owner" (jaise family head) login karke poore group ke documents aur shared logins dekh sakta hai.</div></div><div class="cp-row" style="margin:0"><button class="cp-btn s" id="gp-new">+ Naya group</button></div></div>';
    if (S.flash) { h += '<p class="cp-msg ' + S.flash[0] + '">' + esc(S.flash[1]) + '</p>'; }
    if (S.gform) {
      var f = S.gform, opts = (S.clients || []).map(function (c) { return '<option value="' + esc(c.email) + '">' + esc(c.name) + '</option>'; }).join('');
      h += '<div class="lk-up"><label class="cp-lbl">Group ka naam</label><input class="cp-in" id="gf-n" maxlength="80" placeholder="jaise Jain Group" value="' + esc(f.group_name || '') + '" style="max-width:420px"><datalist id="gf-dl">' + opts + '</datalist>' +
        '<div class="lk-mrow" style="font-size:.75rem;font-weight:700;color:var(--cp-mute);margin-top:.8rem"><span>Email (client ka)</span><span>Naam</span><span>Rishta / type</span><span>Sab dekh sake</span><span></span></div>' +
        f.members.map(function (m, i) { return '<div class="lk-mrow"><input class="cp-in" data-gm="' + i + '" data-k="email" list="gf-dl" value="' + esc(m.email) + '" placeholder="client@email.com"><input class="cp-in" data-gm="' + i + '" data-k="name" value="' + esc(m.name) + '"><input class="cp-in" data-gm="' + i + '" data-k="type" value="' + esc(m.type) + '" placeholder="Head / Son / Business / HUF"><label class="lk-sw' + (m.owner ? ' on' : '') + '"><input type="checkbox" data-gm="' + i + '" data-k="owner"' + (m.owner ? ' checked' : '') + '>Owner</label><button class="cp-btn o s" data-gdel="' + i + '">Hataiye</button></div>'; }).join('') +
        '<div class="cp-row"><button class="cp-btn o s" id="gf-add">+ Member jodiye</button></div><div class="cp-row"><button class="cp-btn s" id="gf-go">' + (f.group_id ? 'Update kariye' : 'Group banaiye') + '</button><button class="cp-btn o s" id="gf-x">Band kariye</button></div><p class="cp-msg" id="gf-m"></p></div>';
    }
    var G = S.groups;
    if (!G) { return h + '<div class="lk-empty">Load ho raha hai...</div>'; }
    if (!G.length) { return h + '<div class="lk-empty">Abhi koi group nahi hai. "+ Naya group" se family ya business group banaiye.</div>'; }
    return h + G.map(function (g) {
      return '<div class="lk-gr"><div class="lk-h"><div><b style="color:var(--cp-navy)">' + esc(g.group_name) + '</b><div class="cp-meta">' + g.members.length + ' members &middot; owner: ' + esc(g.owners.join(', ')) + '</div></div><div class="cp-row" style="margin:0"><button class="cp-btn o s" data-gedit="' + esc(g.group_id) + '">Edit</button><button class="cp-btn o s" data-grm="' + esc(g.group_id) + '">Hataiye</button></div></div>' +
        '<div class="lk-chips">' + g.members.map(function (m) { return '<span class="lk-chip">' + esc(m.name || m.email) + (m.type ? ' &middot; ' + esc(m.type) : '') + (g.owners.indexOf(m.email) >= 0 ? ' &#9733;' : '') + '</span>'; }).join('') + '</div></div>';
    }).join('');
  }
  function loadGroups() { call(VAULT, { action: 'groups' }).then(function (r) { S.groups = (r && r.ok) ? r.groups : []; paint(); }).catch(function () { S.groups = []; paint(); }); }
  function html() {
    if (!S.docs) { return '<div class="lk-h"><div><h2>' + 'Client Workspace' + '</h2><div class="cp-meta">Load ho raha hai...</div></div></div>'; }
    if (!S.docs.ok) { return '<div class="lk-h"><h2>Documents</h2></div><p class="cp-msg e">' + esc(S.docs.error || 'Load nahi ho paaya.') + '</p>'; }
    if (role() === 'client') { return clientHome(); }
    if (S.gview) { return groupsView(); }
    return S.sel ? clientPage() : teamHome();
  }

  function paint() {
    var box = document.getElementById('cp-locker');
    if (!box) { return; }
    var qf = document.getElementById('lk-q'), had = qf && document.activeElement === qf, pos = had ? qf.selectionStart : 0;
    box.innerHTML = html();
    wire(box);
    if (had) { var q2 = document.getElementById('lk-q'); if (q2) { q2.focus(); q2.setSelectionRange(pos, pos); } }
  }
  function say(id, t, c) { var m = document.getElementById(id); if (m) { m.className = 'cp-msg ' + (c || ''); m.textContent = t; } }
  function b64Blob(b64, mime) { var bin = atob(b64), n = bin.length, u = new Uint8Array(n); for (var i = 0; i < n; i++) { u[i] = bin.charCodeAt(i); } return new Blob([u], { type: mime || 'application/octet-stream' }); }
  function copy(t, btn) {
    var done = function () { var o = btn.textContent; btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = o; }, 1200); };
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(t).then(done, function () {}); }
    else { var ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) {} ta.remove(); }
  }
  function each(box, sel, fn) { Array.prototype.forEach.call(box.querySelectorAll(sel), fn); }

  function wire(box) {
    var el;
    if ((el = document.getElementById('lk-open'))) { el.onclick = function () { S.upOpen = !S.upOpen; S.flash = null; paint(); }; }
    if ((el = document.getElementById('lk-x'))) { el.onclick = function () { S.upOpen = false; paint(); }; }
    if ((el = document.getElementById('lk-back'))) { el.onclick = function () { S.sel = null; S.upOpen = false; S.credForm = null; S.flash = null; paint(); }; }
    if ((el = document.getElementById('lk-q'))) { el.oninput = function () { S.q = this.value; paint(); }; }
    if ((el = document.getElementById('vf-open'))) { el.onclick = function () { S.credForm = S.credForm ? null : { show_client: false }; S.flash = null; paint(); }; }
    if ((el = document.getElementById('vf-x2'))) { el.onclick = function () { S.credForm = null; paint(); }; }
    each(box, '[data-ent]', function (b) { b.onclick = function () { S.ent = b.getAttribute('data-ent'); S.upOpen = false; paint(); }; });
    each(box, '[data-ctab]', function (b) { b.onclick = function () { S.ctab = b.getAttribute('data-ctab'); S.upOpen = false; paint(); }; });
    if ((el = document.getElementById('gp-open'))) { el.onclick = function () { S.gview = true; S.flash = null; S.gform = null; paint(); loadGroups(); }; }
    if ((el = document.getElementById('gp-back'))) { el.onclick = function () { S.gview = false; S.gform = null; S.flash = null; paint(); }; }
    if ((el = document.getElementById('gp-new'))) { el.onclick = function () { S.gform = { members: [{ email: '', name: '', type: 'Head', owner: true }, { email: '', name: '', type: '', owner: false }] }; S.flash = null; paint(); }; }
    if ((el = document.getElementById('gf-x'))) { el.onclick = function () { S.gform = null; paint(); }; }
    function syncG() { if (!S.gform) { return; } var n = document.getElementById('gf-n'); if (n) { S.gform.group_name = n.value; } each(box, '[data-gm]', function (inp) { var m = S.gform.members[Number(inp.getAttribute('data-gm'))], k = inp.getAttribute('data-k'); if (!m) { return; } if (k === 'owner') { m.owner = inp.checked; } else { m[k] = inp.value; if (k === 'email') { var c = (S.clients || []).find(function (x) { return x.email === inp.value.trim().toLowerCase(); }); if (c && !m.name) { m.name = c.name; } } } }); }
    if ((el = document.getElementById('gf-add'))) { el.onclick = function () { syncG(); S.gform.members.push({ email: '', name: '', type: '', owner: false }); paint(); }; }
    each(box, '[data-gdel]', function (b) { b.onclick = function () { syncG(); S.gform.members.splice(Number(b.getAttribute('data-gdel')), 1); paint(); }; });
    each(box, '[data-gm][data-k="email"]', function (inp) { inp.onchange = function () { syncG(); paint(); }; });
    each(box, '[data-gedit]', function (b) { b.onclick = function () { var g = (S.groups || []).find(function (x) { return x.group_id === b.getAttribute('data-gedit'); }); if (g) { S.gform = { group_id: g.group_id, group_name: g.group_name, members: g.members.map(function (m) { return { email: m.email, name: m.name, type: m.type, owner: g.owners.indexOf(m.email) >= 0 }; }) }; S.flash = null; paint(); } }; });
    each(box, '[data-grm]', function (b) { b.onclick = function () { if (!confirm('Ye group hata dein? Members ke apne documents waise hi rahenge.')) { return; } call(VAULT, { action: 'group_delete', group_id: b.getAttribute('data-grm') }).then(function (r) { S.flash = r && r.ok ? ['k', r.msg] : ['e', (r && r.error) || 'Nahi hua.']; loadGroups(); S.clients = null; call(VAULT, { action: 'clients' }).then(function (v) { S.clients = (v && v.ok) ? v.clients : []; }); }); }; });
    if ((el = document.getElementById('gf-go'))) {
      el.onclick = function () {
        syncG(); var f = S.gform, btn = this;
        var mem = f.members.map(function (m) { return { email: String(m.email || '').trim().toLowerCase(), name: String(m.name || '').trim(), type: String(m.type || '').trim() }; }).filter(function (m) { return m.email; });
        var own = f.members.filter(function (m) { return m.owner && m.email; }).map(function (m) { return String(m.email).trim().toLowerCase(); });
        btn.disabled = true; say('gf-m', 'Save ho raha hai...');
        call(VAULT, { action: 'group_save', group_id: f.group_id || '', group_name: f.group_name || '', members: mem, owners: own }).then(function (r) {
          btn.disabled = false;
          if (r && r.ok) { S.gform = null; S.flash = ['k', r.msg]; loadGroups(); call(VAULT, { action: 'clients' }).then(function (v) { if (v && v.ok) { S.clients = v.clients; } }); }
          else { say('gf-m', (r && r.error) || 'Save nahi hua.', 'e'); }
        }).catch(function () { btn.disabled = false; say('gf-m', 'Network error.', 'e'); });
      };
    }
    each(box, '[data-cl]', function (b) { b.onclick = function () { S.sel = b.getAttribute('data-cl'); S.tab = 'docs'; S.upOpen = false; S.credForm = null; S.flash = null; paint(); if (!S.creds[S.sel]) { loadCreds(S.sel); } }; });
    each(box, '[data-tab]', function (b) { b.onclick = function () { S.tab = b.getAttribute('data-tab'); S.upOpen = false; S.credForm = null; paint(); }; });
    each(box, '[data-cp]', function (b) { b.onclick = function () { copy(b.getAttribute('data-cp'), b); }; });
    each(box, '[data-hide]', function (b) { b.onclick = function () { delete S.revealed[b.getAttribute('data-hide')]; paint(); }; });
    each(box, '[data-rv]', function (b) {
      b.onclick = function () {
        var id = b.getAttribute('data-rv'); b.disabled = true; b.textContent = '...';
        call(VAULT, { action: 'reveal', cred_id: id }).then(function (r) {
          if (r && r.ok) { S.revealed[id] = r.secret; setTimeout(function () { delete S.revealed[id]; paint(); }, 60000); paint(); }
          else { b.disabled = false; b.textContent = 'Dikhaiye'; alert((r && r.error) || 'Nahi hua.'); }
        }).catch(function () { b.disabled = false; b.textContent = 'Dikhaiye'; });
      };
    });
    each(box, '[data-tg]', function (cb) {
      cb.onchange = function () {
        var id = cb.getAttribute('data-tg'), on = cb.checked;
        cb.disabled = true;
        call(VAULT, { action: 'toggle', cred_id: id, show_client: on }).then(function (r) {
          if (r && r.ok) { (S.creds[S.sel] || []).forEach(function (x) { if (x.cred_id === id) { x.show_client = on; } }); S.flash = ['k', r.msg]; }
          else { S.flash = ['e', (r && r.error) || 'Nahi hua.']; }
          paint();
        }).catch(function () { cb.disabled = false; cb.checked = !on; });
      };
    });
    each(box, '[data-ed]', function (b) { b.onclick = function () { var id = b.getAttribute('data-ed'); var c = (S.creds[S.sel] || []).find(function (x) { return x.cred_id === id; }); if (c) { S.credForm = { cred_id: c.cred_id, portal: c.portal, login_id: c.login_id, extra: c.extra, show_client: c.show_client }; S.flash = null; paint(); } }; });
    each(box, '[data-rc]', function (b) {
      b.onclick = function () {
        if (!confirm('Ye portal login hata dein?')) { return; }
        call(VAULT, { action: 'delete', cred_id: b.getAttribute('data-rc') }).then(function (r) { S.flash = r && r.ok ? ['k', r.msg] : ['e', (r && r.error) || 'Nahi hua.']; loadCreds(S.sel); bumpClient(S.sel, 'creds', -1); });
      };
    });
    if ((el = document.getElementById('vf-go'))) {
      el.onclick = function () {
        var f = S.credForm || {}, btn = this;
        var body = { action: 'save', client_email: S.sel, cred_id: f.cred_id || '', portal: document.getElementById('vf-p').value, login_id: document.getElementById('vf-l').value.trim(), secret: document.getElementById('vf-s').value, extra: document.getElementById('vf-x').value.trim(), show_client: document.getElementById('vf-sh').checked };
        if (!body.login_id) { say('vf-m', 'Login ID bhariye.', 'e'); return; }
        if (!f.cred_id && !body.secret) { say('vf-m', 'Password bhariye.', 'e'); return; }
        btn.disabled = true; say('vf-m', 'Save ho raha hai...');
        call(VAULT, body).then(function (r) {
          btn.disabled = false;
          if (r && r.ok) { S.credForm = null; S.flash = ['k', r.msg]; if (!f.cred_id) { bumpClient(S.sel, 'creds', 1); } loadCreds(S.sel); }
          else { say('vf-m', (r && r.error) || 'Save nahi hua.', 'e'); }
        }).catch(function () { btn.disabled = false; say('vf-m', 'Network error.', 'e'); });
      };
    }
    if ((el = document.getElementById('lk-go'))) {
      el.onclick = function () {
        var go = this, fi = document.getElementById('lk-f'), f = fi && fi.files && fi.files[0], eng = document.getElementById('lk-eng');
        if (!f) { say('lk-m', 'File chuniye.', 'e'); return; }
        if (f.size > MAX) { say('lk-m', 'File 8 MB se badi hai.', 'e'); return; }
        var body = { action: 'upload', file_name: f.name, mime: f.type || '', title: (document.getElementById('lk-t').value || '').trim() || f.name, eng_id: eng ? eng.value : '' };
        var ct = document.getElementById('lk-cat'); if (ct) { body.category = ct.value; }
        var wh = document.getElementById('lk-who'); if (wh) { body.client_email = wh.value; }
        if (role() !== 'client' && !body.eng_id) {
          if (S.sel) { body.client_email = S.sel; var cc = (S.clients || []).find(function (x) { return x.email === S.sel; }); body.client_name = cc ? cc.name : ''; }
          else { var ce = document.getElementById('lk-ce'); body.client_email = ce ? ce.value.trim().toLowerCase() : ''; var cn = document.getElementById('lk-cn'); body.client_name = cn ? cn.value.trim() : ''; }
          if (!isAll()) { say('lk-m', 'Pehle service chuniye.', 'e'); return; }
          if (!/^[^@ ]+@[^@ ]+\.[^@ ]+$/.test(body.client_email || '')) { say('lk-m', 'Client ka sahi email daaliye.', 'e'); return; }
        }
        go.disabled = true; say('lk-m', 'Upload ho raha hai... (' + kb(f.size) + ')');
        var rd = new FileReader();
        rd.onerror = function () { go.disabled = false; say('lk-m', 'File padh nahi paaye.', 'e'); };
        rd.onload = function () {
          body.b64 = String(rd.result).split(',')[1] || '';
          call(DOCS, body).then(function (r) {
            go.disabled = false;
            if (r && r.ok) { S.upOpen = false; S.flash = ['k', r.msg || 'Upload ho gaya.']; loadAll(); }
            else { say('lk-m', (r && r.error) || 'Upload nahi hua.', 'e'); }
          }).catch(function () { go.disabled = false; say('lk-m', 'Network error.', 'e'); });
        };
        rd.readAsDataURL(f);
      };
    }
    each(box, '[data-dl]', function (b) {
      b.onclick = function () {
        var id = b.getAttribute('data-dl'), t = b.textContent; b.disabled = true; b.textContent = 'Aa raha hai...';
        call(DOCS, { action: 'download', doc_id: id }).then(function (r) {
          b.disabled = false; b.textContent = t;
          if (!r || !r.ok || !r.b64) { alert((r && r.error) || 'Download nahi hua.'); return; }
          var url = URL.createObjectURL(b64Blob(r.b64, r.mime)), a = document.createElement('a');
          a.href = url; a.download = r.name || 'document'; document.body.appendChild(a); a.click();
          setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 15000);
        }).catch(function () { b.disabled = false; b.textContent = t; });
      };
    });
    each(box, '[data-rm]', function (b) {
      b.onclick = function () {
        if (!confirm('Ye document locker se hata dein?')) { return; }
        b.disabled = true;
        call(DOCS, { action: 'delete', doc_id: b.getAttribute('data-rm') }).then(function (r) { S.flash = r && r.ok ? ['k', r.msg] : ['e', (r && r.error) || 'Nahi hua.']; loadAll(); });
      };
    });
  }
  function bumpClient(em, k, n) { (S.clients || []).forEach(function (c) { if (c.email === em) { c[k] = Math.max(0, (c[k] || 0) + n); } }); }

  function inject() {
    var top = app.querySelector('.cp-top');
    if (!top) { if (!sess()) { S.docs = null; S.clients = null; S.sel = null; S.creds = {}; S.revealed = {}; S.myCreds = null; } return; }
    if (document.getElementById('cp-locker')) { return; }
    var box = document.createElement('div');
    box.id = 'cp-locker'; box.className = 'cp-card';
    var anchor = app.querySelector('.cp-kpis') || top;
    anchor.parentNode.insertBefore(box, anchor.nextSibling);
    paint();
    if (!S.docs && !S.loading) { loadAll(); }
  }
  document.addEventListener('click', function (ev) {
    var t = ev.target;
    if (t && (t.id === 'cp-ref' || t.id === 'cp-out')) { S.docs = null; S.clients = null; S.creds = {}; S.revealed = {}; S.myCreds = null; S.ents = null; S.groups = null; S.flash = null; S.upOpen = false; if (t.id === 'cp-out') { S.sel = null; S.ent = ''; S.gview = false; } }
  }, true);
  new MutationObserver(inject).observe(app, { childList: true });
  inject();
})();
