const {red, green} = require('../colors.json');
const cons = require('child_process');
module.exports = {
	name: 'restart',
	description: 'Restarts bot',
  guildOnly: false,
  ownerOnly: true,
  aliases: [],
  category: 'misc', //mod info fun misc
  perms_needed: [],
	execute(message, args, client, MessageEmbed) {
    message.channel.send('Restarting...').then(m => {
	process.exit(1)
    });
  },
};
