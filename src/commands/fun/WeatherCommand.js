const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const weather = require('weather-js')

module.exports = class WeatherCommand extends BaseCommand {
  constructor() {
    super('weather', 'fun', []);
  }

  async run(client, message, args) {
    weather.find({ search: args.join(' '), degreeType: `C` }, function (error, result) {
      if (error) return message.reply(`There was some error in getting the weather info of this location. Please verify that it is the correct location`);
      if (!args[0]) return message.reply(`You did not mention a place for me to get the weather info.`);

      if (result == undefined || result.length == 0) return message.reply(`Inavlid Location!`);

      var current = result[0].current;
      var location = result[0].location;

      const WeatherEmbed = new Discord.MessageEmbed()
        .setColor(0x111111)
        .setAuthor(`Weather Forecast ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setDescription(`**${current.skytext}**`)
        .addField(`Timezone`, `UTC ${location.timezone}`, true)
        .addField(`Degree Type`, `Celsius`, true)
        .addField(`Temperature`, `${current.temperature}`, true)
        .addField(`Wind`, `${current.winddisplay}`, true)
        .addField(`Feels Like`, `${current.feelslike}`)
        .addField('Humidity', `${current.humidity}%`, true)
      
        message.channel.send(WeatherEmbed)
    })
  }
}