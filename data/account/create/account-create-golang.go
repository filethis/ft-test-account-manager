package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
    "strings"
)

func sendCreateAccount() {
    // Create account (POST {{SERVER}}/api/v1/accounts)

    body := strings.NewReader(`{ "partnerAccountId": "{{PARTNER_ACCOUNT_ID}}" }`)

    // Create client
    client := &http.Client{}

    // Create request
    request, error := http.NewRequest("POST", "{{SERVER}}/api/v1/accounts", body)

    // Headers
    request.Header.Add("Authorization", "Basic {{BASIC}}")
    request.Header.Add("Content-Type", "text/plain; charset=utf-8")

    // Fetch Request
    response, error := client.Do(request)

    if error != nil {
        fmt.Println("Failure : ", error)
    }

    // Read Response Body
    responseBody, _ := ioutil.ReadAll(response.Body)

    // Display Results
    fmt.Println("response Status : ", response.Status)
    fmt.Println("response Headers : ", response.Header)
    fmt.Println("response Body : ", string(responseBody))
}