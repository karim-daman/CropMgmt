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
		client: {start:"_app/immutable/entry/start.DR4hbSob.js",app:"_app/immutable/entry/app.njG_tg4Q.js",imports:["_app/immutable/entry/start.DR4hbSob.js","_app/immutable/chunks/fBF_9RES.js","_app/immutable/chunks/C_J4HtAr.js","_app/immutable/chunks/BcWcTcbg.js","_app/immutable/entry/app.njG_tg4Q.js","_app/immutable/chunks/C_J4HtAr.js","_app/immutable/chunks/DwQ4lwh6.js","_app/immutable/chunks/VwgcWoH-.js","_app/immutable/chunks/DP8Qqesn.js","_app/immutable/chunks/BstwTP-J.js","_app/immutable/chunks/BcWcTcbg.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
