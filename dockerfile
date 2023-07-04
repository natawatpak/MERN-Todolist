# Use an official MongoDB image as the base image
FROM mongo:latest

# Set environment variables
ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD password

# Expose the default MongoDB port
EXPOSE 27017
