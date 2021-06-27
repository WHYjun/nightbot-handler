package todo

import (
	"time"
)

type Todo struct {
	ID        int
	User      string
	Text      string
	CreatedAt time.Time
	UpdatedAt time.Time
}
