
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// GH Pages safe: base is dynamic via env.
// - For project pages (username.github.io/REPO): set VITE_BASE='/REPO/' in .env.local
// - For user/org pages (username.github.io): set VITE_BASE='/'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base: env.VITE_BASE || '/YOUR_REPO_NAME/'
  }
})







