const { createProxyMiddleware } = require('http-proxy-middleware');

function proxy(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://apiko-intensive-backend.herokuapp.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
}

module.exports = proxy;
