# ==========================================
# 1. Build Stage: Node + Vite Build
# ==========================================
FROM node:22-alpine AS build
WORKDIR /app

# Copy dependency definitions and install
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source and build production static bundle
COPY . .
RUN npm run build

# ==========================================
# 2. Runtime Stage: High Performance Nginx
# ==========================================
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
