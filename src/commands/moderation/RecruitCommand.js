const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");

module.exports = class RecruitCommand extends BaseCommand {
  constructor() {
    super('recruit', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You Cannot Use This Command');
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply('Please give me \`MANAGE_ROLES\` permission');


    const pingRole = message.guild.roles.cache.get('845583899097956363');
    const staffRole = message.guild.roles.cache.get('834765094000525332');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);


    if (!pingRole) return message.reply('There Is No Ping Role');
    if (!staffRole) return message.reply('There Is No Staff Role');
    if (!args[0]) return message.reply('\`>recruit @member \` or \`>recruit ID\`')
    if (!mentionedMember) return message.reply('You didn\'t mention a member for me to recruit')

    await mentionedMember.roles.add(pingRole.id);
    await mentionedMember.roles.add(staffRole.id);
    message.channel.send(`Successfuly Recruited ${mentionedMember}`);
  }
}       