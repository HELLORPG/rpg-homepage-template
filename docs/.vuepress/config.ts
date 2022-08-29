import { defineUserConfig } from "vuepress";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";
import theme from "./theme";
import { path } from "@vuepress/utils";

export default defineUserConfig({
  base: "/",

  plugins: [
    sitemapPlugin({ // 从 sitemap 中去除不需要的页面
      hostname: "www.your-hostname.com",
      excludeUrls: ["/timeline/", "/category/", "/star/", "/slide/", "/encrypted/", "/article/", "/tag/",
        "/zh/timeline/", "/zh/category/", "/zh/star/", "/zh/slide/", "/zh/encrypted/", "/zh/article/", "/zh/tag/",
        "/intro.html", "/slide.html", "/home.html"],
    }),
  ],

  head: [
    [
        "link",
      {
        rel: "icon",
        href: "/favicon.ico"
      }
    ],
  ],

  locales: {
    "/": {
      lang: "en-US",
      title: "Your Homepage",
      description: "Your description.",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "你的主页",
      description: "你的描述。",
    },
  },

  theme,

  alias: {
    "@theme-hope/module/blog/components/BlogHome": path.resolve(
        __dirname,
        "./components/MyHome.ts"),
    "@theme-hope/module/navbar/components/NavScreen": path.resolve(
        __dirname,
        "./components/MyNavScreen"
    ),
  }
});
