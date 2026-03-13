import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/courses': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
