const prodUrl = "https://shiny-poems-git-main-arrow2nd.vercel.app";
const localUrl = "http://localhost:3000";

// アクセス先 URL
export const baseUrl = process.env.PROD
  ? prodUrl
  : process.env.PREVIEW_URL || localUrl;
