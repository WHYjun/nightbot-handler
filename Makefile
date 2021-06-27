PORT=5000

build:
	cd cmd && go build -o ../bin/nightbot-handler && cd ..

clean:
	rm -rf bin/