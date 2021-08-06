build:
	cd cmd && PORT=5000 go build -o ../bin/nightbot-handler && cd ..

run:
	PORT=5000 go run cmd/main.go

clean:
	rm -rf bin/