const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('tempmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('MUTE_MEMBERS')) return message.reply('You cannot use this command');
    if (!message.guild.me.hasPermission('MUTE_MEMBERS' && 'MANAGE_ROLES')) return message.reply('I cannot use this command pls give me \`MUTE_MEMBERS\` and \`MANAGE_ROLES\`');
    
    const muteRole = message.guild.emojis.cache.get('834765123197337630');
    const memberRole = message.guild.emojis.cache.get('808298700492505098');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let time = args[1];
    let reason = args.slice(2).join(" ");
    const tempmuteEmbed = new Discord.MessageEmbed()
     .setColor('0xFF0000')
     .setTitle(`You have been muted in ${message.guild.name}`)
     .addField(`Duration: ${time}`, `Reason: ${reason}`)
     .setTimestamp();

  if (!args[0]) return message.reply('You didn\'t mention a user for me to tempmute');
  if (!mentionedMember) return message.reply('This member dosent exist stop playing games with me');
  if (!mentionedMember.roles.highest.position >=  message.member.roles.highest.position) return message.reply(`You cannot tempmute thiis member`);
  if (!time) return message.reply('Please mention a time for me to tempmute this member');
  if (!reason) reason = 'No Reason Given';

  await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err));
  await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err));
  await mentionedMember.send(tempmuteEmbed).catch(err => console.log(err));

  setTimeout(async function () {
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err));
    await mentionedMember.send(`Your mute has expired You were muted for ${time} 2 seconds`).catch(err => console.log(err));

  }, ms(time));
  }
}