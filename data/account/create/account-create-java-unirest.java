HttpResponse<String> response = Unirest.post("{{SERVER}}/api/v1/accounts")
    .header("content-type", "text/plain; charset=utf-8")
    .header("authorization", "Basic {{API_CREDENTIALS}}")
    .header("cache-control", "no-cache")
    .body("{ \"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\" }")
    .asString();