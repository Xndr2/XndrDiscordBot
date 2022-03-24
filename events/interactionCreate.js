const decide = require("../commands/decide");

module.exports = {
    name: "interactionCreate",
    once: true,
    async execute (interaction) {
        if(interaction.isCommand()){

            const command = interaction.client.commands.get(interaction.commandName);
    
            if(!command) return;
        
            try {
                await command.execute(interaction);
            } catch (err) {
                if(err) console.error(err);
               await interaction.reply({
                    content: "Error while executing command.",
                });
            }
        }

        if(interaction.isButton()){
            // code here
        }
    }
}