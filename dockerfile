FROM node:22.15-slim

# RUN adduser -D -u 1001 user
RUN apt-get update && apt-get install -y git

WORKDIR /home/app/

COPY package.json package-lock.json ./

RUN mkdir node_modules

RUN npm ci --no-audit --loglevel verbose

COPY . .


