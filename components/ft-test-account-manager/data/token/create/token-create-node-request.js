var request = require("request");

var options = {
    method: 'POST',
    url: '{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens',
    headers: {
        'cache-control': 'no-cache',
        authorization: 'Basic {{API_CREDENTIALS}}',
        'content-type': 'text/plain; charset=utf-8'
    },
    body: '{ "expiresIn": {{EXPIRES_IN}} }'
};

request(options, function(error, response, body) {
    if (error)
        throw new Error(error);
    console.log(body);
});