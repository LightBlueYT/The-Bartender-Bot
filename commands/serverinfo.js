module.exports = {
	name: 'serverinfo',
	description: 'Shows information for server',
  guildOnly: true,
  ownerOnly: false,
  aliases: ['info', 'server', 'guild', 'guildinfo'],
  category: 'info', //mod info fun misc
	execute(message, args, client, MessageEmbed) {
    let color = message.member.roles.highest.hexColor;
    if(message.member.roles.highest.hexColor === '#000000'){ 
      color = 'GREEN';
    }
    const guild = message.guild;
    guild.members.fetch();
    const time = `${guild.createdAt.toDateString()} ${guild.createdAt.getHours()}:${guild.createdAt.getMinutes()}`
    const embed = new MessageEmbed()
    .setTitle(`${message.guild.name}'s information`)
    .setColor(color)
    .setThumbnail(guild.iconURL({dynamic: true, size: 4096}))
    .addField(`Members`, guild.members.cache.filter(m => !m.user.bot).size, true)
    .addField(`Bots`, guild.members.cache.filter(m => m.user.bot).size, true)
    .addField(`\u200b`, `\u200b`, true)
    .addField(`Channels`, guild.channels.cache.filter(c => c.type !== `voice`).size, true)
    .addField(`Voice Channels`, guild.channels.cache.filter(c => c.type === `voice`).size, true)
    .addField(`\u200b`, `\u200b`, true)
    .addField(`Guild Owner`, guild.owner.user.tag + ` (${guild.owner.id})`, true)
    .addField(`Guild`, guild.name + ` (${guild.id})`, true)
    .addField(`\u200b`, `\u200b`, true)
    .addField(`Roles`, guild.roles.cache.filter(r => r.id !== guild.id).map(r => r.toString()).join(`\n`), true)
    .addField(`Created`, time, true)
    .addField(`\u200b`, `\u200b`, true)
    
    message.channel.send(embed)
  },
};
