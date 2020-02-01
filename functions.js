const { RichEmbed, Client } = require('discord.js');

/**
 * Send error
 * 
 * @param {Client} client 
 * @param {String} type 
 * @param {String} msg
 * 
 * @returns { RichEmbed } 
 */
var error = (client, type, msg) => {
    let embed = new RichEmbed()
        .setAuthor("⛔ Une erreur est survenue⛔", client.user.displayAvatarURL)
        .setTimestamp()
        .setColor("#ff0000")
        .addField("> Type:", `\`\`\`${type}\`\`\``)
        .addField("> Contenu:", `\`\`\`markdown\n- ${msg}\`\`\``);
    return embed;
}

/**
 * Replace first letter to a capital letter
 * 
 * @param {String} text
 *  
 * @returns {String}
 */
var capitalise = (text) => {
    return text.slice(0,1).toUpperCase() + text.slice(1).toLowerCase();
};

module.exports = {
    error: error,
    capitalise: capitalise
}