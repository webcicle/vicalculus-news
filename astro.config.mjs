import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/edge';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: vercel(),
	integrations: [react()],
});
