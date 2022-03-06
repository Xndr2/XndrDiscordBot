const { SlashCommandBuilder } = require('@discordjs/builders')

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
        const messages = ["For sure", "No", "No question, Yes", "No one knows", "Maybe", "No question, No"]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        await interaction.reply(randomMessage);
    }
}