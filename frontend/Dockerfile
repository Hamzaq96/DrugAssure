FROM node:11

# Create directory for the container.
WORKDIR /app

# Install dependencies.
COPY frontend/package*.json ./
COPY frontend/package-lock.json ./
RUN npm install

# Copy all project files.
COPY . .

# Startup command.
CMD [ "npm", "start" ]

# Expose ports.
EXPOSE 3000
