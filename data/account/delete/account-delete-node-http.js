var http = require("https");

var options = {
  "method": "DELETE",
  "hostname": "{{SERVER}}",
  "port": null,
  "path": "/api/v1/accounts/{{ACCOUNT_ID}}",
  "headers": {
    "authorization": "Basic {{BASIC}}",
    "cache-control": "no-cache"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();