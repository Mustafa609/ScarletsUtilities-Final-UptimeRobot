const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SuggestCommand extends BaseCommand {
  constructor() {
    super('suggest', 'fun', ['suggestion']);
  }

  async run(client, message, args) {
    let suggestion = args.join(' ');
    if (!args[0]) return message.reply('You must state something to suggest');
    const suggestEmbed = new Discord.MessageEmbed()
     .setTitle(`Suggestion:`)
     .addField(`Suggestion: ${suggestion}`, `This was suggested by ${message.author}`, 'And posted by me');

    message.channel.send(suggestEmbed)
  }
}
