# Discord-Welcome-Image

```yml
version: "3.9"

services:
  DiscordWelcomeBot:
    image: "ghcr.io/interfacegui/discord-welcome-image-bot:latest"
    environment:
      TOKEN: "YOUR Discord TOKEN"
      GUILDID: "YOUR Discord ServerID"
      W_CHANNEL: "Your Welcome Channel ID"
      INFO_CHANNEL: "Your Log Channel ID"
      WTEXT: "Welcome!"
      MTEXT: "Member Count"
```
