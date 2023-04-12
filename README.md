# Discord-Welcome-Image

```yml
version: "3.9"

services:
  TwitchAPI:
    image: "ghcr.io/interfacegui/twitch-api-token-refresher:latest"
    environment:
      TOKEN: "YOUR Discord TOKEN"
      GUILDID: "YOUR Discord ServerID"
      W_CHANNEL: "Your Welcome Channel ID"
      INFO_CHANNEL: "Your Log Channel ID"
      WTEXT: "Welcome!"
      MTEXT: "Member Count"
```
