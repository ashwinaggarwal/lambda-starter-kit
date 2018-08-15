include .env

DOCKER_PATH = $(shell which docker)
DOCKER_IMAGE = $(shell docker images $(PROJECT_NAME):$(PROJECT_VERSION) -q)
PROJECT_NAME = $(call GetFromPackageJson, name)
PROJECT_VERSION = $(call GetFromPackageJson, version)

define GetFromPackageJson
$(shell node -p "require('./package.json').$(1)")
endef

.PHONY: docker docker-run

start:
	node --inspect --debug=5859 ./src/server/index.js

docker:
ifndef DOCKER_PATH
	@echo "Please install Docker first"
else
	@make docker-build
endif

docker-build:
	docker build -t $(PROJECT_NAME):$(PROJECT_VERSION) .

docker-run:
ifdef DOCKER_IMAGE
	$(shell docker run \
	--env-file=./.env \
	-p=$(PORT):$(PORT) \
	-p=$(DEBUG_PORT):$(DEBUG_PORT) \
	-v "$$HOME/.aws/:/root/.aws/" \
	-v "$$PWD/.env:/usr/src/app/.env" \
	-v "$$PWD/src:/usr/src/app/src" \
	-v "$$PWD/.babelrc:/usr/src/app/.babelrc" \
	-v "$$PWD/.eslintrc.js:/usr/src/app/.eslintrc.js" \
	-v "$$PWD/Makefile:/usr/src/app/Makefile" \
	-v "$$PWD/package.json:/usr/src/app/package.json" \
	--name="$(PROJECT_NAME)" \
	-it $(PROJECT_NAME):$(PROJECT_VERSION))
else
	@echo "Docker Image for $(PROJECT_NAME):$(PROJECT_VERSION) not available"
endif

docker-stop:
	@docker stop $(PROJECT_NAME)

docker-rm: docker-stop
	@docker rm $(PROJECT_NAME)

