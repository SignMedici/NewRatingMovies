var http = require("http");

export default () => {
  setInterval(function () {
    var options = {
      host: process.env.BASE_URL.slice(7, -4),
      port: 80,
      path: "/",
    };
    http
      .get(options, function (res) {
        res.on("data", function (chunk) {
          try {
            // optional logging... disable after it's working
            console.log("HEROKU RESPONSE: " + chunk);
          } catch (err) {
            console.log(err.message);
          }
        });
      })
      .on("error", function (err) {
        console.log("Error: " + err.message);
      });
  }, 1 * 60 * 1000); // load every 20 minutes
};
