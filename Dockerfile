FROM node:18

WORKDIR /app

# Install app dependencies
COPY package.json /app/
COPY . /app/
COPY /fonts /app/fonts

RUN npm install
CMD [ "node", "index.js" ]
