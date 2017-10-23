import http.client

conn = http.client.HTTPSConnection("{{SERVER}}")

headers = {
    'authorization': "Basic {{BASIC}}",
    'cache-control': "no-cache"
    }

conn.request("DELETE", "/api/v1/accounts/", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))