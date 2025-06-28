FROM node:24.1.0-alpine3.20 AS builder
WORKDIR /usr/src/app
ENV HUSKY=0
RUN apk add bash
SHELL [ "/bin/bash", "-c" ]
COPY .yarn .yarn
COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack enable && yarn install --immutable
COPY . .
RUN yarn build

FROM caddy:2.10.0-alpine AS runtime
ENV PORT=80
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /usr/src/app/dist/ng-translate/browser /srv/site
