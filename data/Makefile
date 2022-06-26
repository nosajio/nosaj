dev:
	echo "Build for dev"
	go build -o ./targets/data
	./targets/data

prod: 
	echo "Build for production (Debian Linux)"
	GOOS=linux GOARCH=amd64 go build -o ./targets/data_prod