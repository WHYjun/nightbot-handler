package todo

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"time"
)

type Todo struct {
	ID        int
	User      string
	Text      string
	CreatedAt time.Time
	UpdatedAt time.Time
}

var database = os.Getenv("DATABASE_NAME")

func GetMany(ctx context.Context, db *sql.DB, name string) ([]*Todo, error) {
	query := fmt.Sprintf(`
		SELECT
			t.todo
		FROM
			%s.todo t
		WHERE
			t.displayName = ?;
	`, database)
	rows, err := db.QueryContext(ctx, query, name)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	todos := make([]*Todo, 0)
	for rows.Next() {
		todo := &Todo{}
		err := rows.Scan(&todo.Text)
		if err != nil {
			return nil, err
		}
		todos = append(todos, todo)
	}
	return todos, nil
}

func Create(ctx context.Context, db *sql.DB, name, text string) (*int64, error) {
	query := fmt.Sprintf(`
		INSERT INTO %s.todos
		(displayName, todo)
		VALUES(?, ?);
    `, database)
	result, err := db.ExecContext(ctx, query, name, text)
	if err != nil {
		return nil, err
	}
	todoId, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}
	return &todoId, nil
}

func Delete(ctx context.Context, db *sql.DB, id int) error {
	query := fmt.Sprintf(`
		DELETE FROM %s.todos
		WHERE todoId=?;
	`, database)
	_, err := db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	return nil
}
