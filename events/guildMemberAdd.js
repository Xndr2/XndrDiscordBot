const Discord = require('discord.js')

module.exports = {
    name: "guildMemberAdd",
    async execute (member) {
        //member.guild.channels.cache.get("806514309261295638").send(`${member.user} has joined thhe server.`);

        const DecideEmbed = new Discord.MessageEmbed()
            .setColor('DARK_AQUA')
            .setTitle("New member!")
            .setDescription(`${member.user} has joined the server.`)
            .setTimestamp()

        member.guild.channels.cache.get("806514309261295638").send({ embeds: [DecideEmbed] });
    }
}