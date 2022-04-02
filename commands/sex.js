const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sex")
        .setDescription(":thumbsup:"),

        async execute(interaction) {
            const messages = ["Sex", "sex", "when sex update?"]
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            await interaction.reply(randomMessage);
        }
}
