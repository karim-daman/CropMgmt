import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: 'app.html' // This helps with client-side routing
		}),
		paths: {
			base: ''
		}
	}
};

export default config;
