#!/usr/bin/env bash
curl -X POST \
  {{SERVER}}/api/v1/accounts \
  -H 'authorization: Basic {{API_CREDENTIALS}}' \
  -H 'cache-control: no-cache' \
  -H 'content-type: text/plain; charset=utf-8' \
  -d '{ "partnerAccountId": "{{PARTNER_ACCOUNT_ID}}" }'