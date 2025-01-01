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
});

export default config;
