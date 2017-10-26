var http = require("https");

var options = {
    "method": "POST",
    "hostname": "{{SERVER}}",
    "port": null,
    "path": "/api/v1/accounts",
    "headers": {
        "content-type": "text/plain; charset=utf-8",
        "authorization": "Basic {{BASIC}}",
        "cache-control": "no-cache"
    }
};

var request = http.request(options, function(response) {
    var chunks = [];

    response.on("data", function(chunk) {
        chunks.push(chunk);
    });

    response.on("end", function() {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });
});

req.write("{ \"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\" }");
req.end();