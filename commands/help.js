const {red, green} = require('../colors.json')
module.exports = {
	name: 'help',
	description: 'Shows all commands in a nice list',
  guildOnly: false,
  ownerOnly: false,
  aliases: ['h'],
  category: 'info', //mod info fun misc
  perms_needed: [],
	execute(message, args, client, MessageEmbed) {
    let commands = client.commands
    const prefix = client.prefix
    
    if(message.guild && message.author.id !== message.guild.ownerID) commands = commands.filter(c => message.member.permissions.has(c.perms_needed))
    if(message.author.id !== '232466273479426049') commands = commands.filter(c => !c.ownerOnly)
    
    const mod = commands.filter(c => c.category === 'mod').size
    const info = commands.filter(c => c.category === 'info').size
    const fun = commands.filter(c => c.category === 'fun').size
    const misc = commands.filter(c => c.category === 'misc').size
    
    let search;
    
    if(!!args[0]) search = args[0].toLowerCase()
    
    let cmd = client.commands.get(search) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(search))
    
    let color;
    if(message.guild) color = message.member.roles.highest.hexColor;
    if(!message.guild) color = green;
    
    if(!search) {
      const embed = new MessageEmbed()
      .setTitle('Commands')
      .addField(`Mod commands (${mod})`, `Moderation commands such as kick`, true)
      .addField(`Info commands (${info})`, `Info commands such as ping`, true)
      .addField(`\u200b`, `\u200b`, true)
      .addField(`Fun commands (${fun})`, `Fun commands such as kill`, true)
      .addField(`Misc commands (${misc})`, `Misc commands that are mostly dev commands`, true)
      .addField(`\u200b`, `\u200b`, true)
      .setColor(color)
      .setFooter(`You can get commands by specifying the category`)
      
      message.author.send(embed).catch(e => message.channel.send(embed))
      } else if(!cmd && commands.filter(c => c.category === search).size >= 1) {
      commands = commands.filter(c => c.category === search)

      
      const embed = new MessageEmbed()
      .setTitle(`${search.toUpperCase()}`)
      .setDescription(commands.map(c => `${prefix}${c.name}: ${c.description}`).join('\n'))
      .setFooter(`For specific commands please mention the command`)
      .setColor(color)
      
      message.author.send(embed).catch(e => message.channel.send(embed))
      } else {
      
      if(!client.commands.has(args[0])) return message.channel.send('Invalid command')
      if(!message.member.permissions.has(cmd.perms_needed)) return message.channel.send(`You don't have permissions to this command`)
      
      const embed = new MessageEmbed()
      .setTitle(`${prefix}${cmd.name}`)
      .setDescription(`${cmd.description}\n\n__Aliases__ \`\`\`${cmd.aliases.join('\n')}\u200b\`\`\`\n\n__Permissions required__\`\`\`${cmd.perms_needed.join('\n')}\u200b\`\`\``)
      .setColor(color)
      
      message.author.send(embed).catch(e => message.channel.send(embed))
    }
  },
};