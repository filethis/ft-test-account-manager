import requests

def send_request():
    try:
        response = requests.post(
            url="{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens",
            headers={
                "Authorization": "Basic {{BASIC}}",
                "Content-Type": "text/plain; charset=utf-8",
            },
            data="{ \"expiresIn\": {{EXPIRES_IN}} }"
        )
        print('Response HTTP Status Code: {status_code}'.format(
            status_code=response.status_code))
        print('Response HTTP Response Body: {content}'.format(
            content=response.content))
    except requests.exceptions.RequestException:
        print('HTTP Request failed')