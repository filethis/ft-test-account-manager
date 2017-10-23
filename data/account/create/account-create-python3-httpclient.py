import http.client

conn = http.client.HTTPSConnection("{{SERVER}}")

payload = "{\n  \"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\"\n}"

headers = {
    'content-type': "text/plain; charset=utf-8",
    'authorization': "Basic {{BASIC}}",
    'cache-control': "no-cache"
    }

conn.request("POST", "/api/v1/accounts", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))