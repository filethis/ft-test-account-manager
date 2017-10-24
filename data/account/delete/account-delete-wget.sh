#!/usr/bin/env bash
wget --quiet \
    --method DELETE \
    --header 'authorization: Basic {{BASIC}}' \
    --header 'cache-control: no-cache' \
    --output-document \
    - {{SERVER}}/api/v1/accounts/