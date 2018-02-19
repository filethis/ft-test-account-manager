var http = require("https");

var options = {
    "method": "POST",
    "hostname": "{{SERVER}}",
    "port": null,
    "path": "/api/v1/accounts/{{ACCOUNT_ID}}/tokens",
    "headers": {
        "content-type": "text/plain; charset=utf-8",
        "authorization": "Basic {{API_CREDENTIALS}}",
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

request.write("{ \"expiresIn\": {{EXPIRES_IN}} }");
request.end();