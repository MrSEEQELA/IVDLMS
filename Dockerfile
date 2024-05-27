# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install -g npm@latest
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Expo CLI globally
RUN npm install -g expo-cli

# Expose ports
EXPOSE 19006
EXPOSE 8081

# Use concurrently to run both frontend and backend
CMD ["npx", "expo", "start", "--web"]

