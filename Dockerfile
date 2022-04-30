FROM node:16-alpine3.14
RUN apk --no-cache add --virtual .builds-deps build-base python3
WORKDIR /app
COPY . /app
RUN yarn workspaces focus --production
CMD [ "node", "start" ]
EXPOSE 3000