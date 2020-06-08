package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/Hamzaq96/go-login/config/db"
	"github.com/Hamzaq96/go-login/model"
)

func FeedbackHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var feedback model.Feedback
	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &feedback)
	var res model.ResponseResult
	if err != nil {
		res.Error = err.Error()
		json.NewEncoder(w).Encode(res)
		return
	}

	collection, err := db.GetFeedbackDBCollection()

	if err != nil {
		res.Error = err.Error()
		json.NewEncoder(w).Encode(res)
		return
	}

	insertResult, err := collection.InsertOne(context.Background(), feedback)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a Single Record ", insertResult.InsertedID)
	res.Result = "Feedback given"
	json.NewEncoder(w).Encode(res)
	return
}
