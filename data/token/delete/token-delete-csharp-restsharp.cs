var client = new RestClient("{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens/{{TOKEN_ID}}");
var request = new RestRequest(Method.DELETE);
request.AddHeader("cache-control", "no-cache");
request.AddHeader("authorization", "Basic {{BASIC}}");
IRestResponse response = client.Execute(request);