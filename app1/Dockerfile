
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 9230
CMD ["node", "--inspect=0.0.0.0:9230", "dist/worker.js"]
