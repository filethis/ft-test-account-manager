#!/usr/bin/env bash
curl -X DELETE \
  {{SERVER}}/api/v1/accounts/ \
  -H 'authorization: Basic {{BASIC}}' \
  -H 'cache-control: no-cache' \
