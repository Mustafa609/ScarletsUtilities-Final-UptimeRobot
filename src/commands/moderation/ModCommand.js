const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class ModCommand extends BaseCommand {
  constructor() {
    super('mod', 'moderation', []);
  }

  async run(client, message, args) {
    var PermissionEmbed = new Discord.MessageEmbed()
     .setAuthor(`Scarlet's Utilities`, client.user.displayAvatarURL())
     .setTitle(`You do not have permission to use this command. LOL`)
     .setFooter(`LOL`);
    
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return msg.reply(PermissionEmbed) 
    const mentionedMember = message.mentions.members.first();
    if (!mentionedMember) return message.reply(`Please mention a member for me to  moderate there nickname`);
  
    var user = message.guild.members.cache.get(mentionedMember.id);
    var id = mentionedMember.id
  
   function generateRandomString(length){
     var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
     var random_string = '';
     if(length > 0){
       for(var i=0; i < length; i++){
         random_string += chars.charAt(Math.floor(Math.random() * chars.length));
       }
     }
     return random_string
   }
  
  const random = generateRandomString(7)
  const nickname = `Moderated Nickname ${random}`
  
      var userLog = new Discord.MessageEmbed()
      .setColor('#EEE8AA')
      .setTitle('Your nickname has been moderated')
      .setAuthor(`Scarlet's Utilities` , client.user.displayAvatarURL())
      .addField('Server', `${message.guild.name}`)
      .addField(`Moderated by`, `${message.author}`)
      .addField(`New nickname`, `\`${nickname}\``)
      .addField('Info' , `Your nickname has been moderated by ${message.author} in ${message.guild.name} because you broke the rule 12 of the server ${message.guild.name}.`)
      .addField('Reasons', '• Your name was not typeable on a standard English QWERTY keyboard.\n•  Your name contained words that are swears in the server.\n• Your name was not mentionable')
      .addField('Your user ID',  `**${user.id}**`)
      .setTimestamp()
      try {
          await user.send(userLog)
      } catch(err) {
          console.warn(err);
      }
  
      var channel = message.guild.channels.cache.find(c => c.name === 'logs');
      var logs = new Discord.MessageEmbed()
      .setColor('#EEE8AA')
      .setDescription(`${user}'s Nickname Has Been Moderated`)
      .setAuthor(`Scarlet's Utilities` , client.user.displayAvatarURL())
      .setTitle(`Nickname Has Been Moderated`)
      .addField(`Nickname Moderated by`, `${message.author}`)
      .addField(`New nickname` , `${nickname}`)
      .addField(`User ID`, `${user.id}`)
      .setTimestamp()
       channel.send(logs)
  
  try {
    await mentionedMember.setNickname(nickname)
    message.channel.send(`${message.author} has moderated ${mentionedMember}'s username too ${nickname} as per the violation of the rule number 12`);
  } catch (err) {
    console.log(err)
  }
}
}