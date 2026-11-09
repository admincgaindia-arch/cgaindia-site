/* CGA festival greeting popup: once a day on festival days. Shareable card with CGA branding. */
(function () {
  'use strict';
  if (/portal\.html|engagement\.html|pay\.html/.test(location.pathname)) { return; }
  var F = [
    ['2026-11-08', '2026-11-08', 'Shubh Deepawali', '\u0936\u0941\u092d \u0926\u0940\u092a\u093e\u0935\u0932\u0940', 'Happy Diwali', 'Is Deepawali Maa Lakshmi aapke ghar aur vyapar mein sukh, samriddhi aur safalta laayein. Diyon ki roshni har andhera door kare.', '#7a1f00', '#e8590c', '\ud83e\ude94'],
    ['2026-11-09', '2026-11-09', 'Govardhan Puja', '\u0917\u094b\u0935\u0930\u094d\u0927\u0928 \u092a\u0942\u091c\u093e', 'Happy Govardhan Puja', 'Shri Krishna ki kripa se aapka ghar annakoot jaisa bhara rahe. Govardhan Puja ki hardik shubhkamnayein.', '#14532d', '#ca8a04', '\ud83d\ude4f'],
    ['2026-11-10', '2026-11-11', 'Bhai Dooj', '\u092d\u093e\u0908 \u0926\u0942\u091c', 'Happy Bhai Dooj', 'Bhai-behen ka ye pyaar aur vishwas hamesha aisa hi bana rahe. Bhai Dooj ki dher saari shubhkamnayein.', '#831843', '#db2777', '\ud83e\udee1'],
    ['2026-11-15', '2026-11-15', 'Chhath Puja', '\u091b\u0920 \u092a\u0942\u091c\u093e', 'Happy Chhath Puja', 'Chhathi Maiya aur Surya Dev ki kripa se aapke jeevan mein swasthya, samriddhi aur khushiyan bani rahein.', '#7c2d12', '#f59e0b', '\ud83c\udf05'],
    ['2026-11-24', '2026-11-24', 'Guru Nanak Jayanti', '\u0917\u0941\u0930\u0941 \u0928\u093e\u0928\u0915 \u091c\u092f\u0902\u0924\u0940', 'Happy Gurpurab', 'Guru Nanak Dev Ji ki seekh - sewa, sachchai aur barabari - hamesha hamara raasta roshan kare. Gurpurab aur Dev Deepawali ki shubhkamnayein.', '#1e3a8a', '#ea580c', '\ud83e\ude94'],
    ['2026-12-25', '2026-12-25', 'Merry Christmas', '\u092e\u0947\u0930\u0940 \u0915\u094d\u0930\u093f\u0938\u092e\u0938', 'Merry Christmas', 'Christmas ki khushiyan aapke ghar aur parivar mein prem, shanti aur umeed laayein.', '#7f1d1d', '#15803d', '\ud83c\udf84'],
    ['2027-01-01', '2027-01-01', 'Happy New Year 2027', '\u0928\u0935 \u0935\u0930\u094d\u0937 \u0915\u0940 \u0936\u0941\u092d\u0915\u093e\u092e\u0928\u093e\u090f\u0902', 'Happy New Year 2027', 'Naya saal 2027 aapke liye nayi safalta, behtar sehat aur tension-free compliance lekar aaye.', '#0f172a', '#005176', '\ud83c\udf86'],
    ['2027-01-13', '2027-01-14', 'Happy Lohri', '\u0932\u094b\u0939\u095c\u0940 \u0915\u0940 \u0932\u0916-\u0932\u0916 \u0935\u0927\u093e\u0907\u092f\u093e\u0902', 'Happy Lohri', 'Lohri ki aag mein saari pareshaniyan jal jaayein aur jeevan mein khushiyon ki fasal lehlahaye.', '#7c2d12', '#dc2626', '\ud83d\udd25'],
    ['2027-01-15', '2027-01-15', 'Makar Sankranti', '\u092e\u0915\u0930 \u0938\u0902\u0915\u094d\u0930\u093e\u0902\u0924\u093f', 'Happy Makar Sankranti', 'Surya ke uttarayan ke saath aapke jeevan mein bhi nayi oonchaiyan aur nayi roshni aaye.', '#0c4a6e', '#f59e0b', '\ud83e\ude81'],
    ['2027-01-26', '2027-01-26', 'Republic Day', '\u0917\u0923\u0924\u0902\u0924\u094d\u0930 \u0926\u093f\u0935\u0938', 'Happy Republic Day', 'Samvidhan ka samman, desh ki pragati. 78ve Gantantra Diwas ki hardik shubhkamnayein. Jai Hind!', '#9a3412', '#15803d', '\ud83c\uddee\ud83c\uddf3'],
    ['2027-03-21', '2027-03-22', 'Happy Holi', '\u0939\u094b\u0932\u0940 \u0915\u0940 \u0936\u0941\u092d\u0915\u093e\u092e\u0928\u093e\u090f\u0902', 'Happy Holi', 'Holi ke rang aapke jeevan mein khushiyon, prem aur safalta ke rang bhar dein. Bura na mano, Holi hai!', '#86198f', '#ea580c', '\ud83c\udfa8'],
    ['2027-04-13', '2027-04-14', 'Happy Baisakhi', '\u092c\u0948\u0938\u093e\u0916\u0940 \u0915\u0940 \u0935\u0927\u093e\u0907\u092f\u093e\u0902', 'Happy Baisakhi', 'Nayi fasal ki khushi aur mehnat ka phal - Baisakhi aapke ghar mein samriddhi laaye.', '#713f12', '#ca8a04', '\ud83c\udf3e'],
    ['2027-08-15', '2027-08-15', 'Independence Day', '\u0938\u094d\u0935\u0924\u0902\u0924\u094d\u0930\u0924\u093e \u0926\u093f\u0935\u0938', 'Happy Independence Day', 'Azaadi ka jashn, zimmedari ka vaada. Swatantrata Diwas ki hardik shubhkamnayein. Jai Hind!', '#9a3412', '#15803d', '\ud83c\uddee\ud83c\uddf3'],
    ['2027-08-16', '2027-08-17', 'Raksha Bandhan', '\u0930\u0915\u094d\u0937\u093e \u092c\u0902\u0927\u0928', 'Happy Raksha Bandhan', 'Rakhi ka ye pavitra dhaga bhai-behen ke rishte ko hamesha mazboot rakhe. Raksha Bandhan ki shubhkamnayein.', '#831843', '#f59e0b', '\ud83e\udee1'],
    ['2027-08-24', '2027-08-25', 'Janmashtami', '\u0936\u094d\u0930\u0940 \u0915\u0943\u0937\u094d\u0923 \u091c\u0928\u094d\u092e\u093e\u0937\u094d\u091f\u092e\u0940', 'Happy Janmashtami', 'Nand ke anand bhayo, jai Kanhaiya Lal ki! Shri Krishna aapke jeevan ko prem aur gyaan se bhar dein.', '#1e3a8a', '#7c3aed', '\ud83e\udeb6'],
    ['2027-09-04', '2027-09-04', 'Ganesh Chaturthi', '\u0917\u0923\u0947\u0936 \u091a\u0924\u0941\u0930\u094d\u0925\u0940', 'Happy Ganesh Chaturthi', 'Vighnaharta Shri Ganesh aapke har kaam ke vighn door karein aur nayi shuruaat shubh banayein.', '#9a3412', '#dc2626', '\ud83d\ude4f'],
    ['2027-10-09', '2027-10-10', 'Happy Dussehra', '\u0935\u093f\u091c\u092f\u093e\u0926\u0936\u092e\u0940 \u0915\u0940 \u0936\u0941\u092d\u0915\u093e\u092e\u0928\u093e\u090f\u0902', 'Happy Dussehra', 'Asatya par satya ki jeet ka ye parv aapke jeevan ki har mushkil par jeet laaye.', '#7f1d1d', '#ea580c', '\ud83c\udff9'],
    ['2027-10-29', '2027-10-29', 'Shubh Deepawali', '\u0936\u0941\u092d \u0926\u0940\u092a\u093e\u0935\u0932\u0940', 'Happy Diwali', 'Is Deepawali Maa Lakshmi aapke ghar aur vyapar mein sukh, samriddhi aur safalta laayein. Diyon ki roshni har andhera door kare.', '#7a1f00', '#e8590c', '\ud83e\ude94']
  ];
  var today = new Date(Date.now() + 19800000).toISOString().slice(0, 10);
  var f = null;
  for (var i = 0; i < F.length; i++) { if (today >= F[i][0] && today <= F[i][1]) { f = F[i]; break; } }
  if (!f) { return; }
  var KEY = 'cga-fest-' + today;
  try { if (localStorage.getItem(KEY)) { return; } } catch (e) {}
  var NAME_KEY = 'cga-fest-name';
  function getName() { try { return localStorage.getItem(NAME_KEY) || ''; } catch (e) { return ''; } }
  function setName(n) { try { localStorage.setItem(NAME_KEY, n); } catch (e) {} }
  var logo = new Image(); logo.src = '/assets/img/cga-logo-light.png';
  function wrapText(ctx, text, x, y, maxW, lh) {
    var words = text.split(' '), line = '', yy = y;
    for (var k = 0; k < words.length; k++) {
      var test = line ? line + ' ' + words[k] : words[k];
      if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, x, yy); line = words[k]; yy += lh; } else { line = test; }
    }
    if (line) { ctx.fillText(line, x, yy); }
    return yy;
  }
  function draw(canvas, name) {
    var W = 1080, H = 1350, ctx = canvas.getContext('2d');
    canvas.width = W; canvas.height = H;
    var g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, f[6]); g.addColorStop(1, f[7]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 0.12; ctx.fillStyle = '#ffffff';
    [[140, 180, 220], [960, 300, 160], [900, 1080, 260], [120, 1180, 140]].forEach(function (c) { ctx.beginPath(); ctx.arc(c[0], c[1], c[2], 0, Math.PI * 2); ctx.fill(); });
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(255,215,120,0.85)'; ctx.lineWidth = 6; ctx.strokeRect(40, 40, W - 80, H - 80);
    ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff';
    ctx.font = '150px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif'; ctx.fillText(f[8], W / 2, 300);
    ctx.fillStyle = '#ffe9a8'; ctx.font = 'bold 96px "Noto Sans Devanagari","Mangal","Mukta",sans-serif'; wrapText(ctx, f[3], W / 2, 470, W - 160, 110);
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 60px Georgia,"Times New Roman",serif'; ctx.fillText(f[4], W / 2, 640);
    ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.font = '40px Arial,sans-serif'; var yEnd = wrapText(ctx, f[5], W / 2, 740, W - 220, 56);
    if (name) { ctx.fillStyle = '#ffe9a8'; ctx.font = 'italic bold 46px Georgia,serif'; ctx.fillText('Shubhkamnayein: ' + name, W / 2, Math.max(yEnd + 110, 1010)); }
    ctx.fillStyle = 'rgba(0,41,61,0.92)'; ctx.fillRect(40, H - 230, W - 80, 190);
    if (logo.complete && logo.naturalWidth) { var lw = 300, lh = lw * logo.naturalHeight / logo.naturalWidth; ctx.drawImage(logo, 90, H - 135 - lh / 2, lw, lh); }
    ctx.textAlign = 'right'; ctx.fillStyle = '#ffffff'; ctx.font = 'bold 36px Arial,sans-serif'; ctx.fillText('CGA India', W - 90, H - 160);
    ctx.fillStyle = '#ffe9a8'; ctx.font = '30px Arial,sans-serif'; ctx.fillText('cgaindia.com  |  +91 99966 47888', W - 90, H - 112);
    ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.font = '24px Arial,sans-serif'; ctx.fillText('Tax \u00b7 GST \u00b7 Compliance \u00b7 Legal', W - 90, H - 74);
  }
  function msgText(name) { return f[2] + '! ' + f[5] + (name ? '\n\n- ' + name : '') + '\n\nShubhkamnayein: CGA India (cgaindia.com)'; }
  function open() {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
    var css = '#cgaFest{position:fixed;inset:0;z-index:2147483000;background:rgba(0,15,25,.72);display:flex;align-items:center;justify-content:center;padding:12px;font-family:Arial,sans-serif;animation:cgafi .35s ease}@keyframes cgafi{from{opacity:0}to{opacity:1}}' +
      '#cgaFest .cf-box{background:#fff;border-radius:18px;max-width:420px;width:100%;max-height:94vh;overflow:auto;padding:14px 14px 16px;position:relative;box-shadow:0 30px 80px rgba(0,0,0,.45)}' +
      '#cgaFest .cf-x{position:absolute;right:20px;top:20px;z-index:3;width:38px;height:38px;border:0;border-radius:50%;background:rgba(255,255,255,.95);box-shadow:0 2px 10px rgba(0,0,0,.3);font-size:26px;line-height:38px;text-align:center;padding:0;cursor:pointer;color:#00293d}' +
      '#cgaFest canvas{width:100%;height:auto;border-radius:12px;display:block}' +
      '#cgaFest .cf-name{display:flex;gap:6px;margin:10px 0 8px}#cgaFest .cf-name input{flex:1;min-width:0;border:1.5px solid #c3d2da;border-radius:8px;padding:9px 10px;font-size:15px}' +
      '#cgaFest .cf-btns{display:grid;grid-template-columns:1fr 1fr;gap:8px}#cgaFest button.cf-b{border:0;border-radius:10px;padding:11px 8px;font-weight:700;font-size:14px;cursor:pointer}' +
      '#cgaFest .cf-wa{grid-column:1/-1;background:#1d7a4f;color:#fff;font-size:16px!important}#cgaFest .cf-dl{background:#005176;color:#fff}#cgaFest .cf-cp{background:#eef4f7;color:#00293d}#cgaFest .cf-ok{font-size:13px;color:#17773f;text-align:center;min-height:18px;margin:8px 0 0}';
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var ov = document.createElement('div'); ov.id = 'cgaFest'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', f[2] + ' greeting');
    ov.innerHTML = '<div class="cf-box"><button type="button" class="cf-x" aria-label="Band kariye">&times;</button><canvas></canvas>' +
      '<div class="cf-name"><input type="text" maxlength="32" placeholder="Apna naam card par jodiye (optional)"><button type="button" class="cf-b cf-cp" data-a="name">Jodiye</button></div>' +
      '<div class="cf-btns"><button type="button" class="cf-b cf-wa" data-a="share">WhatsApp status / share kariye</button><button type="button" class="cf-b cf-dl" data-a="dl">Image download</button><button type="button" class="cf-b cf-cp" data-a="copy">Message copy</button></div><p class="cf-ok"></p></div>';
    document.body.appendChild(ov);
    var cv = ov.querySelector('canvas'), inp = ov.querySelector('input'), ok = ov.querySelector('.cf-ok');
    inp.value = getName();
    function redraw() { draw(cv, inp.value.trim()); }
    redraw(); logo.onload = redraw;
    function close() { if (ov.parentNode) { ov.parentNode.removeChild(ov); } }
    ov.addEventListener('click', function (ev) { if (ev.target === ov) { close(); } });
    ov.querySelector('.cf-x').onclick = close;
    function blob(cb) { if (cv.toBlob) { cv.toBlob(cb, 'image/jpeg', 0.92); } else { cb(null); } }
    function fileName() { return 'CGA-' + f[4].replace(/[^A-Za-z0-9]+/g, '-') + '.jpg'; }
    function download() { var a = document.createElement('a'); a.href = cv.toDataURL('image/jpeg', 0.92); a.download = fileName(); document.body.appendChild(a); a.click(); a.parentNode.removeChild(a); }
    ov.addEventListener('click', function (ev) {
      var b = ev.target.closest ? ev.target.closest('[data-a]') : null; if (!b) { return; }
      var a = b.getAttribute('data-a'), nm = inp.value.trim();
      if (a === 'name') { setName(nm); redraw(); ok.textContent = nm ? 'Naam jud gaya!' : ''; return; }
      if (a === 'copy') { var t = msgText(nm); if (navigator.clipboard) { navigator.clipboard.writeText(t).then(function () { ok.textContent = 'Message copy ho gaya!'; }, function () { ok.textContent = t; }); } else { ok.textContent = t; } return; }
      if (a === 'dl') { download(); ok.textContent = 'Image download ho gayi - ab status par lagaiye.'; return; }
      if (a === 'share') {
        setName(nm); redraw();
        blob(function (bl) {
          var file = null; try { file = bl ? new File([bl], fileName(), { type: 'image/jpeg' }) : null; } catch (e) { file = null; }
          if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], text: msgText(nm) }).then(function () { ok.textContent = 'Shukriya! Aapne shubhkamnayein share ki.'; }, function () {});
          } else {
            download();
            window.open('https://wa.me/?text=' + encodeURIComponent(msgText(nm)), '_blank', 'noopener');
            ok.textContent = 'Image download ho gayi - WhatsApp mein status par lagaiye.';
          }
        });
      }
    });
  }
  function start() { setTimeout(open, 2500); }
  if (document.readyState === 'complete') { start(); } else { window.addEventListener('load', start); }
})();
