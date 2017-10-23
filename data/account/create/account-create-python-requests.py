# Install the Python Requests library:
# `pip install requests`

import requests


def send_request():
    # Create account
    # POST {{SERVER}}/api/v1/accounts

    try:
        response = requests.post(
            url="{{SERVER}}/api/v1/accounts",
            headers={
                "Authorization": "Basic {{BASIC}}",
                "Content-Type": "text/plain; charset=utf-8",
            },
            data="{\"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\"}"
        )
        print('Response HTTP Status Code: {status_code}'.format(
            status_code=response.status_code))
        print('Response HTTP Response Body: {content}'.format(
            content=response.content))
    except requests.exceptions.RequestException:
        print('HTTP Request failed')


