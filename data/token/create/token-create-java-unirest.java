HttpResponse<String> response = Unirest.post("{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens")
    .header("content-type", "text/plain; charset=utf-8")
    .header("authorization", "Basic {{BASIC}}")
    .header("cache-control", "no-cache")
    .body("{ \"expiresIn\": {{EXPIRES_IN}} }")
    .asString();