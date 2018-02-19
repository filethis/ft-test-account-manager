jQuery.ajax({
    url: "{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}",
    type: "DELETE",
    headers: {
        "Authorization": "Basic {{API_CREDENTIALS}}"
    }
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