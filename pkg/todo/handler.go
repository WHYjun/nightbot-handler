package todo

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/WHYjun/nightbot-handler/pkg/nightbot"
	"github.com/WHYjun/nightbot-handler/pkg/store"
)

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

func PostHandler(w http.ResponseWriter, r *http.Request) {

}
