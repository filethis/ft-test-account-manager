#!/usr/bin/env bash
curl -X DELETE \
  {{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens/{{TOKEN_ID}} \
  -H 'authorization: Basic {{BASIC}}' \
  -H 'cache-control: no-cache'