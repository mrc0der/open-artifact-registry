SHELL=/bin/bash

down:
	@echo "==> Removing containers..." && \
	docker-compose down --rmi all

up: down
	@echo "==> Bringing up containers..." && \
	docker-compose up --force-recreate -d
