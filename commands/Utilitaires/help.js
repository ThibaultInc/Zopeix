const { RichEmbed } = require('discord.js');
const { readdirSync } = require('fs');

module.exports.run = async (client, message, args, functions) => {
    let embed = new RichEmbed()
        .setAuthor(`📘 Page d'aide`, client.user.displayAvatarURL)
        .setColor(client.config.color)
        .setTimestamp();
    if (args[0]) {
        let command = args[0];
        let cmd;
        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }
        if (!cmd) return message.channel.send(functions.error(client, "Argument non valide", `La commande n'existe pas.`));
        command = cmd.help;
        embed.addField(`> Commande:`, `\`\`\`${command.name}\`\`\``)
             .addField(`> Description:`, `\`\`\`${command.description || "Aucune description."}\`\`\``)
             .addField("> Catégorie", `\`\`\`${command.category}\`\`\``)
             .addField("> Alias:", `\`\`\`${command.aliases ? command.aliases.join(', ') : "Aucun alias de définit."}\`\`\``)
             .addField("> Usage:", `\`\`\`${command.usage ? `${client.config.prefix}${command.name} ${command.usage}` : "Aucun usage définit."}\`\`\``)
        return message.channel.send(embed);
    }
    const categories = readdirSync('./commands/');
    embed.setDescription([
        `J'ai \`${client.commands.size}\` commande(s) de disponible :grin:`,
        `Mon prefix est \`${client.config.prefix}\``,
        `Si une option se trouve entre \`<>\` c'est qu'elle est nécessaire pour le bon fonctionnement de la commande. Tandis que si elle est entre \`()\` c'est qu'elle est facultative.`
    ].join('\n'));
    categories.forEach(category => {
        const dir = client.commands.filter(c => c.help.category.toLowerCase() === category.toLowerCase());
        const capitalise = category.slice(0,1).toUpperCase() + category.slice(1);
        if (dir.size === 0) return;
		if (client.config.owners.includes(message.author.id)) embed.addField(`> ${capitalise}`, `\`\`\`${dir.map(c => c.help.name).join(', ')}\`\`\``);
		else if (category !== "Developer") embed.addField(`> ${capitalise}`, `\`\`\`${dir.map(c => c.help.name).join(', ')}\`\`\``);
    });
    return message.channel.send(embed);
};

module.exports.help = {
    name: "help",
    description: "Affiche la liste de toutes mes commandes.",
    category: "Utilitaires",
    usage: "(nom de commande)",
    aliases: ["h"]
}