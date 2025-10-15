import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from 'node:path';
import { env } from 'node:process';

// https://vite.dev/config/
export default defineConfig({
    base: '/<REPO>/'.replace('<REPO>', env.REPO_NAME || ''),
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
