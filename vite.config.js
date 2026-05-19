import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ws-tts': {
        target: 'wss://api.x.ai',
        ws: true,
        rewrite: (path) => path.replace(/^\/ws-tts/, '/v1/tts'),
        headers: {
          Authorization: `Bearer ${process.env.VITE_XAI_API_KEY}`,
        },
      },
    },
  },
})
