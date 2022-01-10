import { h, createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import StaticHtml from './static-html.js';

export default (element) => (Component, props, children) => {
	delete props['class'];
    
	// Expose name on host component for Vue devtools
	const name = Component.name ? `${Component.name} Host` : undefined;
	const slots = {};
	if (children != null) {
		slots.default = () => h(StaticHtml, { value: children });
	}

    const pinia = createPinia()
	const app = createSSRApp({ name, render: () => h(Component, props, slots) });

    app.use(pinia)
	app.mount(element, true);
};