const {red, green} = require('../colors.json')
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