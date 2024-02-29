# MFAuthenticator
Multifactor authenticator web application following secure programming guidelines. The application aims to provide maximum security and high quality for a user-friendly authentication service.
## Backend
Go backend for performance and security. It handles the authentication logic including user registration, login, logout, password hashing, token generation, and verification with API endpoints. As well as logging and monitoring, SQL database, and security measures. Multi-factor authentication is handled with email verification system.

Running the backend requires installing Go language from https://golang.org/dl/ and setting it up. go run main.go in the directory to start the server.
## Frontend
Simple but polished React frontend for user interactions and secure connection with the backend. Includes components for registration and login form with email-verifications, password reset form, and user profile management.

Running the frontend requires you to have node.js and a package manager like npm installed on your machine. Install the necessary packages using npm install and start the program with npm start in the directory.

Both the frontend and the backend need to be running in order for the program to work.

![requirements](requirements.png)