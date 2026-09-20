/* CGA language switcher — EN / हिंदी / Hinglish. Dictionary: /data/i18n.json  {"source text":[en,hi,hl]}  ("" = keep source) */
(function(){
  var KEY='cga_lang', IDX={en:0,hi:1,hl:2}, LABEL=[['en','EN'],['hi','हिंदी'],['hl','Hinglish']];
  var cur=null, dict=null, busy=false, rec=new WeakMap(), arec=new WeakMap(), title0=document.title;
  try{cur=localStorage.getItem(KEY)}catch(e){}
  try{var q=new URLSearchParams(location.search).get('lang'); if(q&&IDX[q]!=null){cur=q; localStorage.setItem(KEY,q)}}catch(e){}
  if(cur&&IDX[cur]==null) cur=null;
  var SKIP={SCRIPT:1,STYLE:1,NOSCRIPT:1,TEXTAREA:1,CODE:1,PRE:1,SVG:1};
  var ATTRS=['placeholder','title','aria-label'];
  function norm(s){return String(s).replace(/\s+/g,' ').trim()}
  function look(src){ if(!dict||!cur) return null; var e=dict[norm(src)]; return e&&e[IDX[cur]]?e[IDX[cur]]:null }
  function wrap(src,t){ return src.match(/^\s*/)[0]+t+src.match(/\s*$/)[0] }
  function doText(n){
    var r=rec.get(n);
    if(!r||n.nodeValue!==r.s){ r={o:n.nodeValue}; rec.set(n,r) }
    var t=look(r.o), v=t?wrap(r.o,t):r.o;
    if(n.nodeValue!==v) n.nodeValue=v;
    r.s=v;
  }
  function doAttrs(el){
    var m=arec.get(el); if(!m){m={};arec.set(el,m)}
    ATTRS.forEach(function(a){
      if(!el.hasAttribute(a)) return;
      var val=el.getAttribute(a);
      if(!(a in m)||val!==m[a].s) m[a]={o:val};
      var t=look(m[a].o), v=t||m[a].o;
      if(val!==v) el.setAttribute(a,v);
      m[a].s=v;
    });
  }
  function walk(root){
    if(root.nodeType===3){ if(root.parentNode&&!SKIP[root.parentNode.nodeName.toUpperCase()]) doText(root); return }
    if(root.nodeType!==1||SKIP[root.nodeName.toUpperCase()]||(root.closest&&root.closest('[data-noi18n]'))) return;
    doAttrs(root);
    var w=document.createTreeWalker(root,5,{acceptNode:function(n){
      if(n.nodeType===1) return SKIP[n.nodeName.toUpperCase()]||n.hasAttribute('data-noi18n')?2:1;
      return /[A-Za-z\u0900-\u097F]/.test(n.nodeValue)?1:3 }});
    var n; while((n=w.nextNode())){ if(n.nodeType===3) doText(n); else doAttrs(n) }
  }
  function apply(){
    busy=true;
    document.documentElement.setAttribute('lang', cur==='hi'?'hi':'en');
    document.documentElement.setAttribute('data-lang', cur||'hl');
    var tt=look(title0); document.title=tt||title0;
    walk(document.body);
    paint();
    busy=false;
  }
  function paint(){
    var act=cur||'hl';
    document.querySelectorAll('.cga-lang button').forEach(function(b){ var on=b.getAttribute('data-l')===act; b.classList.toggle('on',on); b.setAttribute('aria-pressed',on) });
  }
  function load(cb){
    if(dict) return cb();
    fetch('/data/i18n.json',{cache:'default'}).then(function(r){return r.json()}).then(function(j){dict=j;cb()}).catch(function(){dict={};cb()});
  }
  function set(l){ cur=l; try{localStorage.setItem(KEY,l)}catch(e){} load(apply) }
  function ui(){
    var css=document.createElement('style');
    css.textContent='.cga-lang{display:inline-flex;gap:2px;border:1px solid rgba(255,255,255,.28);border-radius:99px;padding:2px;flex-shrink:0}'
     +'.cga-lang button{background:none;border:0;color:rgba(255,255,255,.85);font-family:inherit;font-size:.74rem;font-weight:600;line-height:1;padding:5px 9px;border-radius:99px;cursor:pointer;white-space:nowrap}'
     +'.cga-lang button.on{background:#4bbdd8;color:#00304a}'
     +'.cga-lang.float{position:fixed;left:12px;bottom:14px;z-index:9998;background:#005176;box-shadow:0 4px 14px rgba(0,0,0,.2)}'
     +'html[data-lang=hi] body{line-height:1.72}';
    document.head.appendChild(css);
    var box=document.createElement('div'); box.className='cga-lang'; box.setAttribute('role','group'); box.setAttribute('aria-label','Language / भाषा'); box.setAttribute('data-noi18n','');
    LABEL.forEach(function(p){ var b=document.createElement('button'); b.type='button'; b.setAttribute('data-l',p[0]); b.textContent=p[1]; b.onclick=function(){set(p[0])}; box.appendChild(b) });
    var bar=document.querySelector('.topbar .wrap');
    if(bar) bar.appendChild(box); else { box.classList.add('float'); document.body.appendChild(box) }
    paint();
  }
  function start(){
    ui();
    if(cur) load(apply);
    new MutationObserver(function(ms){
      if(busy||!cur||!dict) return; busy=true;
      ms.forEach(function(m){
        if(m.type==='characterData') walk(m.target);
        else if(m.type==='attributes') doAttrs(m.target);
        else m.addedNodes.forEach(walk);
      });
      busy=false;
    }).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTRS});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
  window.cgaSetLang=set;
})();
