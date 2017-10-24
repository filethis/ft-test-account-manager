var unirest = require("unirest");

var request = unirest("POST", "{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens");

request.headers({
    "cache-control": "no-cache",
    "authorization": "Basic {{BASIC}}",
    "content-type": "text/plain; charset=utf-8"
});

request.send("{ \"expiresIn\": {{EXPIRES_IN}} }");

request.end(function(response) {
    if (response.error)
        throw new Error(response.error);
    console.log(response.body);
});