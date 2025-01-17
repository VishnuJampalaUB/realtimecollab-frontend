# RealtimeCollab Frontend

## Prerequisites

Before you begin, ensure you have Docker and Docker Compose installed on your system. If not, you can download them from the following links:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

These instructions will cover setting up your local development environment and running the application using Docker.

### 1. Clone the Repository

First, clone the application repository to your local machine:

```bash
git clone https://github.com/yourusername/yourrepository.git
cd yourrepository
```

### 2. Build the Docker Images
Next, build the Docker images for the application. This will compile your application and package it into a Docker image.

```bash
docker-compose build
```


### 3. Run the Docker Containers
Once the images are built, you can start the containers using:

```bash
docker-compose up
```

4. Access the Application
After the containers are up and running, you can access the application by navigating to:

http://localhost:3000
