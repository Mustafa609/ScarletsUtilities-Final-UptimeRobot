const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`${message.author} You Do not have permission to purge channels!`);
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I dont have permissions to fetch this command! pls give me \`MANAGE_MESSAGES\`');
    if (!args[0]) return message.channel.send(`${message.author} Please Specify a Number Of Messages you Want me To Delete`)
    const amountToDelete = Number(args[0], 10);
    var emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'kawaiibunny');



    if (isNaN(amountToDelete)) return message.reply('Please Specify a Vaild Number Of Messages That you Want me To Purge For Ex \`10, 15, 20\`');
    if (!Number.isInteger(amountToDelete)) return message.reply('Please Specify a Whole number of messages you want me to delete');
    if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.reply('The Number Stated Must Be Under \`100 Messages\` and More than \`2 Messages\`');
    const fetched = await message.channel.messages.fetch({
      limit: amountToDelete
    });

    try {
      message.channel.bulkDelete(fetched)
        .then(messages => message.channel.send(new Discord.MessageEmbed().setColor('FF0000').setTitle(`${emoji} I have successfuly deleted ${messages.size} messages!`).setFooter(client.user.tag).setTimestamp()));
    } catch (err) {
      console.log(err);
      message.channel.send(`There Was An Error processing your request`);
    }
  }
}