import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages base path.
  // - Deploying to https://<user>.github.io/<repository-name>/ -> set base to '/<repository-name>/'
  // - Deploying to a custom domain or https://<user>.github.io/  -> set base to '/'
  base: '/infinity-coolmaster/', // TODO: replace with '/<repository-name>/'
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
});
