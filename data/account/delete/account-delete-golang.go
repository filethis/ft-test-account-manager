package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
)

func sendDeleteAccount() {
    // Delete account (DELETE {{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}})

    // Create client
    client := &http.Client{}

    // Create request
    req, err := http.NewRequest("DELETE", "{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}", nil)

    // Headers
    req.Header.Add("Authorization", "Basic {{BASIC}}")

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


