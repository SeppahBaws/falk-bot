/* initialize the Discord api */
const Discord = require("discord.js");
const client = new Discord.Client();

/* config file */
const config = require("./config.json");

/* show that the bot is ready */
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

/* stuff to inline reply, looks much cleaner */
/* https://gist.github.com/Allvaa/0320f06ee793dc88e4e209d3ea9f6256 */
const { APIMessage, Structures } = require("discord.js");

class ExtAPIMessage extends APIMessage {
    resolveData() {
        if (this.data) return this;
        super.resolveData();
        if ((this.options.allowedMentions || {}).repliedUser !== undefined) {
            if (this.data.allowed_mentions === undefined) this.data.allowed_mentions = {};
            Object.assign(this.data.allowed_mentions, { replied_user: this.options.allowedMentions.repliedUser });
            delete this.options.allowedMentions.repliedUser;
        }
        if (this.options.replyTo !== undefined) {
            Object.assign(this.data, { message_reference: { message_id: this.options.replyTo.id } });
        }
        return this;
    }
}

class Message extends Structures.get("Message") {
    inlineReply(content, options) {
        return this.channel.send(ExtAPIMessage.create(this, content, options, { replyTo: this }).resolveData());
    }

    edit(content, options) {
        return super.edit(ExtAPIMessage.create(this, content, options).resolveData());
    }
}

Structures.extend("Message", () => Message);


/* when we receive a message, check and reply */
client.on("message", msg => {
    if (msg.author.bot) return;
    if (msg.content.toLowerCase() === config.messageContent.toLowerCase() &&
        msg.channel.id === config.channelId) {
        msg.inlineReply(config.response);
    }
});

client.login(config.discordToken);
