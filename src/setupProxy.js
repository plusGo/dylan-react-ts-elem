const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api/v1', {
        target : 'https://elm.cangdu.org/',
        changeOrigin : true,
        ws: true,
        pathRewrite : {
            '^/api/v1' : '/v1'
        },
    }));
};
