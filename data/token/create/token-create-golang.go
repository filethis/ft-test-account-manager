package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
    "strings"
)

func sendCreateToken() {
    // Create token (POST {{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens)

    body := strings.NewReader(`{
  "expiresIn": {{EXPIRES_IN}}
}
`)

    // Create client
    client := &http.Client{}

    // Create request
    req, err := http.NewRequest("POST", "{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens", body)

    // Headers
    req.Header.Add("Authorization", "Basic {{BASIC}}")
    req.Header.Add("Content-Type", "text/plain; charset=utf-8")

    // Fetch Request
    resp, err := client.Do(req)

    if err != nil {
        fmt.Println("Failure : ", err)
    }

    // Read Response Body
    respBody, _ := ioutil.ReadAll(resp.Body)

    // Display Results
    fmt.Println("response Status : ", resp.Status)
    fmt.Println("response Headers : ", resp.Header)
    fmt.Println("response Body : ", string(respBody))
}


