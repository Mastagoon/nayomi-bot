// libraries
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
require("dotenv").config();
//required files

//other consts
const prefix = ",";
const messages = [
    "Can i be your friend?",
    "Can i suck on that?",
    "Can i call you daddy?",
    "DADDY !!",
    "that's gay."
]
//read command files
bot.commands = new Discord.Collection();
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
//set bot commands
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on("ready", () => {
    console.log("logged in as " + bot.user.tag);
    bot.user.setActivity("dickin'");
});

bot.on("message", (message) => {
    if(!message.author.bot) {
        const d = new Date( timestamp );
        date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
        let channel = message.channel.type == "dm" ? "DM" : message.channel;
        fs.appendFile('server-log.txt', date+" "+channel+ " " +message.author.username+" : "+message.content+"\n", function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
    if(Math.random() * 100 < 10 && !message.author.bot) {
        message.reply(messages[Math.floor(Math.random() * messages.length)])
    }
    if(message.content.toLowerCase().includes("gay")) {
        message.reply("no you!");
    }
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
    }
})
bot.login(process.env.BOT_TOKEN);