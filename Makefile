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

clean:
	@rm -rf dist package.zip serverless.yml

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

docker-copy-node-node_modules: CONTAINER_NAME = $(PROJECT_NAME)-node-modules-temp
docker-copy-node-node_modules: docker-build
	@mkdir -p dist
	@docker create --name=$(CONTAINER_NAME) $(PROJECT_NAME):$(PROJECT_VERSION)
	@docker cp $(CONTAINER_NAME):/usr/src/app/node_modules ./dist/node_modules
	@docker rm $(CONTAINER_NAME)

docker-stop:
	@docker stop $(PROJECT_NAME)

docker-rm: docker-stop
	@docker ps -a --filter "name=$(PROJECT_NAME)*" -q | xargs docker rm

build: BUILD_ENV = $(shell if [ "$$ENV" = "development" ]; then echo '';  else echo $$ENV; fi)
build: clean docker-copy-node-node_modules
	@mkdir -p dist
	@./node_modules/.bin/babel ./src --out-dir dist/src --copy-files --quiet
	@./node_modules/.bin/babel ./scripts --out-dir dist/scripts --copy-files --quiet
	@cp ./$(BUILD_ENV).env ./dist/.env
	@cp ./package.json ./dist/
	@./node_modules/.bin/babel-node ./dist/scripts/build/buildServerlessConfig.js

package: build
	@rm -rf ./dist/scripts/
	@$(shell (cd dist && zip -rq ../package.zip .))

deploy: ENV = $(shell if [ -z $$ENV ]; then echo $${ENV:-dev}; fi)
deploy:
	@echo "Deploying to AWS via Serverless for $(ENV)"
	@serverless deploy --verbose --region $(AWS_REGION) --stage $(ENV)


