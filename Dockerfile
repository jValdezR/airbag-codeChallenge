# Use the official Node.js image with the specified version and Alpine Linux
FROM node:18-alpine3.17

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package*.json ./

# Install Node.js dependencies using npm
RUN npm install
# Copy the rest of the application source code to the working directory
COPY . .

# Define the command to run the application with environment variable support
CMD ["sh", "-c", "npm start --port $PORT"]
