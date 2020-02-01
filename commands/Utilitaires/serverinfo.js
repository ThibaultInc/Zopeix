const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args, functions) => {
    let embed = new RichEmbed()
        .setTitle(`📊 Informations de \`${message.guild.name}\` 📊`)
        .setColor(client.config.color)
        .setTimestamp()
        .addField("> Nom:", `\`\`\`${message.guild.name}\`\`\``)
        .addField("> ID:", `\`${message.guild.id}\``, true)
        .addField("> Membre(s):", `\`${message.guild.memberCount}\` membre(s).`, true)
        .addField("> Robot(s):", `\`${message.guild.members.filter(member => member.user.bot).size}\` robot(s).s`, true)
        .addField("> Humain(s):", `\`${message.guild.members.filter(member => !member.user.bot).size}\` humain(s).`, true)
        .addField("> Connecté(s):", `\`${message.guild.members.filter(member => member.user.presence.status !== "offline").size}\` membre(s) en ligne.`, true)
        .addField("> Channel(s):", `\`${message.guild.channels.size}\` channel(s).`, true)
        .addField("> Channel textuel(s):", `\`${message.guild.channels.filter(channel => channel.type === "text").size}\` channel(s) textuel(s).`, true)
        .addField("> Channel(s) vocal/aux:", `\`${message.guild.channels.filter(channel => channel.type === "voice").size}\` channel(s) vocal/aux.`, true)
        .addField("> Catégorie(s):", `\`${message.guild.channels.filter(channel => channel.type === "category").size}\` catégorie(s).`, true)
        .addField("> Rôle(s):", `\`${message.guild.roles.size}\` rôle(s).`, true)
        .addField("> Région:", `\`${functions.capitalise(message.guild.region)}\``, true)
        .addField("> Date de création:", `\`${message.guild.createdAt.getDate()}/${message.guild.createdAt.getMonth()+1}/${message.guild.createdAt.getFullYear()} ${message.guild.createdAt.getHours()}:${message.guild.createdAt.getMinutes()}:${message.guild.createdAt.getSeconds()}\``, true)
        .addField("> Niveau de vérification:", `\`${message.guild.verificationLevel}\``, true)
        .addField("> Propriétaire:", `${message.guild.owner.user}`, true);
    message.channel.send(embed);
};

module.exports.help = {
    name: "serverinfo",
    category: "Utilitaires",
    description: "Affiche les informations du serveur courant.",
    aliases: ["si", "server"]
}