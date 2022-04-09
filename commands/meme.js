const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, User, Guild } = require('discord.js')
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("gets a meme from /r/memes on reddit."),

    async execute(interaction) {
        let data = await fetch
        ("http://meme-api.herokuapp.com/gimme/memes").then(res => res.json())

        const MemeEmbed = new MessageEmbed()
            .setColor('DARK_AQUA')
            .setTitle(data.title)
            .setURL(data.postLink)
            .setImage(data.url)
            .setDescription(data.ups+" Upvotes")
            .setTimestamp()
            //.setFooter(text: "Meme command.")
        
        await interaction.reply({ embeds: [MemeEmbed] });
    }
}