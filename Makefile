shell: ## run a shell on the cookie-cutter container
	docker exec -it edx.fecc /bin/bash

build:
	docker-compose build

up: ## bring up cookie-cutter container
	docker-compose up

up-detached: ## bring up cookie-cutter container in detached mode
	docker-compose up -d

logs: ## show logs for cookie-cutter container
	docker-compose logs -f

down: ## stop and remove cookie-cutter container
	docker-compose down

npm-install-%: ## install specified % npm package on the cookie-cutter container
	docker exec npm install $* --save-dev
	git add package.json

restart:
	make down
	make up

restart-detached:
	make down
	make up-detached

validate-no-uncommitted-package-lock-changes:
	git diff --name-only --exit-code package-lock.json
