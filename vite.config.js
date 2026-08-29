import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so dist/index.html also works when opened directly as a file
  base: './',
  plugins: [react()],
})
