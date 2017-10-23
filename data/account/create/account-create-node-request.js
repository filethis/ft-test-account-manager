var request = require("request");

var options = { method: 'POST',
  url: '{{SERVER}}/api/v1/accounts',
  headers:
   { 'cache-control': 'no-cache',
     authorization: 'Basic {{BASIC}}',
     'content-type': 'text/plain; charset=utf-8' },
  body: '{\n  "partnerAccountId": "{{PARTNER_ACCOUNT_ID}}"\n}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
