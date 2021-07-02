const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempbanCommand extends BaseCommand {
  constructor() {
    super('tempban', 'moderation', []);
  }

  async run(client, message, args) {
    // some if statements
    if (!message.member.hasPermission('BAN_MESSAGES')) return message.reply('You cannot use this command');
    if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I cannot use this command pls give me \`BAN_MEMBERS\` For me too ban members');

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(2).join(" ");
    let time = args[1];
    const banEmbed = new Discord.MessageEmbed()
     .setColor('RED')
     .setTitle(`You have been banned from ${message.guild.name}`)
     .addField(`Reason: ${reason}` `Duration: ${time}`)
     .setTimestamp();

    if (!args[0]) return message.reply('Please state a member for me to tempban')
    if (!mentionedMember) return message.reply('This member dosen\'t exist in Scarlet\'s Dream World');
    if (!mentionedMember.bannable) return message.reply('I couldn\'t ban this member');
    if (mentionedMember.roles.highest.positon >= message.member.roles.highest.positon) return message.reply(`You cannot tempban ${mentionedMember} Bitchass`);
    if (!reason) reason = 'No Reason Given';
    if (!time) return message.reply('You didn\'t menyion a time for me to tempban this user');

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.log(err));

    setTimeout(async function () {
      await message.guild.fetchBans().then(async bans => {
        if (bans.size == 0) return message.reply('There are no bans in this server');
        let bannedUser = bans.first(b => b.user.id == mentionedMember.id);
        if (!bannedUser) return console.log('Member Unbanned');
        await message.guild.members.unban(bannedUser.user, reason).catch(err => console.log(err));
      });f
    }, ms(time));
  }
}