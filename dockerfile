# # Define the base stage
# FROM node:22.1.0-alpine AS base
# WORKDIR /app

# COPY ./package*.json ./
# COPY ./tsconfig*.json ./
# # COPY ./pnpm-lock.yaml ./ # Commented out if file doesn't exist

# # Define the build stage
# FROM base AS build

# RUN npm install -g pnpm
# RUN pnpm install

# # Copy all files except node_modules (using .dockerignore would be better)
# COPY src/ ./src/
# COPY public/ ./public/
# COPY views/ ./views/
# COPY package.json tsconfig.json ./

# RUN pnpm build
# RUN pnpm prune --prod
# # Define the final stage

# FROM node:22.1.0-alpine
# WORKDIR /app

# COPY --from=build /app/dist /app/dist
# COPY --from=build /app/node_modules /app/node_modules

# EXPOSE 3000

# CMD ["node", "dist/src/main.js"]


FROM ubuntu

WORKDIR /src

# Cập nhật package và cài curl, Node.js v18
RUN apt update && apt install -y curl \
  && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt install -y nodejs

# Copy file cấu hình package
COPY package*.json ./

# Cài đặt npm packages
RUN npm install

# Copy toàn bộ project vào container, trừ những gì đã được ignore
COPY . .

COPY .env .env

# Chạy ứng dụng khi container khởi động
CMD ["node", "src/index.js"]