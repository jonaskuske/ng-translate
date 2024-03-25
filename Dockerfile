FROM node:20.11.0-alpine as builder
WORKDIR /usr/src/app
RUN apk add bash
SHELL [ "/bin/bash", "-c" ]
COPY ./.yarn ./.yarn
COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack enable && yarn install --immutable
COPY . .
RUN yarn build

FROM caddy:2.7.6-alpine
ENV PORT 80
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /usr/src/app/dist/browser /srv
