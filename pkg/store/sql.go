package store

import (
	"database/sql"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func Init() {
	DB, err := sql.Open("mysql", os.Getenv("DATASOURCE"))
	if err != nil {
		panic(err)
	}
	DB.SetConnMaxLifetime(time.Minute)
	DB.SetMaxOpenConns(1)
	DB.SetMaxIdleConns(1)
}
