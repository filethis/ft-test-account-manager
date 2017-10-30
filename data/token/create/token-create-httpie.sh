#!/usr/bin/env bash
http POST '{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens' \
    Authorization:'Basic {{API_CREDENTIALS}}' \
    Content-Type:'text/plain; charset=utf-8' \
    expiresIn='{{EXPIRES_IN}}'