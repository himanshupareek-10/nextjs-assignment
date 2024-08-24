# Stage 1
FROM node:18.17.0-alpine3.9 AS staging

ARG ENV_FILE

RUN apk add python make git --update

RUN mkdir /home/data

WORKDIR /home/code

COPY . /home/code

RUN echo $ENV_FILE | base64 -d > .env

RUN npm install && rm -rf /var/cache/apk/*

RUN npm run build

FROM alpine:3.14 as docker_files
WORKDIR /home/code
ARG USERNAME
ARG PASSWORD
RUN apk update && apk add git
RUN git clone -b main "https://${USERNAME}:${PASSWORD}@gitlab.com/trulymadly/tm-infra/tm-deployment-utils.git"

# Stage 2

FROM nginx:1.17.8-alpine

COPY --from=staging /home/code /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=docker_files /home/code/tm-deployment-utils/docker/nginx/pwa.conf /etc/nginx/conf.d
COPY --from=docker_files /home/code/tm-deployment-utils/docker/startup-pwa.sh /home/code/startup-pwa.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
