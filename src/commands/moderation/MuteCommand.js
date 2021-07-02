const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    const PermissionEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle(`Not Enough Permissions!`)
      .setDescription(`You do not have permission to use this command!`)
      .addField(`Reason`, `Not enough permissions`)
      .setFooter(client.user.tag, client.user.displayAvatarURL())

    if (!message.member.hasPermission('MUTE_MEMBERS')) return message.reply(`You cannot use this command`);

    let mentionedMember = message.mentions.members.first();
    if (!args[0]) return message.reply(`Please mention a member and try again!`);
    if (!mentionedMember) return message.reply(`This member does not exist!`)
    let reason = args.slice(1).join(" ");
    var muteRole = message.guild.roles.cache.find(r => r.name === 'mute');
    var memberRole = message.guild.roles.cache.find(r => r.name === 'Member');
    if (!reason) return message.reply(`You did not mention a reason!`);
    let time = args.slice(2).join(' ');
    if (!time) time = '5s'

    var redBlob = message.guild.emojis.cache.find(emoji => emoji.name === 'redblob');

    const SuccessEmbed = new Discord.MessageEmbed()
      .setTitle(`${redBlob} Muted ${mentionedMember}`)
      .setDescription(`I have muted the mentioned member for there crimes the default mute time is 2 hours if no time mentioned the reason is mentioned below`)
      .addField(`Reason`, `${reason}`)
      .addField(`Duration`, `${time}`)
      .setFooter(client.user.tag);

    const UserEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .addField(`Reason`, `${reason}`)
      .addField(`Duration`, `${time}`);

    try {
      mentionedMember.roles.add(muteRole);
      mentionedMember.roles.remove(memberRole);
      mentionedMember.send(UserEmbed);
      message.channel.send(SuccessEmbed);

      setTimeout(() => {
        mentionedMember.roles.remove(muteRole)
        mentionedMember.roles.add(memberRole)
      }, ms(`${time}`))
    } catch (err) {
      console.log(err)
    }
  }
}