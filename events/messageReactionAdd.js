const { REST } = require("@discordjs/rest");
const { MessageEmbed, Guild } = require("discord.js");
const { Routes } = require("discord-api-types/v10");
require("dotenv").config();
const GuildSettings = require("../models/GuildSettings");


module.exports = {
    name: "messageReactionAdd",
    async execute (reaction) {
        if(reaction.message.reactions.cache.get('👍')) return;
        if(reaction.message.channel.id === '964867563848888320'){
            if(reaction.message.reactions.cache.get('✅').count == 2){
                reaction.message.author.send("You suggestion has been logged.\n"+reaction.message.content)
                reaction.message.react('👍')
         
                const suggestionEmbed = new MessageEmbed()
                .setColor('BLURPLE')
                .setTitle("Suggestion by "+reaction.message.author.username)
                .setDescription(reaction.message.content)
                .setTimestamp()
                

                GuildSettings.findOne({ guild_id: reaction.message.guild.id }, (err, settings) => {
                    if(err){
                        console.log(err)
                        reaction.message.reply("an error accured while logging message.")
                        return;
                    }
                    reaction.message.reply(settings.suggestion_channel_id);
                })
                
            }
        }
    }
}