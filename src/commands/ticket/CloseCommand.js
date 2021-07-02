const ms = require('ms');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class CloseCommand extends BaseCommand {
  constructor() {
    super('close', 'ticket', []);
  }

  async run(client, message, args) {
    if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
        message.channel.send(`Deleteing Ticket...`)
        setTimeout(() => {
          message.channel.delete()
        }, ms('10s'))
  }
}