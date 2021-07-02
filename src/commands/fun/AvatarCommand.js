const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super('avatar', 'fun', []);
  }

  async run(client, message, args) {
    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mentionedMember) mentionedMember = message.member;

    var Avembed = new Discord.MessageEmbed()
     .setColor('0xFF0000')
     .setImage(mentionedMember.user.displayAvatarURL())
     .setTitle(mentionedMember.user.tag + "'s Avatar")

  message.channel.send(Avembed);
  }
}