var unirest = require("unirest");

var request = unirest("DELETE", "{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens/{{TOKEN_ID}}");

request.headers({
    "cache-control": "no-cache",
    "authorization": "Basic {{API_CREDENTIALS}}"
});

request.end(function(response) {
    if (response.error)
        throw new Error(response.error);
    console.log(response.body);
});