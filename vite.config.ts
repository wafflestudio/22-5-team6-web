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
<<<<<<< HEAD
        target: 'https://d2gjarpl85ijp5.cloudfront.net/', // 백엔드 서버 주소
=======
        target: 'https://d2gjarpl85ijp5.cloudfront.net', // 백엔드 서버 주소
>>>>>>> d3fe4e7 (feat: Hosting 페이지 구현 및 메인 페이지 기능 개선)
        changeOrigin: true, // Origin 헤더 변경
        //rewrite: (path) => path.replace(/^\/api/, ''), // `/api` 제거
      },
    },
  },
});

export default config;
