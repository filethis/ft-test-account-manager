HttpResponse<String> response = Unirest.delete("{{SERVER}}/api/v1/accounts/")
    .header("authorization", "Basic {{BASIC}}")
    .header("cache-control", "no-cache")
    .asString();