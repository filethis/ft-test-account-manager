import http.client

conn = http.client.HTTPSConnection("{{SERVER}}")

payload = "{ \"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\" }"

headers = {
    'content-type': "text/plain; charset=utf-8",
    'authorization': "Basic {{API_CREDENTIALS}}",
    'cache-control': "no-cache"
    }

conn.request("POST", "/api/v1/accounts", payload, headers)

response = conn.getresponse()
data = response.read()

print(data.decode("utf-8"))