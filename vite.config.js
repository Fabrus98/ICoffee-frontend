import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
      host: '87.106.39.97',
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',  // backend Django
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
)
