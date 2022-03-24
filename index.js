require("dotenv").config();
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const {Client, Intents, Collection, Interaction} = require("discord.js");
const { Console } = require("console");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    console.log("Online");
    client.user.setActivity("/commands", {type: "WATCHING"});
    const CLIENT_ID = client.user.id;
    const rest = new REST({
        version: "10"
    }).setToken(process.env.TOKEN);

    (async () => {
        try {
            if(process.env.ENV === "production") {
                await rest.put(Routes.applicationCommands(CLIENT_ID, {
                    body: commands
                }));
                console.log("Successfully registered commands globally.");
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                    body: commands
                });
                console.log("Successfully registered commands locally.");
            }
        } catch (err) {
            if(err) console.log(err);
        }
    })();
});

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;
    
    try {
        await command.execute(interaction);
    } catch (err) {
        if(err) console.error(err);
        await interaction.reply({
            content: "Error while executing command.",
        });
    }
});


client.login(process.env.TOKEN);