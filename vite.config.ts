import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages base path.
  // Serving at the custom domain https://infinitycoolmaster.com/ -> root base.
  // (If ever reverting to https://<user>.github.io/<repo>/, set '/<repo>/'.)
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
});
