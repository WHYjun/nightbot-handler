package main

import (
	"github.com/WHYjun/nightbot-handler/pkg/server"
	"github.com/WHYjun/nightbot-handler/pkg/store"
)

func main() {
	store.Init()
	server.Start()
}
