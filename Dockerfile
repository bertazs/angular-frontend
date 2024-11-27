# Use an official Node.js LTS (Long Term Support) image as the base image
FROM node:lts AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the Angular 17 app for production
RUN npm run build --prod

# Use an official Nginx image to serve the Angular app
FROM nginx:latest

# Copy built Angular files to Nginx's HTML directory
COPY --from=build /app/dist/angular-frontend/browser /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the Nginx server
EXPOSE 80

# Command to start Nginx server
CMD ["nginx", "-g", "daemon off;"]
