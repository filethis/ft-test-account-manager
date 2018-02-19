var request = require("request");

var options = {
    method: 'DELETE',
    url: '{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}',
    headers: {
        'cache-control': 'no-cache',
        authorization: 'Basic {{API_CREDENTIALS}}'
    }
};

request(options, function(error, response, body) {
    if (error)
        throw new Error(error);
    console.log(body);
});