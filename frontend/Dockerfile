FROM node:20-alpine3.16

WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the container
COPY .gitignore ./index.html ./postcss.config.js ./tailwind.config.js ./vite.config.ts ./tsconfig.node.json ./tsconfig.json ./package.json ./pnpm-lock.yaml ./
COPY /src /app/src
COPY /images /app/images

# Install PNPM globally (if not already installed)
RUN npm install -g pnpm

# Install project dependencies using PNPM
RUN pnpm install

# Build your Vite.js application for production
RUN pnpm run build

EXPOSE 5173

# Command to start your Vite.js application
CMD ["pnpm", "run", "dev"]