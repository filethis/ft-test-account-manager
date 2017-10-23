OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("text/plain; charset=utf-8");
RequestBody body = RequestBody.create(mediaType, "{\n  \"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\"\n}");
Request request = new Request.Builder()
  .url("{{SERVER}}/api/v1/accounts")
  .post(body)
  .addHeader("content-type", "text/plain; charset=utf-8")
  .addHeader("authorization", "Basic {{BASIC}}")
  .addHeader("cache-control", "no-cache")
  .build();

Response response = client.newCall(request).execute();