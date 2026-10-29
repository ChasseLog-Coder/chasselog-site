/* Statistiques anonymes du site chasselog.be : sans cookie, sans identification.
   Un identifiant aléatoire est créé pour la visite en cours (sessionStorage) et disparaît à la fermeture de l'onglet. */
(function(){
 if(navigator.doNotTrack=="1"||navigator.globalPrivacyControl)return;
 if(!/chasselog\.be$/.test(location.hostname))return;
 var KEY="phc_woUjwnMErQuDhrGrf6xSqha8cNxVnF8JCSZNhTpzWisJ",HOST="https://eu.i.posthog.com";
 function v7(){var t=Date.now().toString(16).padStart(12,"0"),r=new Uint8Array(10);crypto.getRandomValues(r);
  var h=Array.prototype.map.call(r,function(b){return b.toString(16).padStart(2,"0")}).join("");
  return t.slice(0,8)+"-"+t.slice(8)+"-7"+h.slice(0,3)+"-"+((parseInt(h.slice(3,4),16)&3)|8).toString(16)+h.slice(4,7)+"-"+h.slice(7,19)}
 var sid;try{sid=sessionStorage.getItem("cl_sid");if(!sid){sid=v7();sessionStorage.setItem("cl_sid",sid)}}catch(e){sid=sid||v7()}
 var ref="";try{if(document.referrer){var u=new URL(document.referrer);if(u.hostname!=location.hostname)ref=u.hostname}}catch(e){}
 var q=new URLSearchParams(location.search);
 function send(ev,p){try{var props={$current_url:location.origin+location.pathname,$host:location.hostname,$pathname:location.pathname,
   $referrer:ref?"https://"+ref+"/":"$direct",$referring_domain:ref||"$direct",$session_id:sid,$process_person_profile:false,
   $screen_width:screen.width,$lib:"chasselog-site",site:true};
  if(q.get("utm_source"))props.utm_source=q.get("utm_source");if(q.get("utm_campaign"))props.utm_campaign=q.get("utm_campaign");
  for(var k in p)props[k]=p[k];
  fetch(HOST+"/batch/",{method:"POST",keepalive:true,headers:{"Content-Type":"application/json"},
   body:JSON.stringify({api_key:KEY,batch:[{event:ev,distinct_id:sid,timestamp:new Date().toISOString(),properties:props}]})}).catch(function(){})}catch(e){}}
 window.clStat=send;
 send("$pageview",{});
 document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(!a)return;var h=a.getAttribute("href"),d="";
  if(/facebook\.com/.test(h))d="facebook";else if(/ko-fi\.com/.test(h))d="kofi";else if(/android\.html/.test(h))d="android";else if(/iphone\.html/.test(h))d="iphone";
  else if(/github\.io\/ChasseLog/.test(a.href))d="app";else if(/play\.google/.test(h))d="play";else if(/^mailto:/.test(h))d="contact";
  if(d)send("site_click",{dest:d})},true);
})();
