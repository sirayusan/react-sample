// 開発環境用の設定
const devApiUrl = process.env.NODE_ENV === 'SSL_DEV' ? "https://localhost:443" : "https://localhost:8080";
const devWsUrl = process.env.NODE_ENV === 'SSL_DEV' ? "wss://localhost:443" : "ws://localhost:8080";
const devConfig = {
  API_URL: devApiUrl,
  WEBSOCKET_URL: devWsUrl,
};

// 本番環境用の設定
const proApiUrl = process.env.NODE_ENV === 'SSL_DEV' ? "https://localhost:443" : "https://localhost:8080";
const proWsUrl = process.env.NODE_ENV === 'SSL_DEV' ? "wss://localhost:443" : "ws://localhost:8080";

const prodConfig = {
  API_URL: proApiUrl,
  WEBSOCKET_URL: proWsUrl,
};

// 環境に応じた設定の選択
const config = (process.env.NODE_ENV === "SSL_PRO" || process.env.NODE_ENV === "PRO") ? prodConfig : devConfig;

export default config;