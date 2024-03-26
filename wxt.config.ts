import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import UnoCSS from 'unocss/vite'
import path from "path";

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: {
    addons: {
      vueTemplate: true,
    },
  },
  vite: () => ({
    plugins: [
      vue(),
      UnoCSS(),
      createSvgIconsPlugin({
        // 指定目录(svg存放目录）
        iconDirs: [path.resolve(process.cwd(), "assets/svgs")],
        // 使用 svg 图标的格式（name为图片名称）
        symbolId: "icon-[name]",
        //生成组件插入位置 只有两个值 boby-last | body-first
        inject: 'body-last'
      })
    ],
  }),
});
