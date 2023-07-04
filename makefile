# Makefile

# Variables
SERVER_DIR = server
CLIENT_DIR = client
DB_NAME = mongo

# Docker image and container names
IMAGE_NAME = mongodb
CONTAINER_NAME = todo-list

# Targets
.PHONY: install-client install-server start-client start-server dockerBuild dockerUp dockerDown dockerClean

install-client:
	cd $(CLIENT_DIR) && yarn

install-server:
	cd $(SERVER_DIR) && yarn

start-client:
	cd $(CLIENT_DIR) && yarn start

start-server:
	cd $(SERVER_DIR) && node server.mjs

# Build the Docker image
dockerBuild:
	docker build -t $(IMAGE_NAME) .

# Run the Docker container
dockerUp:
	docker run -d -p 27017:27017 --name $(CONTAINER_NAME) $(IMAGE_NAME)

# Stop and remove the Docker container
dockerDown:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

# Clean up the Docker image and container
dockerClean:
	make dockerDown
	docker rmi $(IMAGE_NAME)
