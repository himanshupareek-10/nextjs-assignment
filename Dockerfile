# Stage 1
FROM node:22.0.0-alpine3.18 AS builder

RUN apk add python3 make git --update

WORKDIR /home/code

COPY . /home/code

RUN echo $ENV_FILE | base64 -d > .env

RUN npm run build

FROM alpine:3.18 as docker_files
WORKDIR /home/code
ARG USERNAME
ARG PASSWORD
RUN apk update && apk add git
RUN git clone -b main "https://${USERNAME}:${PASSWORD}@gitlab.com/trulymadly/tm-infra/tm-deployment-utils.git"

# Stage 2

FROM nginx:1.25.2-alpine3.18 AS server

COPY --from=builder /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=builder /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

COPY --from=builder /home/code /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

RUN apk add --no-cache supervisor

COPY --from=docker_files /home/code/tm-deployment-utils/docker/nginx/calculator-seo.conf /etc/nginx/conf.d
COPY --from=docker_files /home/code/tm-deployment-utils/docker/supervisor/supervisor.conf /etc/supervisor/supervisor.conf
COPY --from=docker_files /home/code/tm-deployment-utils/docker/startup-calculator-seo.sh /home/code/startup-calculator-seo.sh

CMD ["/bin/sh", "/home/code/startup-calculator-seo.sh"]
