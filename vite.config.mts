import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from 'node:path';


// https://vite.dev/config/
export default defineConfig({
    base: process.env.NODE_ENV === 'production'
        ? '/lucky-wheel-game/' // per GitHub Pages
        : '/',                 // per sviluppo locale
    build: { outDir: 'docs' },
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve('/'),
            '@src': path.resolve('/src'),
            '@components': path.resolve('/crc/components'),
        },
    },
    css: {
        modules: {
            localsConvention: "camelCase",
            generateScopedName: "[local]"
        }
    },
})
