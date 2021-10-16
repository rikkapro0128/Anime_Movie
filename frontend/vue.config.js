module.exports = {
	css: {
		loaderOptions: {
			scss: {
				additionalData: `
                    @import "~@/assets/scss/_font.scss";    
                    @import "~@/assets/scss/_variable.scss";
                    @import "~@/assets/scss/_mixin.scss";
                    @import "~@/assets/scss/_global.scss";
                `
			}
		}
	},
	devServer: {
		disableHostCheck: true,
    host: '0.0.0.0',
    port: 8080,
    public: "0.0.0.0",
	},
};
