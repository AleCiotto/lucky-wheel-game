import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from 'node:path';


// https://vite.dev/config/
export default defineConfig({
    base: process.env.NODE_ENV === 'production'
        ? '/lucky-wheel-game/' // per GitHub Pages
        : '/',                 // per sviluppo locale
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': __dirname,
            '@src': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@contexts': path.resolve(__dirname, 'src/contexts'),
        },
    },
    css: {
        modules: {
            localsConvention: "camelCase",
            generateScopedName: "[local]"
        }
    },
})
