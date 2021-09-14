module.exports = {
    devServer: {
        port: 8080,
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                    @import "~@/assets/scss/_font.scss";    
                    @import "~@/assets/scss/_variable.scss";
                    @import "~@/assets/scss/_mixin.scss";
                    @import "~@/assets/scss/_global.scss";
                `
            },
        }
    }
}