package todo

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/WHYjun/nightbot-handler/pkg/nightbot"
	"github.com/WHYjun/nightbot-handler/pkg/store"
)

// GetManyHandler gets all todos from the db.
func GetManyHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	user, err := nightbot.ParseNightbotUser(r.Header.Get("nightbot-user"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	todos, err := GetMany(ctx, store.DB, user.DisplayName)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var sb strings.Builder
	for i, v := range todos {
		fmt.Fprintf(&sb, "%d. %s, ", i+1, v.Text)
	}
	w.Write([]byte(sb.String()))
}

// PostHandler inserts to db
func PostHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	user, err := nightbot.ParseNightbotUser(r.Header.Get("nightbot-user"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	q := r.URL.Query()
	todos, err := GetMany(ctx, store.DB, user.DisplayName)
	if len(todos) < 5 {
		todo := q.Get("todo")
		_, err := Create(ctx, store.DB, user.DisplayName, todo)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Write([]byte(fmt.Sprintf("%s님이 %s 추가하셨습니다", user.DisplayName, todo)))
	} else {
		w.Write([]byte(fmt.Sprintf("할 일 한도 초과! 예전에 넣은 할 일을 제거 혹은 완료해주세요")))
	}
}

// DeleteHandler
func DeleteHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	user, err := nightbot.ParseNightbotUser(r.Header.Get("nightbot-user"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	q := r.URL.Query()
	indexQueryString := q.Get("index")
	if indexQueryString == "" {
		w.Write([]byte("제거/완료할 할 일의 숫자를 입력해주세요."))
		return
	}
	index, err := strconv.Atoi(indexQueryString)
	if err != nil || index > 5 || index < 0 {
		w.Write([]byte("0보다 크고 6보다 작은 정수를 입력해주세요."))
		return
	}
	todos, err := GetMany(ctx, store.DB, user.DisplayName)
	if len(todos) == 0 {
		w.Write([]byte("제거/완료할 할 일이 없습니다."))
		return
	} else {
		todo := todos[index-1]
		err := Delete(ctx, store.DB, todo.ID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Write([]byte(fmt.Sprintf("%s님이 %s 제거/완료하셨습니다", user.DisplayName, todo.Text)))
	}
}
