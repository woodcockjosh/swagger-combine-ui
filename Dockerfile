FROM node:20.11.1-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN mkdir -p /app
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install && \
    npm cache clean --force

COPY index.js index.html swagger.yaml ./
COPY index.html ./node_modules/swagger-ui-dist/index.html
COPY lib ./lib

EXPOSE 3000
CMD ["node", "index.js"]
