const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'moderation', []);
  }

  async run(client, message, args) {
      var HelpEmbed = new Discord.MessageEmbed()
       .setTitle('Help')
       .addField(`🎉Fun`, `\`>help fun\``)
       .addField(`🔥 Moderation`, `\`>help mod\``)
       .addField('')
  }
}