const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class NukeCommand extends BaseCommand {
  constructor() {
    super('nuke', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You Cannot Use This Command!');
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply('I Do not have permission to use this command please give me \`MANAGE_CHANNELS\`');

    var reason = args.join(" ");
    const nukeChannel = message.channel;

    if(!reason) reason = 'No Reason Given';
    if(!nukeChannel.deletable) return message.reply('I couldn\'t delete this channel!');


    await nukeChannel.clone().catch(err => console.log(err))
    await nukeChannel.delete(reason).catch(err => console.log(err))
  
  
  }
}