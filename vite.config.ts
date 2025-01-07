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
        target:
          'http://ec2-15-165-159-152.ap-northeast-2.compute.amazonaws.com:8080', // 백엔드 서버 주소
        changeOrigin: true, // Origin 헤더 변경
        //rewrite: (path) => path.replace(/^\/api/, ''), // `/api` 제거
      },
    },
  },
});

export default config;
