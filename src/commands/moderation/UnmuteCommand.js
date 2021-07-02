const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('MUTE_MEMBERS')) return message.reply('You Cannot Use This command');
    if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I cannot use this command');

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('834765123197337630');
    const memberRole = message.guild.roles.cache.get('808298700492505098');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    var redBlob = message.guild.emojis.cache.find(emoji => emoji.name === 'redblob');
    const unmuteEmbed = new Discord.MessageEmbed()
    .setColor('0xFF0000')
    .setTitle(`You Have Been unmuted in ${message.guild.name}`)
    .setDescription(`Reason: ${reason}`)
    .setFooter(client.user.tag, client.user.displayAvatarURL())
    .setTimestamp();
    
    

    if (!args[0]) return message.reply('Please mention a user for me to unmute')
    if (!mentionedMember) return message.reply('This user isn\'t in the Scarlet\'s Dream World')
    if (mentionedMember.user.id == message.author.id) return message.reply('You trying to unmute yourself lol');
    if (mentionedMember.user.id == client.user.id) return message.reply('I aint muted');
    if (!reason) reason = 'No Reason Given';
    if (mentionedMember.roles.cache.has(memberRole.id)) return message.reply('This member is already unmuted')
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot mute seniors or the same role members');

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err))
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then (message.reply(`${redBlob} Successfuly unmuted ${mentionedMember}`)));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then (message.reply(`${redBlob} Successfuly removed mute from ${mentionedMember}`)));


  }
}