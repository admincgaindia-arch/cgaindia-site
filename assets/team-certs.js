/* CGA Team Recognition 2026 — certificate badges + viewer on team.html */
(function(){
'use strict';
var T={
 SE:{t:'Certificate of Excellence',b:'#00293d',a:'#b08a3e',e:'CGA TEAM RECOGNITION \u00b7 LEADERSHIP \u00b7 2026',k:'\u0928\u0947\u0924\u0943\u0924\u094d\u0935 \u00b7 \u0935\u093f\u0936\u094d\u0935\u093e\u0938 \u00b7 \u0909\u0924\u094d\u0915\u0943\u0937\u094d\u091f\u0924\u093e',s:'LEADERSHIP',d:1,c:'In recognition of your leadership as Senior Executive{x} \u2014 the point of contact our clients trust, the guide for our team, and the steady hand behind accurate, on-time work.'},
 SA:{t:'Certificate of Merit',b:'#005176',a:'#b08a3e',e:'CGA TEAM RECOGNITION \u00b7 2026',k:'\u0928\u093f\u0937\u094d\u0920\u093e \u00b7 \u0915\u094c\u0936\u0932 \u00b7 \u091c\u093c\u093f\u092e\u094d\u092e\u0947\u0926\u093e\u0930\u0940',s:'MERIT',d:0,c:'In recognition of your dependable contribution as Senior Assistant \u2014 the expertise in accounts and finance that keeps every client file accurate and on time.'},
 AS:{t:'Certificate of Appreciation',b:'#005176',a:'#0e7ea0',e:'CGA TEAM RECOGNITION \u00b7 2026',k:'\u0906\u092a\u0915\u093e \u092f\u094b\u0917\u0926\u093e\u0928, \u0939\u092e\u093e\u0930\u0940 \u092a\u0939\u091a\u093e\u0928',s:'APPRECIATION',d:0,c:'In appreciation of your dedicated contribution as Assistant \u2014 the careful execution behind every return, reconciliation and filing that reaches our clients on time.'},
 JA:{t:'Rising Professional Award',b:'#0e7ea0',a:'#4bbdd8',e:'CGA TEAM RECOGNITION \u00b7 2026',k:'\u0906\u091c \u0915\u0940 \u092e\u0947\u0939\u0928\u0924, \u0915\u0932 \u0915\u0940 \u092a\u0939\u091a\u093e\u0928',s:'RISING STAR',d:0,c:'In encouragement of your commitment and eagerness to learn as Junior Assistant \u2014 the effort you put in today builds the professional you will be tomorrow.'}
};
var S=[['Naveen Kumar','SE',' over 6+ years'],['Krishan Kumar','SE',' over 5+ years'],['Suresh Kumar','SE',' over 5+ years'],['Shrey Jain','SE',' over 3+ years'],['Pankaj','SE',' over 3+ years'],
['Kanika','SA',''],['Ranjay','AS',''],['Ravi','AS',''],['Hemant Sharma','AS',''],['Sanjay Kumar','AS',''],['Deepak','AS',''],['Shubham','AS',''],
['Anurag','JA',''],['Ankit','JA',''],['Ritu','JA',''],['Kafi','JA',''],['Rahul','JA',''],['Sushil','JA',''],['Suman','JA',''],['Ashish Malik','JA',''],['Aniket','JA',''],['Vishal Bhoria','JA','']];
var MAP={};S.forEach(function(r,i){MAP[r[0].toLowerCase()]={n:r[0],k:r[1],x:r[2],no:'CGA/APR/2026/'+('00'+(i+1)).slice(-3)};});
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
var uid=0;
function seal(size,top){
 var k='cs'+(++uid),n=48,p=[],i,a,rr,rose='',rose2='';
 for(i=0;i<n*2;i++){a=Math.PI*i/n;rr=i%2?93:100;p.push((110+rr*Math.cos(a)).toFixed(2)+','+(110+rr*Math.sin(a)).toFixed(2));}
 for(i=0;i<24;i++){rose+='<ellipse cx="110" cy="110" rx="72" ry="30" transform="rotate('+(i*7.5)+' 110 110)" fill="none" stroke="#7a5a14" stroke-width=".45" opacity=".55"/>';
  rose2+='<circle cx="'+(110+12*Math.cos(i*Math.PI/12)).toFixed(2)+'" cy="'+(110+12*Math.sin(i*Math.PI/12)).toFixed(2)+'" r="58" fill="none" stroke="#fff6cc" stroke-width=".4" opacity=".6"/>';}
 return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 220 220" aria-hidden="true"><defs><linearGradient id="g'+k+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a5a14"/><stop offset=".22" stop-color="#e9cf7a"/><stop offset=".4" stop-color="#a8811f"/><stop offset=".55" stop-color="#fff0b0"/><stop offset=".72" stop-color="#b38a2a"/><stop offset="1" stop-color="#6e5012"/></linearGradient>'
 +'<path id="t'+k+'" d="M110,110 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0"/></defs>'
 +'<polygon points="'+p.join(' ')+'" fill="url(#g'+k+')"/><circle cx="110" cy="110" r="86" fill="none" stroke="#6e5012" stroke-width="1.2"/><circle cx="110" cy="110" r="82" fill="url(#g'+k+')" opacity=".9"/>'+rose+rose2
 +'<circle cx="110" cy="110" r="50" fill="url(#g'+k+')" stroke="#6e5012"/><circle cx="110" cy="110" r="45" fill="none" stroke="#fff3c4" stroke-width=".8" stroke-dasharray="2 2"/>'
 +(size>60?'<text font-family="Manrope,sans-serif" font-weight="700" font-size="11.5" letter-spacing="3.2" fill="#4a3608"><textPath href="#t'+k+'">TEAM CGA \u00b7 2026 \u00b7 CANJAIN GLOBAL ADVISORS \u00b7</textPath></text><text x="110" y="102" text-anchor="middle" font-family="Manrope,sans-serif" font-weight="700" font-size="9" letter-spacing="2.5" fill="#4a3608">'+top+'</text>':'')
 +'<text x="110" y="'+(size>60?126:122)+'" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-weight="700" font-size="'+(size>60?30:40)+'" fill="#3d2c06">CGA</text>'
 +(size>60?'<text x="110" y="141" text-anchor="middle" font-family="Manrope,sans-serif" font-weight="700" font-size="9" letter-spacing="2.5" fill="#4a3608">2026</text>':'')+'</svg>';
}
function corner(c,pos){return '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="'+c+'" stroke-width="1.6" style="position:absolute;'+pos+'" aria-hidden="true"><path d="M2 62V22C2 11 11 2 22 2h40"/><path d="M10 62V26c0-9 7-16 16-16h36"/><circle cx="22" cy="22" r="4"/></svg>';}
function cert(m){
 var t=T[m.k],a=t.a,f='<div style="position:absolute;inset:18px;border:10px solid '+t.b+'"></div>'+(t.d?'<div style="position:absolute;inset:30px;border:2px solid '+a+'"></div><div style="position:absolute;inset:36px;border:1px solid '+a+'"></div>':'<div style="position:absolute;inset:34px;border:1.5px solid '+a+'"></div>');
 ['left:36px;top:36px','right:36px;top:36px;transform:scaleX(-1)','left:36px;bottom:36px;transform:scaleY(-1)','right:36px;bottom:36px;transform:scale(-1,-1)'].forEach(function(p){f+=corner(a,p);});
 return '<div class="cc-paper">'+f+'<div class="cc-in"><img src="/assets/img/cga-logo.png" alt="Canjain Global Advisors" class="cc-logo">'
 +'<div class="cc-eye" style="color:'+(m.k==='JA'?'#0e7ea0':a)+'">'+t.e+'</div><div class="cc-title" style="color:'+(m.k==='SE'?'#7a5a14':'#00293d')+'">'+t.t+'</div><div class="cc-kick" lang="hi">'+t.k+'</div>'
 +'<div class="cc-mid"><div class="cc-pre">This certificate is proudly presented to</div><div class="cc-name">'+esc(m.n)+'</div><div class="cc-rule" style="border-color:'+a+'"></div><p class="cc-cit">'+esc(t.c.replace('{x}',m.x))+'</p></div>'
 +'<div class="cc-foot"><div class="cc-sig"><div class="cc-script">Neeraj Jain</div><div class="cc-line"></div><b>Neeraj Jain</b><span>Founder &amp; CEO, Canjain Global Advisors</span></div>'
 +'<div class="cc-seal">'+seal(150,t.s)+'</div><div class="cc-iss"><span>Issued at Canjain Global Advisors</span><b>October 2026</b></div></div>'
 +'<div class="cc-meta"><span>Certificate No. '+m.no+'</span><span>cgaindia.com</span><span>Mathura \u00b7 Delhi \u00b7 Rohtak \u00b7 Safidon</span></div></div></div>';
}
var CSS='.cc-badge{display:flex;align-items:center;justify-content:center;gap:8px;margin:10px auto 0;padding:7px 12px 7px 8px;border:1px solid #e3cf95;background:linear-gradient(180deg,#fffaf0,#fbf1d8);border-radius:999px;font-family:inherit;font-size:.72rem;font-weight:600;line-height:1.2;color:#6e5012;cursor:pointer;max-width:100%;transition:box-shadow .15s,transform .15s}'
+'.cc-badge:hover,.cc-badge:focus-visible{box-shadow:0 6px 18px -8px rgba(122,90,20,.55);transform:translateY(-1px);outline:none}.cc-badge:focus-visible{outline:2px solid #b08a3e;outline-offset:2px}.cc-badge svg{flex:none}.cc-badge span{text-align:left}.cc-badge{font-size:.72rem}@media(max-width:640px){.cc-badge{padding:6px 10px 6px 6px;gap:6px}}.cc-badge em{display:block;font-style:normal;font-weight:500;font-size:.66rem;color:#8a6a24}'
+'.cc-strip{display:flex;align-items:center;gap:22px;margin:56px 0 0;padding:22px 26px;border:1px solid #e3cf95;border-radius:16px;background:linear-gradient(120deg,#fffdf7,#fbf3df)}.cc-strip h3{margin:0;color:var(--navy,#005176);font-size:1.15rem}.cc-strip p{margin:6px 0 0;color:var(--slate,#46626f);font-size:.92rem;line-height:1.55}.cc-strip .cc-tiers{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.cc-strip .cc-tiers span{font-size:.72rem;font-weight:600;letter-spacing:.04em;padding:4px 10px;border-radius:999px;background:#fff;border:1px solid #e3cf95;color:#6e5012}@media(max-width:640px){.cc-strip{flex-direction:column;text-align:center}.cc-strip .cc-tiers{justify-content:center}}'
+'.cc-modal{position:fixed;inset:0;z-index:2147483000;background:rgba(0,25,38,.82);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;padding-top:max(20px,env(safe-area-inset-top));padding-bottom:max(20px,env(safe-area-inset-bottom))}.cc-modal[hidden]{display:none}'
+'.cc-stage{position:relative;box-shadow:0 30px 80px -20px rgba(0,0,0,.6)}.cc-scale{position:absolute;left:0;top:0;width:1123px;height:794px;transform-origin:0 0}'
+'.cc-bar{display:flex;gap:10px;margin-top:16px}.cc-bar button{font-family:inherit;font-size:.9rem;font-weight:600;line-height:1;padding:12px 20px;border-radius:999px;border:1px solid rgba(255,255,255,.5);background:transparent;color:#fff;cursor:pointer;min-height:44px}.cc-bar button.pri{background:#c9a557;border-color:#c9a557;color:#2b1f05}'
+'.cc-paper{width:1123px;height:794px;position:relative;box-sizing:border-box;background:#fbfaf6;overflow:hidden;font-family:Manrope,system-ui,sans-serif;color:#1d2b33;text-align:center}'
+'.cc-in{position:absolute;inset:0;box-sizing:border-box;padding:62px 110px 56px;display:flex;flex-direction:column;align-items:center}.cc-logo{width:260px;height:auto;display:block}'
+'.cc-eye{margin-top:16px;font-size:12px;letter-spacing:4px;font-weight:700}.cc-title{margin-top:10px;font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;font-size:60px;line-height:1}.cc-kick{margin-top:8px;font-family:"Noto Serif Devanagari",serif;font-size:15px;color:#4a5a63}'
+'.cc-mid{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center}.cc-pre{font-size:14px;letter-spacing:1px;color:#4a5a63}.cc-name{margin-top:6px;font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-weight:600;font-size:58px;line-height:1.15;color:#005176}.cc-rule{width:440px;margin-top:6px;border-top:1px solid}.cc-cit{margin:16px 0 0;max-width:760px;font-size:17px;line-height:1.65;color:#2c3b44}'
+'.cc-foot{width:100%;display:flex;align-items:flex-end;justify-content:space-between}.cc-sig,.cc-iss{width:260px;display:flex;flex-direction:column;align-items:center;gap:4px}.cc-script{font-family:"Great Vibes",cursive;font-size:44px;line-height:1;color:#0b2a4a;transform:rotate(-4deg)}.cc-line{width:230px;border-top:1.5px solid #1d2b33}.cc-sig b{font-size:15px}.cc-sig span{font-size:12px;color:#4a5a63}.cc-iss{font-size:13px;color:#4a5a63}.cc-iss b{color:#1d2b33}.cc-seal{margin-bottom:-6px;filter:drop-shadow(0 2px 3px rgba(80,60,10,.35))}'
+'.cc-meta{margin-top:12px;width:100%;display:flex;justify-content:space-between;font-size:11px;letter-spacing:1px;color:#5b6a72}'
+'@media print{body>*:not(.cc-modal){display:none!important}.cc-modal{position:static;background:none;padding:0}.cc-bar{display:none}.cc-stage{box-shadow:none;width:1123px!important;height:794px!important}.cc-scale{transform:none!important}@page{size:A4 landscape;margin:0}}';
var fontsLoaded=false;
function loadFonts(){if(fontsLoaded)return;fontsLoaded=true;var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Great+Vibes&family=Manrope:wght@400;500;700&family=Noto+Serif+Devanagari:wght@500&display=swap';document.head.appendChild(l);}
var modal,stage,scaler,lastFocus;
function fit(){if(!stage)return;var w=Math.min(window.innerWidth-40,1123),h=window.innerHeight-130,s=Math.min(w/1123,h/794);stage.style.width=(1123*s)+'px';stage.style.height=(794*s)+'px';scaler.style.transform='scale('+s+')';}
function onKey(e){if(e.key==='Escape')close();}
function close(){modal.hidden=true;document.body.style.overflow='';document.removeEventListener('keydown',onKey);window.removeEventListener('resize',fit);if(lastFocus)lastFocus.focus();}
function open(m){
 loadFonts();lastFocus=document.activeElement;
 if(!modal){modal=document.createElement('div');modal.className='cc-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Team certificate');
  modal.innerHTML='<div class="cc-stage"><div class="cc-scale"></div></div><div class="cc-bar"><button type="button" class="pri" data-cc-print>Print / Save PDF</button><button type="button" data-cc-close>Close</button></div>';
  document.body.appendChild(modal);stage=modal.querySelector('.cc-stage');scaler=modal.querySelector('.cc-scale');
  modal.addEventListener('click',function(e){if(e.target===modal||e.target.hasAttribute('data-cc-close'))close();if(e.target.hasAttribute('data-cc-print'))window.print();});}
 scaler.innerHTML=cert(m);modal.hidden=false;document.body.style.overflow='hidden';fit();
 window.addEventListener('resize',fit);document.addEventListener('keydown',onKey);modal.querySelector('[data-cc-close]').focus();
}
function init(){
 var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
 var cards=document.querySelectorAll('.tm-card'),done=0;
 cards.forEach(function(c){var b=c.querySelector('.tm-in > b');if(!b)return;var m=MAP[b.textContent.trim().toLowerCase()];if(!m)return;
  var btn=document.createElement('button');btn.type='button';btn.className='cc-badge';btn.setAttribute('aria-label',T[m.k].t+' \u2014 '+m.n+' \u2014 certificate dekhiye');
  btn.innerHTML=seal(26,'')+'<span>'+T[m.k].t+'<em>Certificate dekhiye</em></span>';
  btn.addEventListener('click',function(){open(m);});
  var small=c.querySelector('.tm-in small');(small||b).insertAdjacentElement('afterend',btn);done++;});
 if(!done)return;
 var heads=document.querySelectorAll('.sec-head'),target=null;
 heads.forEach(function(h){if(!target&&/Senior Executives/i.test(h.textContent))target=h;});
 if(target){var s=document.createElement('div');s.className='cc-strip reveal in';
  s.innerHTML='<div style="flex:none">'+seal(84,'')+'</div><div><h3>Team Recognition 2026</h3><p>CGA ne 2026 mein har team member ko unki zimmedari ke hisaab se certificate diya \u2014 Founder &amp; CEO Neeraj Jain ke signature ke saath. Kisi bhi profile par certificate dabakar dekhiye.</p><div class="cc-tiers"><span>Senior Executive \u00b7 Excellence</span><span>Senior Assistant \u00b7 Merit</span><span>Assistant \u00b7 Appreciation</span><span>Junior Assistant \u00b7 Rising Professional</span></div></div>';
  target.parentNode.insertBefore(s,target);target.style.marginTop='40px';}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
