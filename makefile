# Makefile for MERN project

# Variables
SERVER_DIR = server
CLIENT_DIR = client

# Targets
.PHONY: install-client install-server start-client start-server

install-client:
	cd $(CLIENT_DIR) && yarn

install-server:
	cd $(SERVER_DIR) && yarn

start-client:
	cd $(CLIENT_DIR) && yarn start

start-server:
	cd $(SERVER_DIR) && node server.mjs
