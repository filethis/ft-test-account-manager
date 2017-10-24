#!/usr/bin/env bash
curl -X POST \
  {{SERVER}}/api/v1/accounts \
  -H 'authorization: Basic {{BASIC}}' \
  -H 'cache-control: no-cache' \
  -H 'content-type: text/plain; charset=utf-8' \
  -d '{ "partnerAccountId": "{{PARTNER_ACCOUNT_ID}}" }'