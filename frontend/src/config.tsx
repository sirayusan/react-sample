// 開発環境用の設定
const devConfig = {
    API_URL: "http://localhost:8080",
  };
  
  // 本番環境用の設定
  const prodConfig = {
    API_URL: "https://api.example.com",
  };
  
  // 環境に応じた設定の選択
  const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
  
  export default config;