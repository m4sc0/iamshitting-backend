FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# serve
FROM node:20-alpine AS serve
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["node", "dist/index.js"]