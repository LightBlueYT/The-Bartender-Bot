module.exports = {
	name: 'roleinfo',
	description: 'Shows role information',
  guildOnly: true,
  ownerOnly: false,
  aliases: ['role', 'rf'],
  category: 'info', //mod info fun misc
	execute(message, args, client, MessageEmbed) {
    const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.match(args[0])) || message.guild.roles.cache.get(args[0]) || message.member.roles.highest;
    const time = `${role.createdAt.toDateString()} ${role.createdAt.getHours()}:${role.createdAt.getMinutes()}`
    
    const embed = new MessageEmbed()
    .setTitle(`Information about ${role.name}`)
    .setColor(role.hexColor)
    .addField(`Member count`, role.members.size, true)
    .addField(`Have role`, message.member.roles.cache.has(role.id), true)
    .addField(`Created`, time, true)
    .addField(`Permissions`, '```'+role.permissions.toArray().join('\n')+'```', true)
    
    message.channel.send(embed)
  },
};