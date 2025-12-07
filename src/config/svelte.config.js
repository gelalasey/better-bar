import { vitePreprocess } from '@astrojs/svelte';

export default {
	preprocess: vitePreprocess(),
}

const config = {
	// ...
	onwarn: (warning, handler) => {
		if (warning.code === 'a11y-click-events-have-key-events') return
		handler(warning)
	},
}