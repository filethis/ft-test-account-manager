var client = new RestClient("{{SERVER}}/api/v1/accounts");
var request = new RestRequest(Method.POST);
request.AddHeader("cache-control", "no-cache");
request.AddHeader("authorization", "Basic {{BASIC}}");
request.AddHeader("content-type", "text/plain; charset=utf-8");
IRestResponse response = client.Execute(request);