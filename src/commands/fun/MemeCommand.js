const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = class MemeCommand extends BaseCommand {
  constructor() {
    super('meme', 'fun', []);
  }

  async run(client, message, args) {
    fetch('https://meme-api.herokuapp.com/gimme')
      .then(res => res.json())
      .then(json => {
        const memeEmbed = new Discord.MessageEmbed()
          .setColor('BLUE')
          .setTitle(json.title)
          .setImage(json.url)
          .setFooter(`${json.subreddit} ${json.postLink}`);

        message.channel.send(memeEmbed);
      });
  }
}