// app.config.js

// 環境変数を読み込むために dotenv をインポート
import "dotenv/config";
import { getProjectConfigDescription } from "expo/config";

export default {
  expo: {
    name: "news-app",
    slug: "news-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.masaki.newsapp20241212",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      // 環境変数からAPIキーを読み込む
      newsApiKey: process.env.NEWS_API_KEY,
      eas: { projectId: "ddcd8e24-3352-49c2-94c1-a0d1ee5b8da3" },
    },
  },
};
