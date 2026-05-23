const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function setupProxy(app) {
  if (process.env.REACT_APP_BACKEND_URL) return;

  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.REACT_APP_LOCAL_BACKEND_URL || "http://127.0.0.1:8001",
      changeOrigin: true,
      secure: false,
    })
  );
};
