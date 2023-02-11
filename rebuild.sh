#!/bin/bash

ENV=$1

docker-compose down
docker-compose build
docker-compose up 
