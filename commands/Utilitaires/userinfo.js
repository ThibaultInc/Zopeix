const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args, functions) => {
    let member = message.mentions.members.first();
    let embed = new RichEmbed()
        .setColor(client.config.color)
        .setTimestamp();
    if (!member) {
        embed.setTitle(`🙍 Informations à propos de vous 🙍`)
             .addField("> Mention:", message.author, true)
             .addField("> ID:", `\`${message.author.id}\``, true)
             .addField("> Tag:", `\`${message.author.tag}\``, true)
             .addField("> Rôle(s):", `\`${message.member.roles.size-1}\` rôle(s).`, true)
             .addField("> Rôle le plus haut:", `${message.member.highestRole.mentionable ? message.member.highestRole : `\`${message.member.highestRole.name}\``}`, true)
             .addField("> Statut:", `\`${message.author.presence.status.replace("offline", "Hors ligne.").replace("online", "En ligne.").replace("dnd", "Ne pas déranger.").replace("idle", "Inactif.")}\``, true)
             .addField("> Date de création:", `\`${message.author.createdAt.getDate()}/${message.author.createdAt.getMonth()+1}/${message.author.createdAt.getFullYear()} ${message.author.createdAt.getHours()}:${message.author.createdAt.getMinutes()}:${message.author.createdAt.getSeconds()}\``, true)
             .addField("> Activité en cours:", `\`${message.author.presence.game.name || "Aucune activité en cours."}\``, true)
             .setThumbnail(message.author.displayAvatarURL)
        message.channel.send(embed);
    } else {
        embed.setTitle(`🙍 Informations à propos de \`${member.user.username}\` 🙍`)
             .addField("> Mention:", member.user, true)
             .addField("> ID:", `\`${member.user.id}\``, true)
             .addField("> Tag:", `\`${member.user.tag}\``, true)
             .addField("> Rôle(s):", `\`${member.roles.size-1}\` rôle(s).`, true)
             .addField("> Rôle le plus haut:", `${member.highestRole.mentionable ? member.highestRole : `\`${member.highestRole.name}\``}`, true)
             .addField("> Statut:", `\`${member.user.presence.status.replace("offline", "Hors ligne.").replace("online", "En ligne.").replace("dnd", "Ne pas déranger.").replace("idle", "Inactif.")}\``, true)
             .addField("> Date de création:", `\`${member.user.createdAt.getDate()}/${member.user.createdAt.getMonth()+1}/${member.user.createdAt.getFullYear()} ${member.user.createdAt.getHours()}:${member.user.createdAt.getMinutes()}:${member.user.createdAt.getSeconds()}\``, true)
             .addField("> Activité en cours:", `\`${member.user.presence.game ? member.user.presence.game.name : "Aucune activité en cours."}\``, true)
             .setThumbnail(member.user.displayAvatarURL)
        message.channel.send(embed);
    }
};

module.exports.help = {
    name: "userinfo",
    description: "Affiche les informations à propos de vous ou à propos d'un utilisateur mentionné.",
    usage: "(@membre)",
    category: "Utilitaires",
    aliases: ["ui", "user"]
}