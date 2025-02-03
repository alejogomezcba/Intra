import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteObfuscateFile } from 'vite-plugin-obfuscator';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteObfuscateFile({
      // Opciones de obfuscación
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      debugProtection: true,
      debugProtectionInterval: 500,
      disableConsoleOutput: true,
    }),
  ],
});
