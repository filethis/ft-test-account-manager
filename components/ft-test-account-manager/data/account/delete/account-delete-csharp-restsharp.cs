var client = new RestClient("{{SERVER}}/api/v1/accounts/");
var request = new RestRequest(Method.DELETE);
request.AddHeader("cache-control", "no-cache");
request.AddHeader("authorization", "Basic {{API_CREDENTIALS}}");
IRestResponse response = client.Execute(request