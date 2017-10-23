var unirest = require("unirest");

var req = unirest("POST", "{{SERVER}}/api/v1/accounts");

req.headers({
  "cache-control": "no-cache",
  "authorization": "Basic {{BASIC}}",
  "content-type": "text/plain; charset=utf-8"
});

  req.send("{\n  \"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\"\n}");

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});
