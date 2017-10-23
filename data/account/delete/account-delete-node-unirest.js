var unirest = require("unirest");

var req = unirest("DELETE", "{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}");

req.headers({
  "cache-control": "no-cache",
  "authorization": "Basic {{BASIC}}"
});


req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});
