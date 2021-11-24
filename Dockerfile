FROM node:14-bullseye
RUN npm install cwa-event-qr-code --global
RUN npm install express
RUN npm install express-easy-zip
RUN npm install formidable
RUN npm install temp
RUN mkdir /uploads
WORKDIR /app
COPY node.js .
EXPOSE 8080
ENTRYPOINT ["node", "node.js"]