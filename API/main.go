package main

import (
	"log"
	"net/http"

	"github.com/Hamzaq96/go-login/controller"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/register", controller.UserRegisterHandler).
		Methods("POST", "OPTIONS")
	r.HandleFunc("/login", controller.UserLoginHandler).
		Methods("POST", "OPTIONS")
	r.HandleFunc("/profile", controller.UserProfileHandler).
		Methods("GET", "OPTIONS")

	r.HandleFunc("/customerregister", controller.CustomerRegisterHandler).
		Methods("POST", "OPTIONS")
	r.HandleFunc("/customerlogin", controller.CustomerLoginHandler).
		Methods("POST", "OPTIONS")
	r.HandleFunc("/customerprofile", controller.CustomerProfileHandler).
		Methods("GET", "OPTIONS")

	r.HandleFunc("/feedback", controller.FeedbackHandler).
		Methods("POST", "OPTIONS")

	log.Fatal(http.ListenAndServe(":8080", r))
}
