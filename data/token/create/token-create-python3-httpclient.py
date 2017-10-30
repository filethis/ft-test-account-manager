import http.client

conn = http.client.HTTPSConnection("{{SERVER}}")

payload = "{ \"expiresIn\": {{EXPIRES_IN}} }"

headers = {
    'content-type': "text/plain; charset=utf-8",
    'authorization': "Basic {{API_CREDENTIALS}}",
    'cache-control': "no-cache"
    }

conn.request("POST", "/api/v1/accounts/{{ACCOUNT_ID}}/tokens", payload, headers)

response = conn.getresponse()
data = response.read()

print(data.decode("utf-8"))