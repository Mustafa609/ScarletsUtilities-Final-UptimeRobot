const { Client } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client) {
     
    
    //client.user.setUsername('[>] SpiritBot')
    //client.user.setPresence({ activity: { name: 'Scarlet\'s Dream World' }, status: 'dnd' }, { type: "WATCHING"})
    console.log('SpiritBot Has Logged In')

    const statusArray = ['For Rule Breakers, WATCHING', 'Loki (Only On Disney+), WATCHING', 'GTAO, PLAYING', 'On Scarlet\'s Dream World, WATCHING', 'Music w Tiger\'s Rythm, LISTENING', ' Commands, LISTENING', 'Catching Variants, WATCHING', 'Football With Messi, PLAYING', 'Billie Eilish, LISTENING', 'HIVE Tresure Wars, PLAYING', 'Black Widow (Early Access), WATCHING', 'Spider-Man: No Way Home (Early Acess), WATCHING', 'Humanity End, WATCHING', 'RDR2, PLAYING', 'Bad Guys, WATCHING'];
    
    setInterval(() => {
      client.user.setStatus('dnd');
      const random = statusArray[Math.floor(Math.random() * statusArray.length)].split(', ')
      const status = random[0];
      const mode = random[1];
      client.user.setActivity(status, { type: mode })

    }, 5000)
  }
}