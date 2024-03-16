package controllers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	_ "github.com/lib/pq"

	"mfauthenticator/tools"

	"golang.org/x/crypto/bcrypt"
)

const (
	dbHost     = "localhost"
	dbPort     = 5432
	dbUser     = "postgres"
	dbPassword = "" // own master user password here
	dbName     = "authenticator"
)

func RegisterController(w http.ResponseWriter, r *http.Request) {
	var user tools.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Failed to decode request body: "+err.Error(), http.StatusBadRequest)
		return
	}

	if err := tools.ValidateUserData(user); err != nil {
		http.Error(w, "Validation error: "+err.Error(), http.StatusBadRequest)
		return
	}

	if err := tools.PasswordsMatch(user.Password, user.ConfirmPassword); err != nil {
		http.Error(w, "Validation error: "+err.Error(), http.StatusBadRequest)
		return
	}
	user.ConfirmPassword = ""

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to hash password: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := storeUserData(user, string(hashedPassword)); err != nil {
		http.Error(w, "Failed to store user data: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("User registered successfully"))
}

func storeUserData(user tools.User, hashedPassword string) error {
	connectionString := "host=" + dbHost + " port=" + strconv.Itoa(dbPort) +
		" user=" + dbUser + " password=" + dbPassword + " dbname=" + dbName + " sslmode=disable"

	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		return err
	}
	defer db.Close()

	statement := `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`
	_, err = db.Exec(statement, user.FirstName, user.LastName, user.Email, hashedPassword)
	if err != nil {
		return err
	}

	return nil
}
