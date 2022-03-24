const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, User, Guild } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("decide")
        .setDescription("Decide command")
        .addStringOption(option =>(
            option.setName('input')
                .setDescription('Give an argument')
                .setRequired(true))
        ),
            
    async execute (interaction) {
        const string = interaction.options.getString('input');
        const user = interaction.options.getUser('target');
        const messages = ["For sure", "No", "No question, Yes", "No one knows", "Maybe", "No question, No"]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        //await interaction.reply(randomMessage);

        const DecideEmbed = new MessageEmbed()
            .setColor('DARK_AQUA')
            .setTitle(":eyes: "+string)
            .setDescription(randomMessage)
            .setTimestamp()
            .setFooter("Decide command.")
        
        
        await interaction.reply({ embeds: [DecideEmbed] });
    }
}