import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import inject from '@rollup/plugin-inject';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'HTSeatmapClient',
      fileName: () => `bundle.js`,
      formats: ["umd"],
    },
    rollupOptions: {
      input: 'src/index.tsx',
      external: ['react', 'react-dom'],
      output: {
        globals: {},
        name: "HTSeatMaps",
        format: "umd",
        exports: "named",
      },
      plugins: [
        inject({
          process: "process/browser",
        })
      ],
    }
  }
});
