const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'moderation', []);
  }

  async run(client, message, args) {
    const m = await message.channel.send("Hold on .....")
  
	let dbb = Math.floor(Math.random() * 10) + 1;

	let ping = Math.floor(Math.random() * 100) + 1;
	
  let pong = new Discord.MessageEmbed()
  .setTitle("🏓 Pong!")
  .setColor('RED')
  .setTimestamp()
  .addField("Latency", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
  .addField("API Latency", `${ping}ms`, true)
	.addField("Database",`${dbb}ms`,true)
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

  m.edit(pong)
  }
}