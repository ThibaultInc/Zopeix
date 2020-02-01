// variables globales
const { RichEmbed, Collection, Client } = require('discord.js');
const { sep } = require('path');
const { success, error, warning } = require('log-symbols');
const { readdirSync } = require('fs');
const config = require('./config/config');
const client = new Client();
const functions = require('./functions');
// on attache des valeurs au bot
client.config = config;
["commands", "aliases"].map(x => client[x] = new Collection());

// fonction de démarrage de l'app

var run = (dir = "./commands") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith('.js'));
        for (file of commands) {
            const pull = require(`${dir}/${dirs}/${file}`);
            if (pull.help && typeof (pull.help.name) === "string" && typeof (pull.help.category) === "string") {
                if (client.commands.get(pull.help.name)) return console.warn(`${warning} La commande ${file} possède un doublé.`);
                client.commands.set(pull.help.name, pull);
                console.log(`${success} La commande ${pull.help.name} est chargée.`);
            } else {
                console.error(`${error} La commande ${file} a une mauvaise configuration.`);
                continue;
            };
            if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
                pull.help.aliases.map(alias => {
                    if (client.aliases.get(alias)) return console.warn(`${warning} Une commande a le même alias que ${file}.`);
                    client.aliases.set(alias, pull.help.name);
                });
            }
        };
    });
};

run();

client.on('ready', () => {
    setInterval(() => { client.user.setActivity(`${client.guilds.size} serveur(s) | Besoin d'aide ? Faites ${client.config.prefix}help.`, { type: "WATCHING" }); }, 1000);
    console.log(`----------------------------------\nCommandes: ${client.commands.size}\nUtilisateur(s): ${client.users.size-1}\nServeur(s): ${client.guilds.size}\nPrefix: ${client.config.prefix}\n----------------------------------`)
});

client.on('guildCreate', guild => {
    let embed = new RichEmbed()
        .setTitle(`Merci de m'avoir invité!`)
        .setDescription(`Bonjour et merci de m'avoir invité sur \`${guild.name}\`. Je me présente, je suis un robot Discord développé par \`ZedoD3v#0554\` et son entreprise nommée \`Thibault Inc\`. En ce qui me concerne, je suis à votre disposition pour tout type de tâches, que ce soit amusement que administration. Voici ci-dessous quelques informations.`)
        .addField("> Commandes disponibles actuellement", `\`\`\`${client.commands.size}\`\`\``)
        .addField("> Prefix", `\`\`\`${client.config.prefix}\`\`\``)
        .addField("> Nombre de serveur(s) sur le(s)quel(s) je suis", `\`\`\`${client.guilds.size}\`\`\``)
        .addField("> Nombre d'utilisateur(s) que je surveille", `\`\`\`${client.users.size-1}\`\`\``)
        .addField("> M'inviter?", `**[Clique ici](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958847)**`)
        .setColor(client.config.color)
        .setTimestamp();
    guild.owner.user.send(embed);
});

client.on('message', async message => {
    const prefix = client.config.prefix;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	let command;

    if (message.author.bot || !message.guild) return;

	// If the message.member is uncached, message.member might return null.
	// This prevents that from happening.
	// eslint-disable-next-line require-atomic-updates
	if (!message.member) message.member = await message.guild.fetchMember(message.author);

	if (!message.content.startsWith(prefix)) return;

	if (cmd.length === 0) return;
	if (client.commands.has(cmd)) command = client.commands.get(cmd);
	else if (client.aliases.has(cmd)) command = client.commands.get(client.aliases.get(cmd));

	if (command) command.run(client, message, args, functions);
});

client.login(client.config.token);