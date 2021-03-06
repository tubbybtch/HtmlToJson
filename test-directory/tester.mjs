import HtmlToJson from "./HtmlToJson.mjs";

var html = '<!DOCTYPE html><head><script nonce="260d3608-623d-4f41-b28a-c35f38b82680">(function(w,d){!function(a,e,t,r){a.zarazData=a.zarazData||{},a.zarazData.executed=[],a.zarazData.tracks=[],a.zaraz={deferred:[]},a.zaraz.track=(e,t)=>{for(key in a.zarazData.tracks.push(e),t)a.zarazData["z_"+key]=t[key]},a.zaraz._preSet=[],a.zaraz.set=(e,t,r)=>{a.zarazData["z_"+e]=t,a.zaraz._preSet.push([e,t,r])},a.addEventListener("DOMContentLoaded",(()=>{var t=e.getElementsByTagName(r)[0],z=e.createElement(r),n=e.getElementsByTagName("title")[0];n&&(a.zarazData.t=e.getElementsByTagName("title")[0].text),a.zarazData.w=a.screen.width,a.zarazData.h=a.screen.height,a.zarazData.j=a.innerHeight,a.zarazData.e=a.innerWidth,a.zarazData.l=a.location.href,a.zarazData.r=e.referrer,a.zarazData.k=a.screen.colorDepth,a.zarazData.n=e.characterSet,a.zarazData.o=(new Date).getTimezoneOffset(),z.defer=!0,z.src="/cdn-cgi/zaraz/s.js?z="+btoa(encodeURIComponent(JSON.stringify(a.zarazData))),t.parentNode.insertBefore(z,t)}))}(w,d,0,"script");})(window,document);</script><title>A Sample HTML Document (Test File)</title><meta charset="utf-8"><meta name="description" content="A blank HTML document for testing purposes."><meta name="author" content="Six Revisions"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" href="http://sixrevisions.com/favicon.ico" type="image/x-icon" /></head><body><h1>A Sample HTML Document (Test File)</h1><p>A blank HTML document for testing purposes.</p><p><a href="../html5download-demo.html">Go back to the demo</a></p><p><a href="http://sixrevisions.com/html5/download-attribute/">Read the HTML5 download attribute guide</a></p></body></html>';


var h2j = new HtmlToJson(html);
console.log(h2j.toString());



