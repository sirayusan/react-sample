import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// HTTPS設定を動的に適用するための関数
const createServerConfig = () => {
  const useSSL = (process.env.NODE_ENV === 'SSL_DEV' || process.env.NODE_ENV === 'SSL_PRO'); // 環境変数USE_SSLがtrueかどうかをチェック
  if (useSSL) {
    // HTTPSを有効にする設定
    const certPath = path.resolve(process.env.CERT_PATH, process.env.CERT_FILE_NAME);
    const keyPath = path.resolve(process.env.SECRET_KEY_PATH, process.env.SECRET_KEY_FILE_NAME);
    return {
      https: {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      },
      port: process.env.VITE_CLIENT_PORT ? parseInt(process.env.VITE_CLIENT_PORT, 10) : 3000,
    };
  } else {
    // HTTPSを使用しない設定
    return {
      port: process.env.VITE_CLIENT_PORT ? parseInt(process.env.VITE_CLIENT_PORT, 10) : 3000,
    };
  }
};

// Vite設定
export default defineConfig({
  plugins: [react()],
  server: createServerConfig(),
});
