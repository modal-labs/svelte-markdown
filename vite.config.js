import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { svelteTesting } from '@testing-library/svelte/vite'

import analyze from 'rollup-plugin-analyzer'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

const production = !process.argv.includes('--watch')
const removeDist = (p) => p.replace('dist/', '')

export default defineConfig({
  plugins: [svelte(), svelteTesting()],
  test: {
    environment: 'jsdom',
  },
  build: {
    rollupOptions: {
      input: 'src/index.js',
      plugins: [production && analyze(), production && filesize()],
    },
    sourcemap: true,
    lib: {
      entry: new URL('src/index.js', import.meta.url).pathname,
      formats: ['es', 'umd'],
      name: pkg.name,
      fileName: (format) =>
        ({
          es: removeDist(pkg.module),
          umd: removeDist(pkg.main),
        })[format],
    },
  },
})
