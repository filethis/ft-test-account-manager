OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
    .url("{{SERVER}}/api/v1/accounts/")
    .delete(null)
    .addHeader("authorization", "Basic {{API_CREDENTIALS}}")
    .addHeader("cache-control", "no-cache")
    .build();

Response response = client.newCall(request).execute();