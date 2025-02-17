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
		client: {start:"_app/immutable/entry/start.Bwo_0Fr7.js",app:"_app/immutable/entry/app.BWFOdpf8.js",imports:["_app/immutable/entry/start.Bwo_0Fr7.js","_app/immutable/chunks/iDWTUHhc.js","_app/immutable/chunks/I5jpou1v.js","_app/immutable/chunks/D6smiJYB.js","_app/immutable/entry/app.BWFOdpf8.js","_app/immutable/chunks/I5jpou1v.js","_app/immutable/chunks/DpEC42Oz.js","_app/immutable/chunks/BGrn0sVC.js","_app/immutable/chunks/DRaHeqgg.js","_app/immutable/chunks/C0I-sOUY.js","_app/immutable/chunks/D6smiJYB.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
