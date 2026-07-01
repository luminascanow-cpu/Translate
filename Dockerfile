# Use the official Node.js 20 Alpine image for a small footprint
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including devDependencies needed for build)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite frontend and bundle the Express server
RUN npm run build

# Expose the port the app runs on (Cloud Run provides the PORT env var)
EXPOSE 8080

# Start the application using the generated production bundle
CMD ["npm", "start"]
