package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func main() {
	url := "http://localhost:8080/register"

	user := map[string]interface{}{
		"FirstName":       "John",
		"LastName":        "Doe",
		"Email":           "john.doe@example.com",
		"Password":        "Password123!",
		"ConfirmPassword": "Password123!",
	}

	jsonValue, _ := json.Marshal(user)
	response, err := http.Post(url, "application/json", bytes.NewBuffer(jsonValue))
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer response.Body.Close()

	// Read the response body
	body, err := io.ReadAll(response.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	// Print the response body
	fmt.Println(string(body))
	fmt.Println(response)
}
