var data = "{ \"expiresIn\": {{EXPIRES_IN}} }";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4)
        console.log(this.responseText);
});

xhr.open("POST", "{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens");
xhr.setRequestHeader("content-type", "text/plain; charset=utf-8");
xhr.setRequestHeader("authorization", "Basic {{BASIC}}");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);