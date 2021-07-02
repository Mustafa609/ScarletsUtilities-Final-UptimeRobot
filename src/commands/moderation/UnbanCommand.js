const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('Unban', 'moderation', []);
  }

 async run(client, message, args) {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('You cannot use this command!');
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply('please give me \`MANAGE_MESSAGES\`');

    let reason = args.slice(" ");
    let UserID = args[0]; 

    if (!args[0]) return message.reply('You didn\'t mention a user for me to ban \`>unban ID <reason>\`');
    if(!reason) reason = 'No reason given';
    if (isNaN(args[0])) return message.reply('The ID Stated is not a number, \'>unban ID\'')

    message.guild.fetchBans().then(async bans => {
      if (bans.size == 0) return message.reply('This Server Has no bans! Keep it up!');
      let bUser = bans.find(b => b.user.id == UserID);
      if (!bUser) return message.reply('This user ID stated is not banned');
      await message.guild.members.unban(bUser.user, reason).catch(err => {
        console.log(err);
        message.channel.send('something is wrong i couldnt unban this user!')
      }).then(() => {
        message.channel.send(`Successfuly Unbaned ${args[0]}`)
      });
    });

    
    }
}