const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const GuildSettings = require("../models/GuildSettings");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setsuggestionschannel")
		.setDescription("Set the suggestions message channel")
		.addChannelOption(option => option
			.setName("suggestion")
			.setDescription("The channel to set as the suggestion channel")
			.setRequired(true)
		),
	async execute(interaction) {
		
		// Check for admin permissions
		if (!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
			interaction.reply("You do not have permission to use this command!");
			return;
		}

		GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err);
				interaction.reply("An error occurred while trying to set the suggestions channel!");
				return;
			}

			//if there is no settings database
			if (!settings) {
				settings = new GuildSettings({ //create new database and set the guild_id and the suggestions_id
					guild_id: interaction.guild.id,
					welcome_channel_id: String,
					suggestion_channel_id: interaction.options.getChannel("suggestion").id
				});
			} else {
				settings.suggestion_channel_id = interaction.options.getChannel("suggestion").id; //if there is a database, set the suggestion_id
			}

			settings.save(err => {
				if (err) {
					console.log(err);
					interaction.reply("An error occurred while trying to set the suggestions channel!");
					return;
				}

				interaction.reply(`suggestions channel has been set to ${interaction.options.getChannel("suggestion")}`);
			})
		})

	}
}