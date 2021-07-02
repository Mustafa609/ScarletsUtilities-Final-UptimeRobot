const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
   const MemberPermissionEmbed = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle(`❌| You do not have permission to use this command`)
    .setDescription(`Error number 3 type normal`)
    .addField(`Error Reason`, `Member does not have permissions`)
    .setFooter(client.user.tag, client.user.displayAvatarURL())

  const NoArgsEmbed = new Discord.MessageEmbed() 
   .setColor('RED')
   .setTitle(`❌| You did not mention a member for me to kick!`)
   .setDescription(`Error number 4 type normal`)
   .addField(`Reason`, `Member Argument is Missing`)
   .setFooter(client.user.tag, client.user.displayAvatarURL())

  const NoReasonEmbed = new Discord.MessageEmbed()
   .setTitle(`❌| A reason was not mentioned`)
   .setFooter(client.user.tag, client.user.displayAvatarURL())
   .setTimestamp();

  const mentionedMemberEmbed = new Discord.MessageEmbed()
   .setColor('RED')
   .setTitle(`❌| The mentioned member does not exist in ${message.guild.name}`)
   .setDescription(`Error 6 Type moderate`)
   .setFooter(client.user.tag, client.user.displayAvatarURL())
   .setTimestamp()


    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply(MemberPermissionEmbed);
    if (!args[0]) return message.reply(NoArgsEmbed)
    let mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(' ');
    if (!mentionedMember) return message.reply(mentionedMemberEmbed)
    if (!mentionedMember.kickable) return message.reply(`❌| The member is not kickable!`)
    if (!reason) return message.reply(NoReasonEmbed)

    var redBlob = message.guild.emojis.cache.find(emoji => emoji.name === 'redblob');
    var KawaiiBunny = message.guild.emojis.cache.find(emoji => emoji.name === 'kawaiibunny');

    const KickEmbed = new Discord.MessageEmbed()
     .setColor('GREEN')
     .setAuthor(`Scarlet's Utilities`, client.user.displayAvatarURL())
     .setTitle(`You have been kicked in ${message.guild.name}`)
     .setDescription(`${mentionedMember} You been kicked for there violation against rules`)
     .addField(`Reason`, `${reason}`)
     .addField(`Punish Type`, `Kick`)
     .setFooter(client.user.tag, client.user.displayAvatarURL())
     .setTimestamp();

    const UnableEmbed = new Discord.MessageEmbed()
     .setColor('RED')
     .setTitle(`❌| Could Not Kick This Member!`)
     .setFooter(client.user.tag, client.user.displayAvatarURL())
     .setTimestamp()

    const GeneralEmbed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setAuthor(`Scarlet's Utilities`, client.user.displayAvatarURL())
    .setTitle(`${mentionedMember} Has been kicked!`)
    .setDescription(`${mentionedMember} Hass been kicked for there violation against rules`)
    .addField(`Reason`, `${reason}`)
    .addField(`Punish Type`, `Kick`)
    .setFooter(client.user.tag, client.user.displayAvatarURL())
    .setTimestamp();

    var LogsChannel = message.guild.channels.cache.find(c => c.name === 'logs');

    var LogsChannelEmbed = new Discord.MessageEmbed()
     .setColor('RANDOM')
     .setTitle(`${mentionedMember} Has been kicked by ${message.author} for ${reason}`)

     try {
       mentionedMember.kick(reason)
       mentionedMember.send(KickEmbed)
       message.channel.send(GeneralEmbed)
       LogsChannel.send(LogsChannelEmbed)
     } catch (err) {
       console.log(err)
       message.channel.send(UnableEmbed);
     }
  }
}