import dotenv from 'dotenv-safe'
import { Client, IntentsBitField } from 'discord.js';

dotenv.config({
    example: './.env.example'
})

const excludedChannelIds = [
    '1140724796536139848',
    '1195524419997667478',
    '1060427911242469386'
]

let lastTime = 0
const timer = 300 * 1000 // 300 seconds

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});
const token = process.env.TOKEN;

client.once('clientReady', () => {
    console.log('RMS is online!');
});

client.on('error', console.error)
client.on('shardError', console.error)

client.on('messageCreate', (message) => {
    const now = Date.now()
    const timeOut = now - lastTime < timer; // A boolean indicating if the bot is allowed to send a message, based on the timer duration.

    if (!client.user || message.author.id === client.user.id) {
        return
    }

    if (
        excludedChannelIds.includes(message.channel.id) ||
        excludedChannelIds.includes(message.channelId)
    ) {
        return
    }

   if (/(?<!GNU\/)linux/i.test(message.content) && !message.author.bot && !timeOut)  {
       message.channel.send(`
I'd just like to interject for a moment. What you're referring to as Linux,
is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux.
Linux is not an operating system unto itself, but rather another free component
of a fully functioning GNU system made useful by the GNU corelibs, shell
utilities and vital system components comprising a full OS as defined by POSIX.
`)
       lastTime = now;
   }
});

client.login(token);
