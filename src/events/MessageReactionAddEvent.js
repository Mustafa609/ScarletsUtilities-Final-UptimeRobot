// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd
const BaseEvent = require('../utils/structures/BaseEvent');
const Discord = require('discord.js');
const enmap = require('enmap')
const fs = require('fs');
const mongoose = require('mongoose')
module.exports = class MessageReactionAddEvent extends BaseEvent {
  constructor() {
    super('messageReactionAdd');
  }

  async run(client, reaction, user) {
    if (user.partial) await user.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();

    if (user.bot) return;

    let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);

    if (!ticketid) return;

    if (reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
      reaction.users.remove(user);

      reaction.message.guild.channels.create(`ticket-${user.username}`, {
        permissionOverwrites: [
          {
            id: user.id,
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
          },
          {
            id: reaction.message.guild.roles.everyone,
            deny: ["VIEW_CHANNEL"]
          },

          {
            id: '808305729101758495',
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
          }


        ],
        type: 'text'
      }).then(async channel => {
        channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("We will be with you shortly").setColor("00ff00"))
      })
    }
  }
}