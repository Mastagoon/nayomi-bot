const Discord = require("discord.js");
const fs = require("fs");
const commandFiles = fs
    .readdirSync(__dirname)
    .filter((file) => file.endsWith(".js"));

module.exports = {
    name: "help",
    description: "Sends all help commands to user",
    execute(message, args) {
        const res = new Discord.MessageEmbed()
            .setColor("#EBCBD0")
            .setTitle("Command List")
            .setFooter("Yggdrasil RO", process.env.THUMBNAIL);
        console.log(commandFiles);
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            res.addFields({
                name: `@${command.name}`,
                value: `${command.description}\nUsage:${command.usage}`,
            });
        }
        message.channel.send(res);
    },
};