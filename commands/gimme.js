const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

var image;

module.exports = {
    name: "gimme",
    description: "gives you",
    execute(message, args) {
        if (!message.member.roles.cache.find((r) => r.name === "0.01 Incher")) return;
        message.reply("you got it ;)");
        message.author.send("here's the logs file: ", {files: ["./server-log.txt"]})
        return;        
    },
};