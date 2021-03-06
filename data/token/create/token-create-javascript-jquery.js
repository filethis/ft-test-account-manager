jQuery.ajax({
    url: "{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens",
    type: "POST",
    headers: {
        "Authorization": "Basic {{API_CREDENTIALS}}",
        "Content-Type": "text/plain; charset=utf-8"
    },
    processData: false,
    data: "{ \"expiresIn\": {{EXPIRES_IN}} }"
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