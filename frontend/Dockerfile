# Use an official Node runtime as the base image
FROM node:18.16.0

# Set the working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the application will run on
EXPOSE 5173

CMD ["npm", "run", "dev"]