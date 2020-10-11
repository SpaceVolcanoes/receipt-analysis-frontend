const { argv } = require("yargs");

module.exports = {
  devServer: {
    port: 8008
  }
};

if (argv.poll) {
  module.exports.devServer.watchOptions = {
    poll: true
  };
}

if (argv.proxy) {
  module.exports.devServer.proxy = {
    "/api/*": {
      target: "http://127.0.0.1:8080",
      changeOrigin: true,
      timeout: 6000,
      secure: false,
      pathRewrite: {
        "^/api": ""
      }
    }
  };
}
