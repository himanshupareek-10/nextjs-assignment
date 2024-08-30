# Stage 1
FROM node:18.17.0-alpine3.18 AS build

ARG ENV_FILE

RUN apk add python3 make git --update

RUN mkdir /home/data

WORKDIR /home/code

COPY . /home/code

RUN echo $ENV_FILE | base64 -d > .env

RUN npm install && rm -rf /var/cache/apk/*

RUN npm run build

# Stage 2

FROM alpine:3.18 as docker_files
WORKDIR /home/code
ARG USERNAME
ARG PASSWORD
RUN apk update && apk add git
RUN git clone -b main "https://${USERNAME}:${PASSWORD}@gitlab.com/trulymadly/tm-infra/tm-deployment-utils.git"

RUN apt install -y nginx

COPY --from=build /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=build /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

COPY --from=build /home/code /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=docker_files /home/code/tm-deployment-utils/docker/nginx/calculator-seo.conf /etc/nginx/conf.d
COPY --from=docker_files /home/code/tm-deployment-utils/docker/startup-calculator-seo.sh /home/code/startup-calculator-seo.sh

CMD ["/bin/sh", "/home/code/startup-calculator-seo.sh"]
