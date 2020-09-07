include .env

up:
	docker-compose up

down:
	docker-compose down -v --rmi all

logs:
	docker-compose logs -f