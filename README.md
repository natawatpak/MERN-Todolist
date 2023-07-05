# MERN-Todolist
MERN-stack practice

## Prerequisites
- Node.js
- Yarn package manager
- Docker

## Installation 
#### 1. Install the client-side dependencies:
```go
make install-client
```

#### 2. Install the server-side dependencies:

```go
make install-server
```

#### 3. Build the Docker image for the database:
```go
make dockerBuild
```

#### 4. Update the environment file:
Copy the contents of .env.example in the server directory and overwrite the existing .env file with it. Make sure to configure the environment variables in the updated .env file.



## Usage
#### 1. Start the database container:

```go
make dockerUp
```

#### 2. Start the server:

```go
make start-server
```

#### 3. Start the client:

```go
make start-client
```

#### 4. Open your web browser and navigate to http://localhost:3000 to access the Todo List application.

## Docker Management
- #### To stop the Docker container, run:
    ```go
    make dockerDown
    ```
- #### To clean up the Docker image and container, run:
    ```go
    make dockerClean
    ```

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements
- This project was built using [Node.js](https://nodejs.org/en) and [React](https://react.dev/).
- The server-side uses [MongoDB](https://www.mongodb.com/) as the database.
- The client-side uses [Yarn](https://yarnpkg.com/) as the package manager.



