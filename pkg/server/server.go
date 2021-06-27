package server

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

var r = mux.NewRouter()

func Start() {
	port := ":" + os.Getenv("PORT")

	log.Println("Listening on port " + port)
	log.Fatal(http.ListenAndServe(port, r))
}
