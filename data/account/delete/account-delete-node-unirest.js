var unirest = require("unirest");

var request = unirest("DELETE", "{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}");

request.headers({
    "cache-control": "no-cache",
    "authorization": "Basic {{BASIC}}"
});

request.end(function(response) {
    if (response.error)
        throw new Error(response.error);
    console.log(response.body);
});