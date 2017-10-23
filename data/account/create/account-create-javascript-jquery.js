// Create account (POST {{SERVER}}/api/v1/accounts)

jQuery.ajax({
    url: "{{SERVER}}/api/v1/accounts",
    type: "POST",
    headers: {
        "Authorization": "Basic {{BASIC}}",
        "Content-Type": "text/plain; charset=utf-8",
    },
    processData: false,
    data: "{\"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\"}",
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
    console.log(data);
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
})
.always(function() {
    /* ... */
});

