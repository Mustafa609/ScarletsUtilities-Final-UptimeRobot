const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UserinfoCommand extends BaseCommand {
  constructor() {
    super('userinfo', 'Utility', []);
  }

  async run(client, message, args) {
    let member = message.mentions.members.first()
    if (!member) member = message.member;

    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("User Info")
      .setThumbnail(member.user.displayAvatarURL())
      .setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
      .addField("**Username:**", `${member.user.username}`, true)
      .addField("**Discriminator:**", `${member.user.discriminator}`, true)
      .addField("**ID:**", `${member.user.id}`, true)
      .addField("**Status:**", `${member.user.presence.status}`, true)
      .addField("**Joined On:**", `${member.joinedAt.toLocaleString()}`, true)
      .addField("**Created On:**", `${member.user.createdAt.toLocaleString()}`, true)
      .setDescription(`${member.roles.cache.map(role => role.toString()).join(' ')}`)
      .setFooter(client.user.tag, client.user.displayAvatarURL());

    message.channel.send(embed)
  }
}