var data = "{\n  \"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\"\n}";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "{{SERVER}}/api/v1/accounts");
xhr.setRequestHeader("content-type", "text/plain; charset=utf-8");
xhr.setRequestHeader("authorization", "Basic {{BASIC}}");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);