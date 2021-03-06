const moment = require('moment')
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
    
    if(message.member.permissions.has('KICK_MEMBERS') || client.staff.get(message.guild.id + message.member.id, 'allow_kick')){

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
    
    let reason = args.slice(1).join(' ')
    if(reason.length <= 0) reason = `Kicked ${target.user.username}#${target.user.discriminator}`
    
    async function kick() {
      await target.send(`You have been kicked from: *${message.guild.name}*\nReason: \`\`\`${reason}\`\`\``).catch(err => {
        target.kick()
      })
      target.kick()
      message.channel.send(`Member ${target.user.username}#${target.user.discriminator} have been kicked`)
    }
    
    kick()
    
    client.cases.ensure(`${message.guild.id}-${client.cases.count + 1}`, {
      case: client.cases.count + 1,
      type: 'Kick',
      executor: message.member.id,
      target: target.id,
      reason: reason,
      time: moment().format('MMMM Do YYYY, HH:MM'),
    })
    
    const cases = new MessageEmbed()
    .setTitle(`Case #${client.cases.get(`${message.guild.id}-${client.cases.count}`, 'case')}`)
    .setDescription(`Type: \`Kick\`\n----------\nExecutor: \`${message.member.user.tag}\`\nTarget: \`${target.user.username}#${target.user.discriminator}\`\n----------\nReason: \`\`\`${reason}\`\`\``)
    .setFooter(`${moment().format('MMMM Do YYYY, HH:MM')}`)
    .setColor(green)
    
    if(!client.channels.cache.has(client.cchan.get(message.guild.id, 'channel'))){
      message.guild.channels.create('bot-cases', {
        type: 'text',
        topic: 'Case files will be stored in this channel you can move it and rename it as you wish altho you cant choose or create a case channel its automatic!',
        permissionOverwrites: [{id: message.guild.id, deny: ['SEND_MESSAGES'], allow: ['VIEW_CHANNEL']}, {id: message.guild.me, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']}]
      }).then(c => {
        client.cchan.set(message.guild.id, c.id, 'channel')
        c.send(cases)
      })
    } else { client.channels.cache.get(client.cchan.get(message.guild.id, 'channel')).send(cases) }
    } else {
      const embed = new MessageEmbed()
      .setTitle('You are not allowed to kick members')
      .setColor(red)
      
      return message.channel.send(embed)
    }
  },
};