#!/usr/bin/env bash
curl -X DELETE \
  {{SERVER}}/api/v1/accounts/ \
  -H 'authorization: Basic {{API_CREDENTIALS}}' \
  -H 'cache-control: no-cache'