module.exports = {
	name: 'reload',
	description: 'reload',
  category: 'BotDev',
  guildOnly: false,
  ownerOnly: true,
  aliases: ['refresh'],
  perms_needed: [],
	execute(message, args, client, MessageEmbed) {
      
    if(!args[0]){
      const embed = new MessageEmbed()
      .setTitle('Provide a command to reload')
      .setColor('RED')
      return message.channel.send(embed).catch(err => console.error(err))
    }
    
    const commandName = args[0];
    
    if(!client.commands.has(commandName)) {
      let embed = new MessageEmbed()
      .setTitle('The command provided is invalid')
      .setColor('RED')
      return message.channel.send(embed).catch(err => console.error(err))
    }
    
    delete require.cache[require.resolve(`./${commandName}.js`)];
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);

    let embed = new MessageEmbed()
    .setTitle(`${commandName} have been reloaded.`)
    .setColor('GREEN')
    message.channel.send(embed).catch(err => console.error(err))
	},
};