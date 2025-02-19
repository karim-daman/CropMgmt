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
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/achats",
				pattern: /^\/achats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/clients",
				pattern: /^\/clients\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/entretien",
				pattern: /^\/entretien\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/livraison",
				pattern: /^\/livraison\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/livraison/[id]",
				pattern: /^\/livraison\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/pointage",
				pattern: /^\/pointage\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
