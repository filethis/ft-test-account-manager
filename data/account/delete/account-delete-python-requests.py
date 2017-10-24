import requests

def send_request():
    try:
        response = requests.delete(
            url="{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}",
            headers={
                "Authorization": "Basic {{BASIC}}",
            },
        )
        print('Response HTTP Status Code: {status_code}'.format(
            status_code=response.status_code))
        print('Response HTTP Response Body: {content}'.format(
            content=response.content))
    except requests.exceptions.RequestException:
        print('HTTP Request failed')