module.exports = {
	name: 'userinfo',
	description: 'Shows userinfo (member info)',
  guildOnly: true,
  ownerOnly: false,
  aliases: ['ui', 'user'],
  category: 'info', //mod info fun misc
	execute(message, args, client, MessageEmbed) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const time = `${member.user.createdAt.toDateString()} ${member.user.createdAt.getHours()}:${member.user.createdAt.getMinutes()}`
    const time2 = `${member.joinedAt.toDateString()} ${member.joinedAt.getHours()}:${member.joinedAt.getMinutes()}`
    let array = []
    
    if (member.user.bot) array.push('BOT')
    if (member.id === member.guild.ownerID) { array.push('OWNER')
    } else if (member.hasPermission('ADMINISTRATOR') && member.id !== member.guild.ownerID) { array.push('ADMIN')
    } else if (client.staff.get(message.guild.id + message.author.id, 'isStaff')) { array.push('STAFF')}   
    let title = `${member.user.tag}'s info [${array.join(', ')}]`

    
    const embed = new MessageEmbed()
    .setTitle(title)
    .setColor(member.roles.highest.hexColor)
    .addField(`User`, member.user.tag, true)
    if(!!member.nickname){
      embed.addField(`Nickname`, member.nickname, true)
    } else {
      embed.addField(`\u200b`, `\u200b`, true)
    }
    embed.addField(`ID`, member.id, true)
    .addField(`Joined server`, time2, true)
    .addField(`\u200b`, `\u200b`, true)
    .addField(`Joined discord`, time, true)
    .addField(`Roles`, member.roles.cache.map(r => r.toString()).join(`\n`), true)
    .addField(`\u200b`, `\u200b`, true)
    .addField(`Guild owner`, member.id === member.guild.ownerID, true)
    .setTimestamp()
    .setThumbnail(member.user.avatarURL({format: 'png', size: 4096}))
    
    message.channel.send(embed)
  },
}