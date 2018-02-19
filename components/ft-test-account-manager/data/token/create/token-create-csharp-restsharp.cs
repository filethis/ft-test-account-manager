var client = new RestClient("{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens");
var request = new RestRequest(Method.POST);
request.AddHeader("cache-control", "no-cache");
request.AddHeader("authorization", "Basic {{API_CREDENTIALS}}");
request.AddHeader("content-type", "text/plain; charset=utf-8");
request.AddParameter("text/plain; charset=utf-8", "{ \"expiresIn\": {{EXPIRES_IN}} }", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);