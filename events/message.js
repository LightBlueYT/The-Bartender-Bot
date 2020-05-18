const {prefix, owner} = require('../config.json');
const {MessageEmbed} = require('discord.js');

module.exports = (client, message) => {
  let mentionRegexp = /^<@!?703934678880485406>$/
	
  if(mentionRegexp.test(message.content)) return message.channel.send(`Current prefix is \`${client.serverconfig.get(message.guild.id, 'prefix')}\``)
  
  if(message.author.bot) return;
  
  if(message.guild){
    
    //Guild Case Channel Start
    client.cchan.ensure(message.guild.id, {
      channel: ''
    })
    //Guild Case Channel End
    
    //Guild Custom Staff Start
    client.staff.ensure(message.guild.id + message.author.id, {
      member: message.member.id,
      isStaff: false,
      allow_kick: false,
      allow_ban: false,
      allow_mute: false,
      allow_warn: false
    });
    //Guild Custom Staff End
    
    if (!message.content.startsWith(client.serverconfig.get(message.guild.id, 'prefix'))) return;
  
  } else {
    if (!message.content.startsWith('!') || message.author.bot) return;
  }
	const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  
  if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm'){
    let embed = new MessageEmbed()
    .setTitle('Command can only be used in guilds')
    .setColor('RED')
    return message.channel.send(embed).catch(console.error)
  }
  
  if(command.ownerOnly && message.author.id !== owner.id){
    let embed = new MessageEmbed()
    .setTitle('You can\'t run this command')
    .setColor('RED')
    return message.channel.send(embed).catch(console.error)
  }

  try {
    command.execute(message, args, client, MessageEmbed);
  } catch (error) {
	  console.error(error);
    if(message.author.id === owner.id){
      const embed = new MessageEmbed()
      .setTitle('An error occured')
      .setColor('RED')
      message.channel.send(embed).catch(console.error)
    };
  }
}
