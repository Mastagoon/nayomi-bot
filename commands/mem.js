const Discord = require("discord.js");
const axios = require("axios");
const url = "https://meme-api.herokuapp.com/gimme";

module.exports = {
    name: "mem",
    description: "mems you",
    execute(message, args) {
        axios.get(url).then(res => {
            const embed = new Discord.MessageEmbed()
            .setTitle(res.data.title)
            .setColor("GREEN")
            .setImage(res.data.url);
            message.channel.send(embed);
            // console.log(res.data);
        }) 
    },
};