#!/usr/bin/env bash
http POST '{{SERVER}}/api/v1/accounts' \
    Authorization:'Basic {{BASIC}}' \
    Content-Type:'text/plain; charset=utf-8' \
    partnerAccountId='{{PARTNER_ACCOUNT_ID}}'