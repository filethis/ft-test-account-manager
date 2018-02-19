#!/usr/bin/env bash
wget --quiet \
    --method DELETE \
    --header 'authorization: Basic {{API_CREDENTIALS}}' \
    --header 'cache-control: no-cache' \
    --output-document \
    - {{SERVER}}/api/v1/accounts/