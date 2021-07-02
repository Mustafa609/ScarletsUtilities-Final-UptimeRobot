const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class RoleCommand extends BaseCommand {
  constructor() {
    super('role', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('You cannot use this command');
    if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I cannot use this command pls give me \`MANAGE_ROLES\`');

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

    if (!args[0]) return message.reply('You must state a member for me to give the role to. along with the role id you want me to give');
    if (!mentionedMember) return message.reply(`The mentioned member does not exist anywhere in ${message.guild.name}`);
    if (!role) return message.reply('You did not mention a role for me to give this member');
    if (mentionedMember.roles.highest.position >=  message.member.roles.highest.position) return message.reply(`You cannot give roles to this member as there role is higher than you`);
    if (message.members.highest.position <= role.position) return message.reply('You cannot give this role to this member as its higher than your current role');
    
    await mentionedMember.roles.add(role.id).catch(err => console.log(err)); 
  }
}