const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, User, Guild, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("verify")
        .setDescription("verify yourself"),

    async execute (interaction) {
    

        const VerifyEmbed1 = new MessageEmbed()
            .setColor('GOLD')
            .setTitle("Verify here")
            .setDescription("how to verify?")
            .addField("Rules", "Press the green button to accept the rules.")
            .addField("Verify", "After reading the rules press the blue button to be verified.")
            .setTimestamp()
            .setFooter("Decide command.")

        const Buttons = new MessageActionRow()
		    .addComponents(
			    new MessageButton()
				    .setCustomId('rules')
				    .setLabel('Rules')
				    .setStyle('SUCCESS'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('verify')
                    .setLabel('Verify')
                    .setStyle('PRIMARY'),
		    );
        
        
        await interaction.reply({ embeds: [VerifyEmbed1], components: [Buttons] });
    }
}