//const config = require('./config.json')

const { Client, GatewayIntentBits, Events} = require('discord.js');

const {WelcomeCard} = require('./card.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});
const config={
    token: process.env.TOKEN,
    GuildID: process.env.GUILDID,
    WelcomeChannel: process.env.W_CHANNEL,
    infoChannel: process.env.INFO_CHANNEL,
    WelcomeText: process.env.WTEXT,
    memberCountText: process.env.MTEXT
}

const wCard = new WelcomeCard({
    WelcomeTextFont: "./fonts/NaikaiFont-Bold.ttf",
    Titlefont: "./fonts/NotoSansTC-Black.otf",
    SubTitleFont: "./fonts/NaikaiFont-Bold.ttf"
})


const bg = 'https://media.discordapp.net/attachments/464402915591979028/1095545854917623848/PSX_20230412_110801.jpg'

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;
    if (!(['KarterLauder#2466','LarsHagrid#2620'].includes(message.author.tag))) return;
    if (!message.content.startsWith('w!test1')) return;
	const avatar = message.author.displayAvatarURL({ extension: 'png' })
    const imagebuffer = await wCard.CreateImageCard(
        bg,
        avatar,
	'welcomeText',
        message.author.username,
        `MCount: ${message.guild.memberCount}`
    )
    
    await message.channel.send({files: [imagebuffer] })

});

client.on(Events.GuildMemberAdd, async member  => {
    
	const avatar = member.displayAvatarURL({ extension: 'png' })
    const imagebuffer = await wCard.CreateImageCard(
        bg,
        avatar,
        `${config.WelcomeText}`,
        member.username,
        `${config.memberCountText}: ${member.guild.memberCount}`
    )
    
    const channel = await client.guilds.cache.get(config.GuildID).channels.fetch(config.WelcomeChannel)
    await channel.send({files: [imagebuffer] });

    const channel2 = await client.guilds.cache.get(config.GuildID).channels.fetch(config.infoChannel)
    await channel2.send({content:`<@${member.id}>`});

});
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

wCard.LoadFonts().then(
    client.login(config.token)
).catch(async (e)=>{
    console.log(e)
    await sleep(60000)
})
