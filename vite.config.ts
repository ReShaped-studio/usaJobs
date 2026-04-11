import path from "node:path";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      vue(),
      viteStaticCopy({
        targets: [
          {
            src: "node_modules/@uswds/uswds/dist/fonts",
            dest: "fonts",
          },
          {
            src: "node_modules/@uswds/uswds/dist/img",
            dest: "img",
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          loadPaths: [
            path.join(__dirname, "node_modules/@uswds/uswds/packages"),
            path.join(__dirname, "node_modules/@uswds"),
          ],
          quietDeps: true,
        },
      },
    },
    server: {
      proxy: {
        "/api/usajobs": {
          target: "https://data.usajobs.gov",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/usajobs/, "/api/search"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              const key = env.USAJOBS_API_KEY;
              const ua = env.USAJOBS_USER_AGENT;
              if (key) {
                proxyReq.setHeader("Authorization-Key", key);
              }
              if (ua) {
                proxyReq.setHeader("User-Agent", ua);
              }
            });
          },
        },
      },
    },
  };
});
