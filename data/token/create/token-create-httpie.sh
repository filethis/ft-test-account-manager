#!/usr/bin/env bash
http POST '{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens' \
    Authorization:'Basic {{BASIC}}' \
    Content-Type:'text/plain; charset=utf-8' \
    expiresIn='{{EXPIRES_IN}}'