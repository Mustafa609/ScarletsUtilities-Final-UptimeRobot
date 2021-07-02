const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UptimeCommand extends BaseCommand {
  constructor() {
    super('uptime', 'Utility', []);
  }

  async run(client, message, args) {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400) || "0";
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600) || "0";
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60) || "0";
    let seconds = Math.floor(totalSeconds % 60);

    if (days === "0") {
      const embedb = new Discord.MessageEmbed()
        .setTitle(`Uptime`)
        .addField("Hours", `${hours}`, true)
        .addField("Minutes", `${minutes}`, true)
        .addField("Seconds", `${seconds}`, true)
        .setColor("fffff")
      message.channel.send(embedb);
    } else {

      const embed = new Discord.MessageEmbed()
        .setTitle(`Uptime`)
        .addField("Days", `${days}`, true)
        .addField("Hours", `${hours}`, true)
        .addField("Minutes", `${minutes}`, true)
        .addField("Seconds", `${seconds}`, true)
        .setColor("fffff")
      message.channel.send(embed);
    }
  }
}