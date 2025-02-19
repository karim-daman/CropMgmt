export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.CCVpx94K.js",app:"_app/immutable/entry/app.Bminj4sD.js",imports:["_app/immutable/entry/start.CCVpx94K.js","_app/immutable/chunks/C4CSrl9q.js","_app/immutable/chunks/CmPZlwSp.js","_app/immutable/chunks/tppimSZz.js","_app/immutable/entry/app.Bminj4sD.js","_app/immutable/chunks/CmPZlwSp.js","_app/immutable/chunks/CAcwY1Ku.js","_app/immutable/chunks/CQRju76c.js","_app/immutable/chunks/DSspGRTc.js","_app/immutable/chunks/DGCoerJH.js","_app/immutable/chunks/QFiES6kV.js","_app/immutable/chunks/tppimSZz.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/7.js'))
		],
		routes: [
			{
				id: "/livraison/[id]",
				pattern: /^\/livraison\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set(["/","/achats","/clients","/entretien","/livraison","/pointage"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
