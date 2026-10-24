import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Single-page demo: React + Motion in one bundle is ~165 kB gzipped, which is acceptable here.
    chunkSizeWarningLimit: 650,
  },
});
