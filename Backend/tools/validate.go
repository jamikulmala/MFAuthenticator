package tools

import (
	"errors"
	"net/mail"
	"unicode"
)

type User struct {
	ID              int
	FirstName       string
	LastName        string
	Email           string
	Password        string // to be encrypted with Bcrypt
	ConfirmPassword string
	Checked         bool
}

const (
	minNameLength     = 2
	maxNameLength     = 50
	maxEmailLength    = 255
	minPasswordLength = 8
	maxPasswordLength = 128
)

func ValidateUserData(user User) error {
	if !isValidEmail(user.Email) {
		return errors.New("invalid email format")
	}
	if !isWithinLength(user.FirstName, minNameLength, maxNameLength) {
		return errors.New("first name length should be between 2 and 50 characters")
	}
	if !isWithinLength(user.LastName, minNameLength, maxNameLength) {
		return errors.New("last name length should be between 2 and 50 characters")
	}
	if !isWithinLength(user.Password, minPasswordLength, maxPasswordLength) {
		return errors.New("password length should be between 8 and 128 characters")
	}
	if !isStrongPassword(user.Password) {
		return errors.New("password should contain an upper and a lower case letter, a special character and a number")
	}
	if !user.Checked {
		return errors.New("you must agree to the terms to continue")
	}
	return nil
}

func isValidEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}

func isWithinLength(s string, min, max int) bool {
	return len(s) >= min && len(s) <= max
}

func isStrongPassword(password string) bool {
	var (
		hasUpper   bool
		hasLower   bool
		hasDigit   bool
		hasSpecial bool
	)
	for _, char := range password {
		switch {
		case unicode.IsUpper(char):
			hasUpper = true
		case unicode.IsLower(char):
			hasLower = true
		case unicode.IsDigit(char):
			hasDigit = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			hasSpecial = true
		}
	}
	return hasUpper && hasLower && hasDigit && hasSpecial
}

func PasswordsMatch(password string, confirmPassword string) error {
	if password != confirmPassword {
		return errors.New("password and password confirmation don't match")
	}
	return nil
}
