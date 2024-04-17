FROM node:lts-alpine AS production

WORKDIR /app

COPY ./build /app
COPY ./package.json /app
COPY ./package-lock.json /app

EXPOSE 3000
CMD ["node", "."]
