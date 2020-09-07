ARG NODE_VERSION=12
ARG NODE_ENV=production

# APPLICATION DEPENDENCIES

FROM node:${NODE_VERSION}-slim AS dependencies
WORKDIR /home/app

RUN apt-get update
RUN apt-get install -y build-essential

COPY . .

RUN yarn install --frozen-lock
RUN yarn build

# APPLICATION EXECUTION

FROM nginx:1.19-alpine AS execution
WORKDIR /usr/share/nginx/html

COPY --from=dependencies /home/app/build .

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]