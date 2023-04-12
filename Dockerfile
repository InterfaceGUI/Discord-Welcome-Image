FROM node:18

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY . /usr/src/app/
COPY ./fonts/ /usr/src/app/fonts

RUN npm install
CMD [ "node", "index.js" ]
