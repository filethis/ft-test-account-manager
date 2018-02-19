var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4)
        console.log(this.responseText);
});

xhr.open("DELETE", "{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens/{{TOKEN_ID}}");
xhr.setRequestHeader("authorization", "Basic {{API_CREDENTIALS}}");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);