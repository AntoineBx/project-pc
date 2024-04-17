import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, loadEnv } from 'vite'
const env = loadEnv(process.env.NODE_ENV, process.cwd())
console.log("ENV VARIABLE",env)
export default defineConfig({
  plugins: [sveltekit()],
  ssr: {
    noExternal: ['three']
  }
})
