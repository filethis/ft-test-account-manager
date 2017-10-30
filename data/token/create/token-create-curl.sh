#!/usr/bin/env bash
curl -X POST \
  {{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens \
  -H 'authorization: Basic {{API_CREDENTIALS}}' \
  -H 'cache-control: no-cache' \
  -H 'content-type: text/plain; charset=utf-8' \
  -d '{ "expiresIn": {{EXPIRES_IN}} }'