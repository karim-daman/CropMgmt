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
		client: {start:"_app/immutable/entry/start.8m2rhIpr.js",app:"_app/immutable/entry/app.CGIXjvXh.js",imports:["_app/immutable/entry/start.8m2rhIpr.js","_app/immutable/chunks/yICeVlU3.js","_app/immutable/chunks/DAxARKWz.js","_app/immutable/chunks/CWOAwOG9.js","_app/immutable/entry/app.CGIXjvXh.js","_app/immutable/chunks/DAxARKWz.js","_app/immutable/chunks/DuW1ju0T.js","_app/immutable/chunks/C2-o_NFQ.js","_app/immutable/chunks/BGQnQNT8.js","_app/immutable/chunks/AsitmpWD.js","_app/immutable/chunks/CWOAwOG9.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
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
				id: "/pointage",
				pattern: /^\/pointage\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
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
