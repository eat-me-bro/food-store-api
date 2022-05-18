logs:
	docker logs fs-api
build:	
	docker-compose build
up:
	docker-compose up -d	
	sleep 1
	docker image prune -f
	docker logs fs-api
down:
	docker-compose down