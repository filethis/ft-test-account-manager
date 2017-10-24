import http.client

conn = http.client.HTTPSConnection("{{SERVER}}")

headers = {
    'authorization': "Basic {{BASIC}}",
    'cache-control': "no-cache"
    }

conn.request("DELETE", "/api/v1/accounts/{{ACCOUNT_ID}}/tokens/{{TOKEN_ID}}", headers=headers)

response = conn.getresponse()
data = response.read()

print(data.decode("utf-8"))