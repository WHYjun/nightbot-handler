package todo

import (
	"context"
	"database/sql"
	"time"
)

type Todo struct {
	ID        int
	User      string
	Text      string
	CreatedAt time.Time
	UpdatedAt time.Time
}

func GetMany(ctx context.Context, db *sql.DB, user string) ([]*Todo, error) {
	return nil, nil
}

func Create(ctx context.Context, db *sql.DB, user, text string) error {
	return nil
}
