#!/bin/bash

ENV=$1

echo $ENV

if [ "$ENV" = "backend" ] || [ "$ENV" = "frontend" ] || [ "$ENV" = "mongo" ] || [ "$ENV" = "mongo-express" ] || [ "$ENV" = "mongo-client" ] || [ "$ENV" = "nginx" ]; then
    docker-compose down $ENV
    docker-compose build $ENV
    docker-compose up -d --no-deps --build $ENV
fi
