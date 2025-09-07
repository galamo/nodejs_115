FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
RUN npm install
COPY ./src /app/src
RUN npm run build


FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY package*.json .
RUN npm install --only=production

# node modules + code + package.json + lock file
CMD ["node", "./dist/index.js"]

