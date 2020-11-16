const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const queue = new Map();


const isMasta = (id) => {
    return id == "651501140386643969" ? true : false;
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
  
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  }

module.exports = {
    name: "plyh",
    description: "plyhs you",
    async execute(message, args) {
        if(!args.length || args.length > 1) return;
        const serverQueue = queue.get(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return isMasta(message.author.id) ?  message.channel.send("Please enter a voice room first master.") : message.channel.send("Can't play for ya if ya ain't listenin' bish");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        const songInfo = await ytdl.getInfo(args[0]);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
        };
        if (!serverQueue) {
            const queueContruct = {
              textChannel: message.channel,
              voiceChannel: voiceChannel,
              connection: null,
              songs: [],
              volume: 5,
              playing: true
            };
        
            queue.set(message.guild.id, queueContruct);
        
            queueContruct.songs.push(song);
        
            try {
              var connection = await voiceChannel.join();
              queueContruct.connection = connection;
              play(message.guild, queueContruct.songs[0]);
            } catch (err) {
              console.log(err);
              queue.delete(message.guild.id);
              return message.channel.send(err);
            }
          } else {
            serverQueue.songs.push(song);
            return message.channel.send(`${song.title} has been added to the queue!`);
          }

        
        return;        
    },
};