var data = "{ \"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\" }";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4)
        console.log(this.responseText);
});

xhr.open("POST", "{{SERVER}}/api/v1/accounts");
xhr.setRequestHeader("content-type", "text/plain; charset=utf-8");
xhr.setRequestHeader("authorization", "Basic {{API_CREDENTIALS}}");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);