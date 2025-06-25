// vite.config.js
export default defineConfig({
    server: {
      proxy: {
        "/api": "http://localhost:6000", // Backend URL
      },
    },
  });