import{aP as E,F as T,az as A}from"./C_J4HtAr.js";function j(e,i,r,u){var n,o,m=!1,R=r.length>=2,V=(d,a,f)=>{if(n=a,R&&(o=d),!m){let l=i(d,a,f);if(i.length<2)a(l);else return l}m=!1},b=E(e,V,u),k=!Array.isArray(e);function P(d){var a=r(d,o);k?(m=!0,e.set(a)):a.forEach((f,l)=>{m=!0,e[l].set(f)}),m=!1}var y=!1;function D(d){var a,f,l,s;if(y){s=d(T(b)),n(s);return}var Q=b.subscribe(x=>{y?a?f=!0:a=!0:l=x});s=d(l),y=!0,n(s),Q(),y=!1,f&&(s=T(b)),a&&P(s)}return{subscribe:b.subscribe,set(d){D(()=>d)},update:D}}const z=20,t=A([]),g=A(null),h=new Map,w=e=>{if(h.has(e))return;const i=setTimeout(()=>{h.delete(e),M(e)},1e3);h.set(e,i)},B=e=>{const i=h.get(e);i&&clearTimeout(i)};function F(e,i=!0){i&&e.id&&B(e.id),t.update(r=>r.map(u=>u.id===e.id?{...u,...e}:u))}function H(e){t.update(i=>[e,...i].slice(0,z))}function L(e){T(t).find(i=>i.id===e.id)?F(e):H(e)}function N(e){t.update(i=>(e?w(e):i.forEach(r=>{w(r.id)}),i.map(r=>r.id===e||e===void 0?{...r,visible:!1}:r)))}function M(e){t.update(i=>e===void 0?[]:i.filter(r=>r.id!==e))}function G(e){g.set(e)}function J(e){let i;g.update(r=>(i=e-(r||0),null)),t.update(r=>r.map(u=>({...u,pauseDuration:u.pauseDuration+i})))}const U={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3};function K(e={}){return{toasts:j(t,r=>r.map(u=>{var n,o;return{...e,...e[u.type],...u,duration:u.duration||((n=e[u.type])==null?void 0:n.duration)||(e==null?void 0:e.duration)||U[u.type],style:[e.style,(o=e[u.type])==null?void 0:o.style,u.style].join(";")}}),r=>r),pausedAt:g}}const W=e=>typeof e=="function",S=(e,i)=>W(e)?e(i):e,_=(()=>{let e=0;return()=>(e+=1,e.toString())})(),X=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){const i=matchMedia("(prefers-reduced-motion: reduce)");e=!i||i.matches}return e}})(),q=(e,i="blank",r)=>({createdAt:Date.now(),visible:!0,type:i,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,icon:r==null?void 0:r.icon,duration:r==null?void 0:r.duration,iconTheme:r==null?void 0:r.iconTheme,position:r==null?void 0:r.position,props:r==null?void 0:r.props,id:(r==null?void 0:r.id)||_()}),v=e=>(i,r)=>{const u=q(i,e,r);return L(u),u.id},c=(e,i)=>v("blank")(e,i);c.error=v("error");c.success=v("success");c.loading=v("loading");c.custom=v("custom");c.dismiss=e=>{N(e)};c.remove=e=>M(e);c.promise=(e,i,r)=>{const u=c.loading(i.loading,{...r,...r==null?void 0:r.loading});return e.then(n=>(c.success(S(i.success,n),{id:u,...r,...r==null?void 0:r.success}),n)).catch(n=>{c.error(S(i.error,n),{id:u,...r,...r==null?void 0:r.error})}),e};export{F as a,J as e,X as p,G as s,c as t,K as u};
