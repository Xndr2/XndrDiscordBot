require("dotenv").config();
const fs = require("fs");
const Database = require("./config/Database");

const db = new Database();

db.connect();

const {Client, Intents, Collection, Interaction, MessageEmbed} = require("discord.js");
const { Console } = require("console");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
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

const eventFiles = fs
    .readdirSync("./events")
    .filter(file => file.endsWith(".js"));

for(const file of eventFiles) {
    const event = require(`./events/${file}`);

        if(event.once){
        client.once(event.name, (...args) => event.execute(...args, commands));
        } else {
            client.on(event.name, (...args) => event.execute(...args, commands));
        }
}

client.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;
    var rulesRead = false;
    if (interaction.customId === 'rules') {
        rulesRead == true;
        interaction.channel.send('Thank you for reading the rules. :) This will auto delete in 10 seconds')
            .then(msg => {
                setTimeout(() => msg.delete(), 10000);
            })
            .catch(console.error);
    }

    if(interaction.customId === 'verify'){
        if(rulesRead === false){
            interaction.channel.send('Please read the rules first.')
            .then(msg => {
                setTimeout(() => msg.delete(), 3000);
            })
            .catch(console.error);
        } else {
            interaction.channel.send('Successully verified.')
            .then(msg => {
                setTimeout(() => msg.delete(), 10000);
            })
            .catch(console.error);
        }
    }
    
});

/* client.on('messageReactionAdd', (reaction, author) => {
    if(reaction.message.reactions.cache.get('👍')) return;
    if(reaction.message.channel.id === '964867563848888320'){
        if(reaction.message.reactions.cache.get('✅').count == 2){
            reaction.message.author.send("You suggestion has been logged.\n"+reaction.message.content)
            reaction.message.react('👍')
     
            const suggestionEmbed = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle("Suggestion by "+reaction.message.author.username)
            .setDescription(reaction.message.content)
            .setTimestamp()
     
            client.channels.cache.get('964867589295726632').send({ embeds: [suggestionEmbed] })
         }
    }
    
}) */

client.on('messageCreate', message => {
    if(message.channel.id === '964867563848888320'){
        message.react('✅')
    }
})



client.login(process.env.TOKEN);