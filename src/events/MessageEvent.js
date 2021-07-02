const BaseEvent = require('../utils/structures/BaseEvent');
const Discord = require("discord.js");
const ms = require("ms");
const enmap = require('enmap');
const Levels = require('discord-xp');
const client = new Discord.Client()
const Distube = require('distube');
const distube = new Distube(client, { searchSongs: true, emitNewSongOnly: true });



module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(client, message, args) {
    if (message.author.bot) return;
      var array = ['fuck', 'fuc', 'fuk', 'fhuk', 'fhuck', 'Motherfuck', 'nigga', 'nigger', 'nig', 'nog', 'Motherfucker', 'fucker', 'shit', 'shitbag', 'Shet', 'fucker', 'Bullfuck', 'Bullshit', 'gay', 'ass', 'mofo', 'snowflakey', 'sex', '$ex', 'smox', 'fuckf', 'fck', 'fuckfu', 'fuckfuc', 'fuckfuck', 'fuckfuckfuckfuck', 'fuc.', 'fuck.', 'sex.', 'fuck?', 'fuck,', 'brotherfucker', 'bugger', 'nigga.', 'nigger..', 'nigger?', '@ass', '@fuck', '@@@fuc', '@@@fuck', '@@fuck', '@@@fok', '@@@@fuck', '@nigger', '@ngga'];
    if (array.some(w => ` ${message.content.toLowerCase()} `.includes(` ${w} `))) {
      message.delete();
      var BadWordsEmbed = new Discord.MessageEmbed()
       .setAuthor('Scarlet\'s Utilities', client.user.displayAvatarURL())
       .setColor('RED')
       .setTitle(`Warning For ${message.author.id}`)
       .addField(`Reason`, 'Swearing')
       .addField(`Muted`, `1h`)
       .setFooter(client.user.tag, client.user.displayAvatarURL())
       .setTimestamp()


      message.reply(BadWordsEmbed)
      var role = message.guild.roles.cache.find(role => role.name === 'mute');

      message.member.roles.add(role);

      setTimeout(async () => {
        message.member.roles.remove(role);
      }, ms('1h'));
    }

    if (message.mentions.users.size > 2 && !message.member.hasPermission('MANAGE_MESSAGES')) {
      message.delete()
      return message.reply('You Cannot mass mention in Scarlet\'s Dream World!')
    }

    if (message.content.length >= 300) {
      if (message.member.hasPermission('ADMINISTRATOR')) return;
      message.delete()
      return message.channel.send(`${message.author} You Cannot Spam In ${message.guild.name}`)
    }

    if (message.content.includes('<@!710659848299348049>')) { // PUT YOUR USER ID WHERE IT SAYS **YOUR USER ID HERE**
      if (message.member.hasPermission('ADMINISTRATOR')) return;
      message.delete();
      const mentionedMember = message.mentions.members.first() || message.guild.users.cache.get(args[0]);
      return message.reply('You Cannot Ping ScarletWitch in the Chat!');
    }

    if (message.content.includes('<@!437372812030640129>')) {
      message.delete()
      return message.channel.send(`${message.author} You cannot ping AlfaKory in the chat as he is the Co-Owner of ${message.guild.name}`)
    }

    if (message.content.length >= 1500) {
      message.member.kick()
      message.channel.send(`Kicked ${message.author} For nuking`)
    }

    const randomXp = Math.floor(Math.random() * 19) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      message.reply(`GG! ${message.author} You Have Reached Level ${user.level}! Keep Going!`);
    }
  }
} 