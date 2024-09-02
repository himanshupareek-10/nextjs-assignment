# Stage 1
FROM node:22.0.0-alpine3.18 AS builder

ARG ENV_FILE

RUN apk add python3 make git --update

WORKDIR /home/code

COPY . .

RUN echo $ENV_FILE | base64 -d > .env
RUN npm install && rm -rf /var/cache/apk/*
RUN npm run build

# Stage 2

FROM alpine:3.18 AS docker_files

WORKDIR /home/code

ARG USERNAME
ARG PASSWORD

RUN apk update && apk add git
RUN git clone -b main "https://${USERNAME}:${PASSWORD}@gitlab.com/trulymadly/tm-infra/tm-deployment-utils.git"

# Stage 3

FROM nginx:1.25.2-alpine3.18 AS server

COPY --from=builder /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=builder /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

COPY --from=builder /home/code/next.config.mjs /usr/share/nginx/html
COPY --from=builder /home/code/postcss.config.mjs /usr/share/nginx/html
COPY --from=builder /home/code/tailwind.config.ts /usr/share/nginx/html
COPY --from=builder /home/code/tsconfig.json /usr/share/nginx/html
COPY --from=builder /home/code/next-env.d.ts /usr/share/nginx/html
COPY --from=builder /home/code/public /usr/share/nginx/html/public
COPY --from=builder /home/code/build /usr/share/nginx/html/build
COPY --from=builder /home/code/package.json /usr/share/nginx/html/package.json
COPY --from=builder /home/code/node_modules /usr/share/nginx/html/node_modules

RUN rm /etc/nginx/conf.d/default.conf
RUN apk add --no-cache supervisor

COPY --from=docker_files /home/code/tm-deployment-utils/docker/nginx/calculator-seo.conf /etc/nginx/conf.d
COPY --from=docker_files /home/code/tm-deployment-utils/docker/supervisor/supervisor.conf /etc/supervisor/supervisor.conf
COPY --from=docker_files /home/code/tm-deployment-utils/docker/startup-calculator-seo.sh /home/code/startup-calculator-seo.sh

CMD ["/bin/sh", "/home/code/startup-calculator-seo.sh"]
