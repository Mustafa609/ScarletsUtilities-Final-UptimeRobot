const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class LockCommand extends BaseCommand {
  constructor() {
    super('lock', 'moderation', []);
  }

  async run(client, message, args) {
    const PermEm = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You do not have permission to use this command")
      .setFooter(client.user.tag, client.user.displayAvatarURL())

    // some if statements
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(PermEm);
    if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I do not have enough permissions on my role to lock channels');

    // let, variables,
    const role = message.guild.roles.cache.get('808298700492505098');
    let lockChannel = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!lockChannel) lockChannel = message.channel;

    await lockChannel.updateOverwrite(role, {
      SEND_MESSAGES: false
    }).catch(err => console.log(err))
    message.channel.send('🔒 I have locked the channel 🔒');

    setTimeout(async function () {

    })
  }
}