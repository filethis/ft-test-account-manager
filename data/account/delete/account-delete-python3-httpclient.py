import http.client

conn = http.client.HTTPSConnection("{{SERVER}}")

headers = {
    'authorization': "Basic {{API_CREDENTIALS}}",
    'cache-control': "no-cache"
    }

conn.request("DELETE", "/api/v1/accounts/", headers=headers)

response = conn.getresponse()
data = response.read()

print(data.decode("utf-8"))