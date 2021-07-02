const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
    
  }
   

  async run(client, message, args) {
    // pre-embeds
    const PermEm = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You do not have permission to use this command")
      .setFooter(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))

    const BotPermissions = new Discord.MessageEmbed()
      .setColor('FF0000')
      .setTitle(`I don\'t have permissions to use this command`)
      .setFooter(`Ban requested by ${message.author.tag}`);


    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(PermEm);
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply(BotPermissions);

    let reason = args.slice(" ");
    const mentionedMember = message.mentions.members.first();

    if (!reason) reason = 'No reason given';
    if (!args[0]) return message.reply('You didn\'t mention a user for me to ban \`>ban <@user> <reason>\`');
    if (!mentionedMember) return message.reply('The Member mentioned isn\'t in Scarlet\'s Dream World!');
    if (!mentionedMember.bannable) return message.reply('I Cannot Ban That Member/Senior');

    const GeneralEmbed = new Discord.MessageEmbed()
      .setAuthor(client.user.displayAvatarURL() + client.user.tag)
      .setColor("RED")
      .setTitle(`${mentionedMember.tag} Has Been Banned`)
      .setDescription(`Reason: ${reason}`)
      .setFooter(client.user.displayAvatarURL(), client.user.tag)
      .setTimestamp();

    const banEmbed = new Discord.MessageEmbed()
      .setColor('0xFF0000')
      .setTitle(`You Have Been Banned From ${message.guild.name}`)
      .setDescription(`Reason: ${reason} We Hope you do not repeat these mistakes ever again DM a Staff Member To appeal for your ban :D`)
      .setFooter(client.user.tag, client.user.displayAvatarURL())
      .setTimestamp();

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send(GeneralEmbed));

    setTimeout(function () {
      message.delete(banEmbed)
      message.delete(GeneralEmbed)
    }, ms('30s'))
  }
}