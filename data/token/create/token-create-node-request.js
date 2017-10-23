var request = require("request");

var options = { method: 'POST',
  url: '{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens',
  headers:
   { 'cache-control': 'no-cache',
     authorization: 'Basic {{BASIC}}',
     'content-type': 'text/plain; charset=utf-8' },
  body: '{\n  "expiresIn": {{EXPIRES_IN}}\n}\n' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
