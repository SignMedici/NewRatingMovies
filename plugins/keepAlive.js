var http = require("http");

export default () => {
  setInterval(() => {
    http.get(process.env.baseURL.slice(0, -3));
  }, 1 * 60 * 1000); // every 25 minutes
};
