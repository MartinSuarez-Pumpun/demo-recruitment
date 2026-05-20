import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/ws-tts': {
          target: 'wss://api.x.ai',
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ws-tts/, '/v1/tts'),
          headers: { Authorization: `Bearer ${env.VITE_XAI_API_KEY}` },
        },
      },
    },
  }
})
