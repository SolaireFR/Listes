FROM node:lts-slim as node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build
# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/listes-frontend/browser /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf