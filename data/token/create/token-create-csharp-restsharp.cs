var client = new RestClient("{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens");
var request = new RestRequest(Method.POST);
request.AddHeader("cache-control", "no-cache");
request.AddHeader("authorization", "Basic {{BASIC}}");
request.AddHeader("content-type", "text/plain; charset=utf-8");
request.AddParameter("text/plain; charset=utf-8", "{\n  \"expiresIn\": {{EXPIRES_IN}}\n}\n", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);