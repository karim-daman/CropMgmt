import{t as C,e as q,a as w}from"../chunks/C2-o_NFQ.js";import"../chunks/CBx1LQFb.js";import{p as W,g as t,a as X,s as l,c as o,r as a,m as P,b as n,d as Q,t as T}from"../chunks/DAxARKWz.js";import{s as u}from"../chunks/DuW1ju0T.js";import{e as j,d as z,r as $,b as A}from"../chunks/Drn6uLDc.js";import{t as Y}from"../chunks/BTFpkzQ7.js";import{b as k}from"../chunks/DEjcX7-a.js";import{i as Z}from"../chunks/Bv01v2jc.js";import{a as tt,s as et,b as B}from"../chunks/AsitmpWD.js";var at=C('<button class="pressable rounded border px-4 py-2"> </button>'),st=C('<tr class="border-b"><td class="p-2"> </td><td class="p-2"> </td><td class="p-2"> </td><td class="p-2"> </td><td class="p-2"><button class="text-red-500 hover:text-red-700">Delete</button></td></tr>'),rt=C('<div class="rounded-lg bg-white p-6 shadow"><h1 class="mb-4 text-2xl font-bold">Achats</h1> <div class=" mb-4 flex space-x-4"></div> <div class="mb-4 grid grid-cols-4 gap-4"><input type="text" placeholder="Article" class="rounded border p-2"> <input type="number" placeholder="Prix" class="rounded border p-2"> <input type="number" placeholder="Quantity" class="rounded border p-2"> <button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Add</button></div> <table class="w-full"><thead><tr class="bg-gray-100"><th class="p-2 text-left">Article</th><th class="p-2 text-left">Prix</th><th class="p-2 text-left">Quantity</th><th class="p-2 text-left">Total</th><th class="p-2 text-left">Actions</th></tr></thead><tbody></tbody></table></div>');function vt(E,F){W(F,!1);const[H,I]=tt(),p=()=>et(A,"$achats",H);let d=P("Cnh");const J=["Cnh","Goweil","General"];let e=P({id:0,article:"",prix:0,quantity:0,total:0});function K(){n(e,t(e).id=Date.now()),n(e,t(e).total=t(e).prix*t(e).quantity),B(A,{...p(),[t(d)]:[...p()[t(d)],{...t(e)}]}),Q(e,{id:0,article:"",prix:0,quantity:0,total:0})}function L(s){B(A,{...p(),[t(d)]:p()[t(d)].filter(r=>r.id!==s)})}Z();var b=rt(),v=l(o(b),2);j(v,5,()=>J,z,(s,r)=>{var i=at(),c=o(i,!0);a(i),T(()=>{Y(i,"selected",t(d)===t(r)),u(c,t(r))}),q("click",i,()=>Q(d,t(r))),w(s,i)}),a(v);var h=l(v,2),x=o(h);$(x);var m=l(x,2);$(m);var _=l(m,2);$(_);var M=l(_,2);a(h);var R=l(h,2),D=l(o(R));j(D,5,()=>p()[t(d)],z,(s,r)=>{var i=st(),c=o(i),N=o(c,!0);a(c);var f=l(c),O=o(f,!0);a(f);var g=l(f),S=o(g,!0);a(g);var y=l(g),U=o(y,!0);a(y);var G=l(y),V=o(G);a(G),a(i),T(()=>{u(N,t(r).article),u(O,t(r).prix),u(S,t(r).quantity),u(U,t(r).total)}),q("click",V,()=>L(t(r).id)),w(s,i)}),a(D),a(R),a(b),k(x,()=>t(e).article,s=>n(e,t(e).article=s)),k(m,()=>t(e).prix,s=>n(e,t(e).prix=s)),k(_,()=>t(e).quantity,s=>n(e,t(e).quantity=s)),q("click",M,K),w(E,b),X(),I()}export{vt as component};
