var http = require("http");

export default ({ app }) => {
  app.keepAliveTimeout = 25 * 60 * 1000; // every 25 minutes
  app.headersTimeout = 25 * 60 * 1000;
};
