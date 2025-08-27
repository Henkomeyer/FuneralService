import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// GH Pages safe via env:
// - Project page (username.github.io/REPO): VITE_BASE='/REPO/'
// - User/org page  (username.github.io)   : VITE_BASE='/'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base: env.VITE_BASE || '/Ruan/'
  }
})
