import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve:{
        alias: [ { find:'@', replacement: '/src/'}]
    },
    server: {
        proxy: {
            '/api':{
                target: 'https://zoo-animal-api.herokuapp.com/animals/rand',
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
