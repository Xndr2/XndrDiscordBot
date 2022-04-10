const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("for testing, currently will ping you back"),

        async execute(interaction) {
            
            await interaction.reply("member "+member)
        }
}
