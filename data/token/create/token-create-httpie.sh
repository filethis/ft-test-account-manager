#!/usr/bin/env bash
http --form POST '{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens' \
    'Authorization':'Basic {{BASIC}}' \
    'Content-Type':'text/plain; charset=utf-8' \
    'data'=$'{
  \"expiresIn\": {{EXPIRES_IN}}
}
'


