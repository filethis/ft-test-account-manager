#!/usr/bin/env bash
wget --quiet \
  --method POST \
  --header 'content-type: text/plain; charset=utf-8' \
  --header 'authorization: Basic {{BASIC}}' \
  --header 'cache-control: no-cache' \
  --body-data '{\n  "partnerAccountId": "{{PARTNER_ACCOUNT_ID}}"\n}' \
  --output-document \
  - {{SERVER}}/api/v1/accounts