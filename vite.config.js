import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
      host: '87.106.39.97',
      port: 5173,
      proxy: {
        '/api': {
          target: backendUrl,  // backend Django
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
)
