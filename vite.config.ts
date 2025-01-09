/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';

const config = defineConfig({
  plugins: [(react as unknown as () => Plugin)()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://d2gjarpl85ijp5.cloudfront.net/', // 백엔드 서버 주소
        changeOrigin: true, // Origin 헤더 변경
        //rewrite: (path) => path.replace(/^\/api/, ''), // `/api` 제거
      },
    },
  },
});

export default config;
