# Use the official Node.js image as the base image
FROM node:18 AS build
WORKDIR /client

# Copy package.json and install dependencies
COPY client/package*.json ./
RUN npm install

# Copy the remaining source code
COPY client/. ./

# Build the front-end
RUN npm run build

# Use a lightweight web server to serve the build files
FROM nginx:alpine AS runtime
COPY --from=build /client/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80