import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        '.contentlayer/',
        '*.config.{js,ts}',
        'src/app/**', // Exclude Next.js app routes
        'src/content/**', // Exclude content files
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'contentlayer2/generated': path.resolve(
        __dirname,
        '.contentlayer/generated'
      ),
    },
  },
});
