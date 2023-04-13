# Discord-Welcome-Image
This is a welcome image generator for Discord that uses node-canvas to create images.
This module allows customizing the welcome image.

## Install only inage generator

If you only need to use image generation, you only need to put card.js into your project.

1. Installation Dependencies 

```
npm i canvas stackblur-canvas opentype.js
```

2. Put `card.js` into your project

3. Download the `fonts` folder and put it in the same directory as `card.js`<br>
(If you want to customize the font, you don't need to.)


<br>
<hr>

### The background setting and font size setting.

```javascript
const imagebuffer = await wCard.CreateImageCard(
    'BACKGROUND IMAGE URL',
    'AVATAR URL',
    'WELCOME!',
    'Title',
    'Subtitle',
    {
        boderblur:90,
        bgblur:20
    },
    {
        WelcomeTextSize: 34,
        TitleSize: 62,
        SubtitleSize: 24
    }
)
```

## Examples

<details> <summary>Example of image generator</summary>

```javascript
// import card.js
const {WelcomeCard} = require('./card.js');
```

Initialization settings <br>
(font position, etc., if the default font is used then leave blank)

```javascript
// Use default font on fonts folder
//const wCard = new WelcomeCard()

const wCard = new WelcomeCard({
    WelcomeTextFont: "./fonts/NaikaiFont-Bold.ttf",
    Titlefont: "./fonts/NotoSansTC-Black.otf",
    SubTitleFont: "./fonts/NaikaiFont-Bold.ttf"
})
```


Preload font files.

```javascript
// Preload font files 
wCard.LoadFonts().then( ()=>{console.log('Fonts loaded.')} )
```


Create image.

```javascript
//Create Image Buffer
const imagebuffer = await wCard.CreateImageCard(
    'BACKGROUND IMAGE URL',
    'AVATAR URL',
    'WELCOME!',
    'Title',
    'Subtitle'
)
```
</details>

<details> <summary>Example of Discordbot and use Docker</summary>

## Docker compose
```yml
version: "3.9"
services:
  DiscordWelcomeBot:
    image: "ghcr.io/interfacegui/discord-welcome-image-bot:latest"
    environment:
      BGIMAGEURL: "BACKGROUND IMAGE URL"
      TOKEN: "YOUR Discord TOKEN"
      GUILDID: "YOUR Discord ServerID"
      W_CHANNEL: "Your Welcome Channel ID"
      INFO_CHANNEL: "Your Log Channel ID"
      WTEXT: "Welcome!"
      MTEXT: "Member Count"
```

### Environmental Variables

* `BGIMAGEURL`
Background image url put here.

* `TOKEN`
Discord bot token

* `GUILDID`
Your server ID

* `W_CHANNEL`
Welcome channel ID

* `INFO_CHANNEL`
User join TAG channel ID <br>
(This is used to allow administrators to view users. It will only TAG the user once on the INFO channel.)

* `WTEXT`
Welcome Text (ex. Welcome!)

* `MTEXT`
Subitile text (ex. Member Count: 123)

</details>
