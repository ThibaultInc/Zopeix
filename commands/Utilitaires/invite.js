module.exports.run = async (client, message, args, functions) => {
    message.channel.createInvite().then(inv => message.channel.send(`Voici l'invitation de \`${message.guild.name}\`: **https://discord.gg/${inv.code}**`))
};

module.exports.help = {
    name: "invite",
    aliases: ["inv"],
    category: "Utilitaires",
    description: "Affiche l'invitation du serveur courant."
}