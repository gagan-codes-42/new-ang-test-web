# Use Node.js as the build environment
FROM node:14.5.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before installing dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Install Angular CLI globally
RUN npm install -g @angular/cli@11.2.0

# Copy the rest of the application files
COPY . .

# Build the Angular application for production
RUN ng build --configuration=production

# Use Node.js as the runtime environment
FROM node:14.5.0

# Set the working directory
WORKDIR /app

# Copy the built Angular files
COPY --from=build /app/dist/epanipuriCartUI /app

# Install http-server globally
RUN npm install -g http-server

# Expose port 80
EXPOSE 3000

# Start the server
CMD ["http-server", "/app", "-p", "3000", "-c-1"]

