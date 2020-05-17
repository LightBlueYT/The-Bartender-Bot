const {red, green} = require('../colors.json')
module.exports = {
	name: 'ban',
	description: 'Ban a member from the server',
  guildOnly: true,
  ownerOnly: false,
  aliases: [],
  category: 'mod', // mod > info > fun > misc
  perms_needed: ['BAN_MEMBERS'],
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
      .setTitle('You cannot ban yourself')
      .setColor(red)
      
      return message.channel.send(embed)
    }
    
    if(!client.staff.get(message.guild.id + message.member.id, 'allow_ban') || !message.member.permissions.has('BAN_MEMBERS')){
      const embed = new MessageEmbed()
      .setTitle('You are not allowed to ban members')
      .setColor(red)
      
      return message.channel.send(embed)
    }
    if(!message.guild.me.permissions.has('BAN_MEMBERS')){
      const embed = new MessageEmbed()
      .setTitle('I\'m missing permissions to **ban** members')
      .setColor(red)
      
      return message.channel.send(embed)
    }
    
    if(message.member.roles.highest.position < target.roles.highest.position){
      const embed = new MessageEmbed()
      .setTitle('This member have higher permissions than you and cannot be banned')
      .setColor(red)
      
      return message.channel.send(embed)
    }
    
    if(message.guild.me.roles.highest.position < target.roles.highest.position){
      const embed = new MessageEmbed()
      .setTitle('This member have higher permissions than me and cannot be banned')
      .setColor(red)
      
      return message.channel.send(embed)
    }
    
    let reason = args.slice(0).join(' ')
    if(!reason) reason = `Kicked ${target.user.tag}`
    
    async function ban() {
      await target.send(`You have been banned from: *${message.guild.name}*\nReason: \`\`\`${reason}\`\`\``).catch( async err => {
        message.channel.send('ban failed retrying')
        await target.ban()
        message.channel.send(`Member ${target.user.username}#${target.user.discriminator} have been banned`)
      })
      await target.ban()
      message.channel.send(`Member ${target.user.username}#${target.user.discriminator} have been banned`)
    }
    
    ban()
  },
};