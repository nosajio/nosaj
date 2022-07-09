# init_dev_db:
# 	docker build -t pg_dev .

# dev_db:
# 	docker run --name dev-db --rm -p 5432:5432 pg_dev

dev:
	echo "Build for dev"
	go build -o ./targets/data
	./targets/data

prod: 
	echo "Build for production (Debian Linux)"
	GOOS=linux GOARCH=amd64 go build -o ./targets/data_prod