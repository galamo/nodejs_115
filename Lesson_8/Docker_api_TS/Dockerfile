FROM node:22-alpine

WORKDIR /app


COPY package*.json .
COPY tsconfig.json .
RUN npm install
COPY ./src /app/src
RUN npm run build

# node modules + code + package.json + lock file
CMD ["node", "./dist/index.js"]

