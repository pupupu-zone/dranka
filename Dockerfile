# module install
FROM node:20-alpine as module-install-stage
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

RUN npm install -g pnpm
RUN pnpm install

# build
FROM node:20-alpine as build-stage
COPY --from=module-install-stage /app/node_modules/ /app/node_modules
WORKDIR /app
COPY . .
RUN npm run build

# serve
FROM nginx:alpine
COPY --from=build-stage /app/dist/ /var/www/
COPY nginx.conf /etc/nginx/nginx.conf

# start app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
