module.exports = {
	name: 'help',
	description: 'Its help',
  guildOnly: false,
  ownerOnly: false,
  aliases: ['h'],
  category: 'info', //mod info fun misc
	execute(message, args, client, MessageEmbed) {
    
    const Info = client.commands.filter(c => c.category === 'info').size
    const Mod = client.commands.filter(c => c.category === 'mod').size
    const Fun = client.commands.filter(c => c.category === 'fun').size
    const Misc = client.commands.filter(c => c.category === 'misc').size
    
    let prefix;
    if(message.guild) prefix = client.serverconfig.get(message.guild.id,'prefix')
    if(!message.guild) prefix = '!'
    
    
    if(!args[0]){
      const embed = new MessageEmbed()
      .setTitle(client.user.username + `'s commands`)
      .setColor('#008000')
      .addField(`Mod (${Mod})`, 'Moderation commands only available to members with special permissions', true)
      .addField(`\u200b`, `\u200b`, true)
      .addField(`Info (${Info})`, 'Informational commands available to everyone such as userinfo or serverinfo', true)
      .addField(`Fun (${Fun})`, 'Fun commands thats just gonna make you laugh your ass off (Warning this bot takes no responsibility if you loose your ass during usage)', true)
      .addField(`\u200b`, `\u200b`, true)
      .addField(`Misc (${Misc})`, 'Commands that didnt fit into any category', true)
      .setThumbnail(client.user.avatarURL())
      .setDescription(`Use ${prefix}help {category/command} for command list/help`)
      
      message.author.send(embed).catch(e => message.channel.send(embed))
    }
    
    if(!args[0]) return;
    let helpC = args[0]
    helpC = helpC.toLowerCase()
    
    if(client.commands.filter(c => c.category === helpC).size <= 0) {
      
      const cmd = client.commands.get(helpC) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(helpC))
      
      if(!cmd){
        const embed = new MessageEmbed()
        .setTitle(`${helpC} is not a valid category/command`)
        .setColor('#FF0000')
      
        return message.channel.send(embed)
      }
      
      if(cmd.ownerOnly && message.author.id !== '232466273479426049') {
        const embed = new MessageEmbed()
        .setTitle(`${helpC} is not a valid category/command`)
        .setColor('#FF0000')
      
        return message.channel.send(embed)
      }
      
      if(cmd) {
        const embed = new MessageEmbed()
        .setTitle(`Information about the **${cmd.name}** command`)
        .setColor('#008000')
        .addField('Alias(es)', cmd.aliases.join('\n'))
        .addField('Guild only', cmd.guildOnly)
        .setDescription(cmd.description)
        
        return message.author.send(embed).catch(e => message.channel.send(embed))
      }
      

    }
    
    const embed = new MessageEmbed()
    .setTitle(`Commands in the ${helpC} category`)
    .setDescription(client.commands.filter(c => c.category === helpC).map(c => c.name).join('\n'))
    .setColor('#008000')
    .setFooter(`Use ${prefix}help {command/alias} to get info about the command
`)
    

    message.author.send(embed).catch(e => message.channel.send(embed))
  },
};