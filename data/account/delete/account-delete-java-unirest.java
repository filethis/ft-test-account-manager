HttpResponse<String> response = Unirest.delete("{{SERVER}}/api/v1/accounts/")
    .header("authorization", "Basic {{API_CREDENTIALS}}")
    .header("cache-control", "no-cache")
    .asString();