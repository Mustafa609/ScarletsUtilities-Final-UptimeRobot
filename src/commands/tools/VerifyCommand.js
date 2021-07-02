const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class VerifyCommand extends BaseCommand {
  constructor() {
    super('verify', 'tools', []);
  }

  async run(client, message, args) {
    if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have \`MANAGE_ROLES\` permission'); 
    message.guild.roles.cache.find(role => role.name === 'Member')
    
    await message.member.roles.add(role.id)
    
  }
}