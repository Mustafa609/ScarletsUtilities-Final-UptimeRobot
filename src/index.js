const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Scarlets-Utilities:Ufone786@scarlets-utilities.umisw.mongodb.net/Data', { useNewUrlParser: true, useUnifiedTopology: true })
const client = new Client();
const keepAlive = require('./server.js')
keepAlive();


(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
})();