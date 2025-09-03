# ---- build stage ----
FROM node:lts-alpine AS builder
WORKDIR /app

# copy package manifest and install deps
COPY package*.json ./
RUN npm install --production=false

