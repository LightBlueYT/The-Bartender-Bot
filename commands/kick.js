const {red, green} = require('../colors.json')
module.exports = {
	name: 'kick',
	description: 'Kick a member from the server',
  guildOnly: true,
  ownerOnly: false,
  aliases: [],
  category: 'mod', // mod > info > fun > misc
  perms_needed: ['KICK_MEMBERS'],
	execute(message, args, client, MessageEmbed) {
    
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.tag === args[0])
    
    if(!target){
      const embed = new MessageEmbed()
      .setTitle('Please *mention* a user or use their *ID* or their *tag*')
      .setColor(red)
      
      return message.channel.send(embed)
    }
    if(target.id === message.member.id){
      const embed = new MessageEmbed()
      .setTitle('You cannot kick yourself')
      .setColor(red)
      
      return message.channel.send(embed)
    }
    
    if(!client.staff.get(message.guild.id + message.member.id, 'allow_kick') || !message.member.permissions.has('KICK_MEMBERS')){
      const embed = new MessageEmbed()
      .setTitle('You are not allowed to kick members')
      .setColor(red)
      
      return message.channel.send(embed)
    }
    if(!message.guild.me.permissions.has('KICK_MEMBERS')){
      const embed = new MessageEmbed()
      .setTitle('I\'m missing permissions to **kick** members')
      .setColor(red)
      
      return message.channel.send(embed)
    }
    
    if(message.member.roles.highest.position < target.roles.highest.position){
      const embed = new MessageEmbed()
      .setTitle('This member have higher permissions than you and cannot be kicked')
      .setColor(red)
      
      return message.channel.send(embed)
    }
    
    if(message.guild.me.roles.highest.position < target.roles.highest.position){
      const embed = new MessageEmbed()
      .setTitle('This member have higher permissions than me and cannot be kicked')
      .setColor(red)
      
      return message.channel.send(embed)
    }
    
    let reason = args.slice(0).join(' ')
    if(!reason) reason = `Kicked ${target.user.tag}`
    
    async function kick() {
      await target.send(`You have been kicked from: *${message.guild.name}*\nReason: \`\`\`${reason}\`\`\``).catch( async err => {
        message.channel.send('Kick failed retrying')
        await target.kick()
        message.channel.send(`Member ${target.user.username}#${target.user.discriminator} have been kicked`)
      })
      await target.kick()
      message.channel.send(`Member ${target.user.username}#${target.user.discriminator} have been kicked`)
    }
    
    kick()
  },
};