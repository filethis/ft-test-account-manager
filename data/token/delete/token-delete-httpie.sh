#!/usr/bin/env bash
http DELETE '{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens/{{TOKEN_ID}}' \
    'Authorization':'Basic {{API_CREDENTIALS}}'