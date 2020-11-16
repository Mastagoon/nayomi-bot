const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const queue = new Map();


const isMasta = (id) => {
    return id == "651501140386643969" ? true : false;
}


module.exports = {
    name: "plyh",
    description: "plyhs you",
    execute(message, args) {
        const serverQueue = queue.get(message.guild.id);
        if (!message.member.voice.channel)
          return isMasta(message.author.id) ?  message.channel.send("I am sorry master, you need to be in voice to stop the song.") : message.channel.send("cum voice chat first ya cunt.")
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    },
};