const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/utils/styles/buefy-variables.scss";
          `
      }
    }
  },
  devServer: {
    https: false
  },
  outputDir: path.resolve(__dirname, "client")
};
