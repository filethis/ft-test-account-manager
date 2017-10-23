#!/usr/bin/env bash
http --form POST '{{SERVER}}/api/v1/accounts' \
    'Authorization':'Basic {{BASIC}}' \
    'Content-Type':'text/plain; charset=utf-8' \
    'data'=$'{
  \"partnerAccountId\": \"{{PARTNER_ACCOUNT_ID}}\"
}'


