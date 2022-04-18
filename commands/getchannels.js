const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, User, Guild } = require('discord.js')
const GuildSettings = require("../models/GuildSettings");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getchannels")
        .setDescription("show all current set channel for your server"),
            
    async execute (interaction) {
        const suggestionID = "none"
        const welcomeID = "none"

        GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
            if(err){
                console.log(err)
                reaction.message.reply("an error accured. Please contact support.")
                return;
            }
            if(settings){
                suggestionID = settings.suggestion_channel_id;
                welcomeID = settings.welcome_channel_id;
                console.log(welcomeID)

                const channelEmbed = new MessageEmbed()
                .setColor('DARK_RED')
                .setTitle("All channels.")
                .setDescription("none = not set")
                .addField("Welcome Channel:", `<#${welcomeID}>`)
                .setTimestamp()
                .setFooter("getchannels command.")
            }
        })

        
        
        


        //await interaction.reply({ embeds: [channelEmbed] });
    }
}


