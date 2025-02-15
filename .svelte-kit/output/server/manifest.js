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
		client: {start:"_app/immutable/entry/start.Bj2oj4Fp.js",app:"_app/immutable/entry/app.CwDBNQwJ.js",imports:["_app/immutable/entry/start.Bj2oj4Fp.js","_app/immutable/chunks/sbhvrw2O.js","_app/immutable/chunks/ih3xEocW.js","_app/immutable/chunks/B11ZGyqV.js","_app/immutable/entry/app.CwDBNQwJ.js","_app/immutable/chunks/ih3xEocW.js","_app/immutable/chunks/ofMewh1x.js","_app/immutable/chunks/DpUOHsiD.js","_app/immutable/chunks/DarpmbS9.js","_app/immutable/chunks/ndHA9DNq.js","_app/immutable/chunks/B11ZGyqV.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/","/achats","/clients","/entretien","/livraison","/pointage"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
