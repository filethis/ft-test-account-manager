var unirest = require("unirest");

var request = unirest("POST", "{{SERVER}}/api/v1/accounts");

request.headers({
    "cache-control": "no-cache",
    "authorization": "Basic {{API_CREDENTIALS}}",
    "content-type": "text/plain; charset=utf-8"
});

request.send("{ \"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\" }");

request.end(function(response) {
    if (response.error)
        throw new Error(response.error);
    console.log(response.body);
});