package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetFeedbackDBCollection() (*mongo.Collection, error) {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	clientOptions := options.Client().ApplyURI("mongodb://172.25.0.3:27017")
	client, _ := mongo.Connect(ctx, clientOptions)
	// if err != nil {
	// 	return nil, err
	// }
	// Check the connection
	// err = client.Ping(context.TODO(), nil)
	// if err != nil {
	// 	return nil, err
	// }
	collection := client.Database("DrugAssure").Collection("feedbacks")
	return collection, nil
}
