const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const translate = require('translate-google');
const { en } = require('translate-google/languages');

module.exports = class TranslateCommand extends BaseCommand {
  constructor() {
    super('translate', 'fun', []);
  }

  async run(client, message, args) {
    translate(args.join(" "), {to : en}).then(res => {
      message.channel.send(res)
    }).catch(err => {
      message.channel.send('There was an error processing your request')
      console.log(err)
    });
  }
}