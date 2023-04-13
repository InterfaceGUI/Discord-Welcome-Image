FROM node:18

WORKDIR /app
RUN ls
RUN mkdir ./fonts
RUN wget -o ./fonts/NotoSansTC-Black.otf https://raw.githubusercontent.com/InterfaceGUI/Discord-Welcome-Image/main/fonts/NotoSansTC-Black.otf
RUN wget -o ./fonts/NaikaiFont-Bold.ttf https://raw.githubusercontent.com/InterfaceGUI/Discord-Welcome-Image/main/fonts/NaikaiFont-Bold.ttf

COPY package.json /app
COPY . /app
COPY /fonts /app/fonts
RUN ls

RUN npm install
CMD [ "node", "index.js" ]
