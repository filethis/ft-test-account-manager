var http = require("https");

var options = {
    "method": "DELETE",
    "hostname": "{{SERVER}}",
    "port": null,
    "path": "/api/v1/accounts/{{ACCOUNT_ID}}",
    "headers": {
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

request.end();