/* initialize the Discord api */
const Discord = require("discord.js");
const { GatewayIntentBits } = require("discord.js");

const client = new Discord.Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

/* config file */
const config = require("./config.json");

/* show that the bot is ready */
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

/* when we receive a message, check and reply */
client.on("messageCreate", (msg) => {
	if (msg.author.bot) {
		return;
	}
	if (msg.content.toLowerCase() === config.messageContent.toLowerCase() && msg.channel.id === config.channelId) {
		msg.reply(config.response);
	}
});

client.login(config.discordToken);
