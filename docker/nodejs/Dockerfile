# FROM node:lts
FROM node:16-alpine3.15
RUN apk update && \
    apk upgrade 

RUN apk add --no-cache apk-tools && \
    apk add --no-cache openssl && \
    apk add --no-cache bash
WORKDIR /src

# publicフォルダーをコピー
# COPY ../frontend/react-project/public ./public
