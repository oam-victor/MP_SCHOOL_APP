FROM node:20-alpine

WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the container
COPY ./app.ts ./tsconfig.json pnpm-lock.yaml package.json ./
COPY /db /app/db
COPY /controllers /app/controllers
COPY /models /app/models
COPY /routes /app/routes

# Install PNPM globally (if not already installed)
RUN npm install -g pnpm

# Install project dependencies using PNPM
RUN pnpm install

# Build your Vite.js application for production
RUN pnpm run build

EXPOSE 3000

# Command to start your node application
CMD ["pnpm",  "run", "dev"]