FROM node:22-alpine

WORKDIR /app

COPY index.js .
COPY package*.json .
RUN npm install
# node modules + code + package.json + lock file
CMD ["node", "index.js"]

