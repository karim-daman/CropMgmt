import{n as t,u as _,o as c,h as d}from"./CmPZlwSp.js";import{l as m}from"./CAcwY1Ku.js";function y(e,a,f=a){var s=t();m(e,"input",l=>{var r=l?e.defaultValue:e.value;if(r=v(e)?n(r):r,f(r),s&&r!==(r=a())){var u=e.selectionStart,o=e.selectionEnd;e.value=r??"",o!==null&&(e.selectionStart=u,e.selectionEnd=Math.min(o,e.value.length))}}),(d&&e.defaultValue!==e.value||_(a)==null&&e.value)&&f(v(e)?n(e.value):e.value),c(()=>{var l=a();v(e)&&l===n(e.value)||e.type==="date"&&!l&&!e.value||l!==e.value&&(e.value=l??"")})}function v(e){var a=e.type;return a==="number"||a==="range"}function n(e){return e===""?null:+e}export{y as b};
