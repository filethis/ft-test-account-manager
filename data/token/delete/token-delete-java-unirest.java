HttpResponse<String> response = Unirest.delete("{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens/{{TOKEN_ID}}")
    .header("authorization", "Basic {{BASIC}}")
    .header("cache-control", "no-cache")
    .asString();