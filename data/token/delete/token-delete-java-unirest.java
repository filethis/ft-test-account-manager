HttpResponse<String> response = Unirest.delete("{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens/{{TOKEN_ID}}")
    .header("authorization", "Basic {{API_CREDENTIALS}}")
    .header("cache-control", "no-cache")
    .asString();