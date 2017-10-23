var http = require("https");

var options = {
  "method": "POST",
  "hostname": "{{SERVER}}",
  "port": null,
  "path": "/api/v1/accounts/{{ACCOUNT_ID}}/tokens",
  "headers": {
    "content-type": "text/plain; charset=utf-8",
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

req.write("{\n  \"expiresIn\": {{EXPIRES_IN}}\n}\n");
req.end();