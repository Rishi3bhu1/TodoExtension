import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        sidebar: path.resolve(__dirname, 'sidebar.html'),
        tools:path.resolve(__dirname,'tools.html')
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames : 'assets/[name].js'
      },
    },
    outDir: 'build',
  }
});
