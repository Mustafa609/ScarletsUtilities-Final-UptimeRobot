const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class FamilyCommand extends BaseCommand {
  constructor() {
    super('history', 'sad', []);
  }

  async run(client, message, args) {
    var ThePiratesUtils = new Discord.MessageEmbed()
     .setColor('RANDOM')
     .setAuthor('The Pirates Utilities')
     .setTitle(`The First One`)
     .setDescription(`The Pirate Utilities was the very first bot of the Scarlet\'s Dream World or The Pirates Server well at the time it was named The Pirates Server so This bot was not made in a code editor or anything it was made in some Bot Designer android app well it was failing in everything so we stopped it and there the story of The Pirates Utils end...`)
     .addField('Uptime', '2 days')
     .addField('Current Status', 'Deceased')

     var SpikeBot = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor('SpikeBot')
      .setTitle(`A Sucess`)
      .setDescription(`SpikeBot was the second last bot and a very successful bot no this is not the minecraft server bot its older than that so everything was going smooth the bot was being hosted and everything but suddenly due to Glitch banning UptimeRobot it could not survive or be moved anywhere as the bot files were stuck in the glith thingy so it deceased`)
      .addField('Uptime', '1 week')
      .addField(`Current Status`, 'Offline Forever')

     var CurrentBot = new Discord.MessageEmbed()
      .setTitle(`Scarlet\'s Utilities`)
      .setDescription(`You know everything about me :)`)
      .addField('Status', 'Online')
      .addField('Uptime', '1 Month')

     await message.channel.send(ThePiratesUtils)
     message.channel.send(SpikeBot)
     await message.channel.send(CurrentBot);
   
  }
}