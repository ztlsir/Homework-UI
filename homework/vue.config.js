module.exports = {
    devServer: {
        proxy: {
            '/homework-api': {
                target: 'http://localhost:802',
                changeOrigin: true,
                secure:false,
                pathRewrite: {
                    '^/homework-api': '/'
                }
            },
            '/file-api': {
                target: 'http://localhost:802',
                changeOrigin: true,
                secure:false,
                pathRewrite: {
                    '^/file-api': '/'
                }
            }
        }
    }
}