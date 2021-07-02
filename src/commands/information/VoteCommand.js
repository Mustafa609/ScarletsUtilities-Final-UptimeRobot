const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class VoteCommand extends BaseCommand {
  constructor() {
    super('vote', 'information', []);
  }

  async run(client, message, args) {
    const filter = m => m.author.id == message.author.id;
    let embed = new Discord.MessageEmbed()
     .setFooter(`Vote Made By ${message.author.tag}`);
     

    message.channel.send('Please tell me the vote topic');
    try {
      let msg = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] });
      console.log(msg.first().content);
      embed.setTitle(msg.first().content);
    } catch (err) {
      console.log(err);
      message.channel.send('You took to long to response')
    }

    message.channel.send('What is the first point to vote on?');
    try {
      let msg = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] });
      console.log(msg.first().content);
    embed.addField('[🔴] The First Option To Vote:', msg.first().content);
    embed.setColor("RANDOM")
    } catch (err) { 
      console.log(err);
      message.channel.send('You took to long to response')
    }

    message.reply('What is the second point to vote on?');
    try {
      let msg = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] });
      console.log(msg.first().content);
      embed.addField('[🔵] the second option to vote:', msg.first().content);
      embed.setColor("RANDOM")
    } catch (err) {
      console.log(err);
      message.reply('You took to long to response')
    }
    message.channel.send(embed).then(sentMessage => sentMessage.react('🔴')).then(reaction => reaction.message.react('🔵'));
  }
}