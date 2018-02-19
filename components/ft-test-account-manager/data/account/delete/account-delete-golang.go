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
    request, error := http.NewRequest("DELETE", "{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}", nil)

    // Headers
    request.Header.Add("Authorization", "Basic {{API_CREDENTIALS}}")

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