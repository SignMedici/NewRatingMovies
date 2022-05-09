var http = require("http");

export default () => {
  setInterval(() => {
    console.log(process.env.BASE_URL);
    // http.get("http://example.herokuapp.com");
  }, 1 * 60 * 1000); // every 25 minutes
};
