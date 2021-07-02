const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const fs = require('fs');
const enmap = require('enmap');

module.exports = class TicketcreateCommand extends BaseCommand {
  constructor() {
    super('ticketcreate', 'ticket', []);
  }

  async run(client, message, args) {
    message.guild.channels.create(`ticket-${message.author.id}`, {
      permissionOverwrites: [
          {
              id: message.author.id,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
          },
          
          {
              id: message.guild.roles.everyone,
              deny: ["VIEW_CHANNEL"]
          },

          {
              id: '808305729101758495',
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
          },
          
          
      ],
      type: 'text'
  }).then(async channel => {
      channel.send(`<@${message.author.id}>`, new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("We will be with you shortly").setColor("00ff00"))
  })

  }
}