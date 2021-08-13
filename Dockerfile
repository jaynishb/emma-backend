FROM node:11 AS base

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY .npmrc ./
RUN yarn
COPY . .
RUN yarn build

FROM node:11-alpine
WORKDIR /app
COPY --from=base /app .
RUN rm .npmrc

EXPOSE 3010

CMD [ "yarn", "start:prod" ]