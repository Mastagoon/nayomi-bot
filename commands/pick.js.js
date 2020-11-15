const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();


const methods = [
    "hentaithigh",
    "nekofeet",
    "lewd",
    "wallpaper"
]

const response = [
    "I can suck yours!",
    "I'll send if you send....",
    "B-Baka !!",
    "Richard , i'm funny !"
]

var image;

module.exports = {
    name: "pick",
    description: "picks you",
    async execute(message, args) {
        switch(Math.floor(Math.random() * methods.length )) {
            case 0:
                image = await nsfw.hentaithigh();
                break;
            case 1:
                image = await nsfw.nekofeet();
                break;
            case 2:
                image = await nsfw.lewd();
                break;
            case 3:
                image = await nsfw.wallpaper();
            default:
                break;
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(response[Math.floor(Math.random() * response.length)])
            .setColor("GREEN")
            .setImage(image);
        message.channel.send(embed);
        return;        
    },
};

//Anal (anal)
// 4K (fourk)
// Ass (ass)
// Gonewild (gonewild)
// Porngif (pgif)
// Pussy (pussy)
// Thigh (thigh)
// Boobs (boobs)
// Hentai Ass (hentaiass)
// Hentai (hentai)
// Hentai Midriff (hmidriff)
// Hentai Thigh (hentaithigh)
// Erokemo (erokemo)
// Kitsune (kitsune)
// Lewd (lewd)
// Neko Feet (nekofeet)
// Neko Pussy (nekopussy)
// Neko Tits (nekotits)
// Solo (solo)
// Wallpaper (wallpaper)

// var funcAr = ['funcName0', 'funcName1', 'funcName2', 'funcName3']; 
// var upper = funcAr.length; 
// function getRandInt(u) { 
//   return Math.floor(Math.random() * Math.floor(u)); 
// } 
// var functionName = funcAr[getRandInt(upper)]; 
// // the function is then available in this call 
// window["functionName"](); 