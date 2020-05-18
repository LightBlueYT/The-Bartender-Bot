module.exports = {
	name: 'ping',
	description: 'Ping!',
  guildOnly: false,
  ownerOnly: false,
  aliases: ['ms'],
  category: 'info', //mod info fun misc
	execute(message, args, client, MessageEmbed) {
    const embed = new MessageEmbed()
    .setTitle(`${Math.floor(client.ws.ping)}MS`)
    .setColor('GREEN')
    message.channel.send(embed).catch(console.error)
  },
};
