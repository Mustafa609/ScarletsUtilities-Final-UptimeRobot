const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'fun', []);
  }

  async run(client, message, args) {
    const messaageToSay = args.join(" ");
    const sayEmbed = new Discord.MessageEmbed()
      .setColor('0xFF0000')
      .setTitle(`${message.author} says: ${messaageToSay}`)
      .setFooter(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp();
    try {
      await message.channel.send(sayEmbed)
    } catch (err) {
      console.log('There Was Some Problem. Failed to Send Embed problem')
      message.channel.send('there is some problem in my code pls fix me ')
    }
  }
}