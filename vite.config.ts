import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'public/v1',
  build: {
    outDir: 'dist/v1',
    lib: {
      entry: resolve(import.meta.dirname, 'src/v1/project-shell.ts'),
      formats: ['es'],
      fileName: () => 'project-shell.js',
      cssFileName: 'base',
    },
  },
});
