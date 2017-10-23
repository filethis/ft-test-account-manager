import http.client

conn = http.client.HTTPSConnection("{{SERVER}}")

payload = "{\n  \"expiresIn\": {{EXPIRES_IN}}\n}\n"

headers = {
    'content-type': "text/plain; charset=utf-8",
    'authorization': "Basic {{BASIC}}",
    'cache-control': "no-cache"
    }

conn.request("POST", "/api/v1/accounts/{{ACCOUNT_ID}}/tokens", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))