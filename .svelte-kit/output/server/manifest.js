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
		client: {start:"_app/immutable/entry/start.RsNFvmSM.js",app:"_app/immutable/entry/app.BA1g8Lns.js",imports:["_app/immutable/entry/start.RsNFvmSM.js","_app/immutable/chunks/CYGLSzL3.js","_app/immutable/chunks/Bwm_f7xm.js","_app/immutable/entry/app.BA1g8Lns.js","_app/immutable/chunks/Bwm_f7xm.js","_app/immutable/chunks/JfoZ43QX.js","_app/immutable/chunks/CmQMGd_p.js","_app/immutable/chunks/Csk83jlU.js","_app/immutable/chunks/DJWsIx7W.js","_app/immutable/chunks/BYqUywFD.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
		prerendered_routes: new Set(["/","/achats","/clients","/entretien","/livraison","/pointage","/test_security"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
