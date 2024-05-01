# Dockerfile
FROM node:16-alpine3.15
RUN apk update && \
    apk upgrade && \
    npm install -g npx && \
    npx update-browserslist-db@latest

RUN apk add --no-cache apk-tools && \
    apk add --no-cache openssl && \
    apk add --no-cache bash
WORKDIR /src