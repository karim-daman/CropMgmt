import{ac as V,aD as T,aE as L,aF as C,F as E,j as U,k as Y,I as q,ai as I,aG as x,aH as $,aI as z,h,aa as c,a1 as j,ag as N,a5 as A,aJ as O,aK as J,av as K,aL as S,a6 as b,aj as Q,aM as X,aN as Z,ar as ee,al as te,aO as re,a8 as ae,p as ne,y as oe,a as ie}from"./I5jpou1v.js";function me(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const se=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function ye(e){return se.includes(e)}const ue={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function ge(e){return e=e.toLowerCase(),ue[e]??e}const ce=["touchstart","touchmove"];function fe(e){return ce.includes(e)}function Ee(e,t){if(t){const r=document.body;e.autofocus=!0,V(()=>{document.activeElement===r&&e.focus()})}}let D=!1;function le(){D||(D=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const r of e.target.elements)(t=r.__on_r)==null||t.call(r)})},{capture:!0}))}function F(e){var t=C,r=E;T(null),L(null);try{return e()}finally{T(t),L(r)}}function we(e,t,r,o=r){e.addEventListener(t,()=>F(r));const n=e.__on_r;n?e.__on_r=()=>{n(),o(!0)}:e.__on_r=()=>o(!0),le()}const H=new Set,P=new Set;function de(e,t,r,o={}){function n(a){if(o.capture||g.call(t,a),!a.cancelBubble)return F(()=>r==null?void 0:r.call(this,a))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?V(()=>{t.addEventListener(e,n,o)}):t.addEventListener(e,n,o),n}function be(e,t,r,o,n){var a={capture:o,passive:n},i=de(e,t,r,a);(t===document.body||t===window||t===document)&&U(()=>{t.removeEventListener(e,i,a)})}function Te(e){for(var t=0;t<e.length;t++)H.add(e[t]);for(var r of P)r(e)}function g(e){var M;var t=this,r=t.ownerDocument,o=e.type,n=((M=e.composedPath)==null?void 0:M.call(e))||[],a=n[0]||e.target,i=0,_=e.__root;if(_){var l=n.indexOf(_);if(l!==-1&&(t===document||t===window)){e.__root=t;return}var m=n.indexOf(t);if(m===-1)return;l<=m&&(i=l)}if(a=n[i]||e.target,a!==t){Y(e,"currentTarget",{configurable:!0,get(){return a||r}});var k=C,f=E;T(null),L(null);try{for(var s,u=[];a!==null;){var d=a.assignedSlot||a.parentNode||a.host||null;try{var p=a["__"+o];if(p!==void 0&&!a.disabled)if(q(p)){var[B,...G]=p;B.apply(a,[e,...G])}else p.call(a,e)}catch(w){s?u.push(w):s=w}if(e.cancelBubble||d===t||d===null)break;a=d}if(s){for(let w of u)queueMicrotask(()=>{throw w});throw s}}finally{e.__root=t,delete e.currentTarget,T(k),L(f)}}}function _e(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function v(e,t){var r=E;r.nodes_start===null&&(r.nodes_start=e,r.nodes_end=t)}function Le(e,t){var r=(t&$)!==0,o=(t&z)!==0,n,a=!e.startsWith("<!>");return()=>{if(h)return v(c,null),c;n===void 0&&(n=_e(a?e:"<!>"+e),r||(n=I(n)));var i=o||x?document.importNode(n,!0):n.cloneNode(!0);if(r){var _=I(i),l=i.lastChild;v(_,l)}else v(i,i);return i}}function Ne(e=""){if(!h){var t=N(e+"");return v(t,t),t}var r=c;return r.nodeType!==3&&(r.before(r=N()),A(r)),v(r,r),r}function ke(){if(h)return v(c,null),c;var e=document.createDocumentFragment(),t=document.createComment(""),r=N();return e.append(t,r),v(t,r),e}function Se(e,t){if(h){E.nodes_end=c,j();return}e!==null&&e.before(t)}function Ie(e,t){var r=t==null?"":typeof t=="object"?t+"":t;r!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=r,e.nodeValue=r+"")}function ve(e,t){return W(e,t)}function Ae(e,t){O(),t.intro=t.intro??!1;const r=t.target,o=h,n=c;try{for(var a=I(r);a&&(a.nodeType!==8||a.data!==J);)a=K(a);if(!a)throw S;b(!0),A(a),j();const i=W(e,{...t,anchor:a});if(c===null||c.nodeType!==8||c.data!==Q)throw X(),S;return b(!1),i}catch(i){if(i===S)return t.recover===!1&&Z(),O(),ee(r),b(!1),ve(e,t);throw i}finally{b(o),A(n)}}const y=new Map;function W(e,{target:t,anchor:r,props:o={},events:n,context:a,intro:i=!0}){O();var _=new Set,l=f=>{for(var s=0;s<f.length;s++){var u=f[s];if(!_.has(u)){_.add(u);var d=fe(u);t.addEventListener(u,g,{passive:d});var p=y.get(u);p===void 0?(document.addEventListener(u,g,{passive:d}),y.set(u,1)):y.set(u,p+1)}}};l(te(H)),P.add(l);var m=void 0,k=re(()=>{var f=r??t.appendChild(N());return ae(()=>{if(a){ne({});var s=oe;s.c=a}n&&(o.$$events=n),h&&v(f,null),m=e(f,o)||{},h&&(E.nodes_end=c),a&&ie()}),()=>{var d;for(var s of _){t.removeEventListener(s,g);var u=y.get(s);--u===0?(document.removeEventListener(s,g),y.delete(s)):y.set(s,u)}P.delete(l),f!==r&&((d=f.parentNode)==null||d.removeChild(f))}});return R.set(m,k),m}let R=new WeakMap;function Oe(e,t){const r=R.get(e);return r?(R.delete(e),r(t)):Promise.resolve()}const pe="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(pe);export{Se as a,le as b,de as c,Te as d,be as e,Ee as f,ye as g,Ae as h,me as i,ke as j,Ne as k,we as l,ve as m,ge as n,Ie as s,Le as t,Oe as u};
