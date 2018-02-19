#!/usr/bin/env bash
curl -X DELETE \
  {{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens/{{TOKEN_ID}} \
  -H 'authorization: Basic {{API_CREDENTIALS}}' \
  -H 'cache-control: no-cache'