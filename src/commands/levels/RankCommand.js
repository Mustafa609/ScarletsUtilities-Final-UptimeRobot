const BaseCommand = require('../../utils/structures/BaseCommand');
const Levels = require('discord-xp');
const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js')
    

module.exports = class RankCommand extends BaseCommand {
  constructor() {
    super('rank', 'levels', []);
  }

  async run(client, message, args) {
    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!mentionedMember) mentionedMember = message.member;

    const target = await Levels.fetch(mentionedMember.user.id, message.guild.id)
    if (!target) return message.channel.send('The member mentioned did not have any xp')

    message.channel.send(`${mentionedMember}'s Current Level is ${mentionedMember.level}`)
  }
}