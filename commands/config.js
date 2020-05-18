module.exports = {
	name: 'config',
	description: 'server configurations',
  guildOnly: true,
  ownerOnly: false,
  aliases: ['conf', 'configuration'],
  category: 'mod', //mod info fun misc
  perms_needed: [],
	execute(message, args, client, MessageEmbed) {
    const prefix = client.serverconfig.get(message.guild.id, 'prefix');
      
    if(message.member.id === message.guild.ownerID || message.member.hasPermission('ADMINISTRATOR')) {
      
      
      if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Configuration usage')
        .addField(`${prefix}config prefix`, `Change prefix for the server minimum 1 maximum 5 characters long`, true)
        .addField(`${prefix}config welcomechannel`, `Change the welcome channel where the bot will welcome new members`, true)
        .addField(`${prefix}config welcomemessage`, `Change the welcome message when someone new joins`, true)
      
        return message.channel.send(embed)  
      }
                  
      if(args[0] === 'prefix') {
        if(!args[1]) {
          async function coll() {
            
            await message.channel.send('What would you like to change your prefix to? Type "cancel" to cancel')
            let collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 30000, errors: ['time']})
            if(collected.first().content.toLowerCase() === 'cancel') return message.channel.send('Command was canceled')
            
            let msg = await message.channel.send(`Are you sure you want **${collected.first()}** to be your new prefix?`)
            await msg.react('✅')
            await msg.react('❌')
            
            let reactions = await msg.awaitReactions((reaction, user) => reaction.emoji.name === '✅' || reaction.emoji.name === '❌' && user.id === message.author.id, {max: 1, time: 30000, errors: ['time']})
            if(reactions.first().emoji.name === '❌') return message.channel.send('Command was canceled')
            if(reactions.first().emoji.name === '✅') {
              await client.serverconfig.set(message.guild.id, collected.first(), 'prefix')
              return message.channel.send(`Server prefix have been set to ${collected.first()}`)
            }
          }
          coll()
        }
        if(args[1]) {
          async function col() {
           let msg = await message.channel.send(`Are you sure you want **${args[1]}** as the new prefix?`)
           await msg.react('✅')
           await msg.react('❌')
            
            let reactions = await msg.awaitReactions((reaction, user) => reaction.emoji.name === '✅' || reaction.emoji.name === '❌' && user.id === message.author.id, {max: 1, time: 30000, errors: ['time']})
            if(reactions.first().emoji.name === '❌') return message.channel.send(`Prefix was not changed`)
            if(reactions.first().emoji.name === '✅') {
              await client.serverconfig.set(message.guild.id, args[1], 'prefix')
              return message.channel.send(`Server prefix have been set to ${args[1]}`)
            }
          }
          col()
        }
      }
      
      if(args[0] === 'welcomechannel') {
        let chan = message.mentions.channels.first()
        if(!chan) return message.channel.send("Please mention a channel")
        client.serverconfig.set(message.guild.id, chan.id, 'welcome_channel')
        client.serverconfig.set(message.guild.id, chan.name, 'welcome_channel_name')
        return message.channel.send(chan.toString() + ' is now the welcome channel')
      }
      
      if(args[0] === 'welcomemessage') {
        if(!args[1]) {
          const embed = new MessageEmbed()
          .setTitle('Welcome Message Usage')
          .addField(`Randomiser`, `True: Picks a random welcome message to send everytime someone joins\nFalse: Disables this feature`, true)
          .addField(`Message`, `Sets the new welcomemessage (This does not do anything to the randomiser)`, true)
          .addField(`Addmessage`, `Adds a new message to the randomiser`, true)
          .addField(`Deletemessage`, `Deletes a message from the randomiser`, true)
          .addField(`Showmessages`, `Shows all messages in the randomiser`, true)
          .setColor(message.member.roles.highest.hexColor)
          
          return message.channel.send(embed)
        }
        
        if(args[1].toLowerCase() === 'randomiser'){
          if(!args[2]){
            const embed = new MessageEmbed()
            .setTitle('Randomiser configuration usage')
            .addField('True', 'Enables the randomised welcome message', true)
            .addField('False', 'Disabled the randomised welcome message', true)
            .addField('Currently', client.welcomemessage.get(message.guild.id, 'random'), true)
            
            return message.channel.send(embed)
          }
          if(args[2].toLowerCase() === 'true'){
            client.welcomemessage.set(message.guild.id, true, 'random')
            return message.channel.send('Welcome message is now randomised!')
          }
          if(args[2].toLowerCase() === 'false'){
            client.welcomemessage.set(message.guild.id, false, 'random')
            return message.channel.send('Welcome message randomiser is now disabled.')
          }
        }
        if(args[1].toLowerCase() === 'message'){
          let newMessage = message.content
          newMessage = newMessage.replace(`${prefix}config welcomemessage message`, '')
          
          async function ensure() {
            let msg = await message.channel.send(`Are you sure you want \`${newMessage}\` to be the new welcomemessage?`)
            await msg.react('✅')
            await msg.react('❌')
            
            let reactions = await msg.awaitReactions((reaction, user) => ['❌', '✅'].includes(reaction.emoji.name) && user.id === message.author.id, {time: 20000, max: 1, errors: ['time']}).catch(e => message.channel.send('Command timed out, you took to long to press the reaction.'))
            
            if(reactions.first().emoji.name === '✅'){
              client.welcomemessage.set(message.guild.id, newMessage, 'message')
              return message.channel.send(`The new welcome message is now \`${newMessage}\``)
            }
            if(reactions.first().emoji.name === '❌'){
              return message.channel.send('The command was canceled')
            }
          }
          ensure()
        }
        if(args[1].toLowerCase() === 'addmessage'){
          async function send() {
            let msg = await message.channel.send('Please send the message you wish to add to the randomiser')
            let messages = await message.channel.awaitMessages((ms) => ms.author.id === message.author.id, {max: 1, time: 30000, errors: ['time']}).catch(e => message.channel.send('Command timeout you took too long!'))
          
            const m = messages.first().content
            
             let mes = await message.channel.send('Adding \n```'+m+'```\nto to the randomiser...')
             await client.welcomemessage.push(message.guild.id, m, 'messages', false)
            mes.edit('Message was successfully added to the randomiser!')
          }
          send()
        }
        if(args[1].toLowerCase() === 'deletemessage'){
          if(!args[2]){
            return message.channel.send('Please specify the *number* of the message you wish to remove!')
          }
          if(isNaN(parseInt(args[2]))){
            return message.channel.send(args[2] + ' is not a valid number!')
          }
          let number = parseInt(args[2]) - 1
          
          if(!client.welcomemessage.has(message.guild.id, `messages.${number}`)){
            return message.channel.send('That message don\'t exist')
          }
          client.welcomemessage.delete(message.guild.id, `messages.${number}`)
          message.channel.send('Message was removed from the randomiser')
        }
        if(args[1].toLowerCase() === 'showmessages'){
          message.channel.send('```' + client.welcomemessage.get(message.guild.id, 'messages').join('\n') + '```')
        }
      }
      
      
    } else {
      const embed = new MessageEmbed()
      .setTitle('You are missing permissions for this command')
      .setColor('#FF0000')
      .setDescription('This command requires one of the following permission:\nMANAGE_SERVER\nADMINISTRATOR\nGuild Owner\nTo be run. If you have one of the permissions but its not working please report a bug with the' + ` ${client.serverconfig.get(message.guild.id, 'prefix')}report command!`)
      .setTimestamp()
      return message.channel.send(embed)
    }
    
  },
};