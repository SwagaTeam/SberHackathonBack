import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { env } from 'process';

// Исправлено: добавлены обратные кавычки
const apiUrl = (env.BACKEND_HOST && env.BACKEND_PORT)
    ? 'http://${env.BACKEND_HOST}:${env.BACKEND_PORT}' // Добавьте http:// и кавычки
    : 'http://localhost:8080';

const target = env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(';')[0] // ASPNETCORE_URLS часто содержит несколько url через ;
    : apiUrl;

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                target,
                changeOrigin: true, // Часто требуется для прокси
                rewrite: (path) => path.replace(/^\/server/, ''),
            }
        },
        host: '0.0.0.0',
        port: 5173,
    }
});