const {red, green} = require('../colors.json')
module.exports = {
	name: 'staff',
	description: 'Customised staff system with custom permissions',
  guildOnly: true,
  ownerOnly: false,
  aliases: [],
  category: 'mod', //mod info fun misc
	execute(message, args, client, MessageEmbed) {

    if(message.member.permissions.has('ADMINISTRATOR') || message.guild.ownerID === message.member.id) {
      if(!args[0]) return message.channel.send('Please use one of the following: **list, add, remove, permissions**')
      if(args[0] === 'list'){
      
        async function arr() {
          const array = []
        
            
          await message.guild.members.cache.forEach(m => {
            const key = message.guild.id+m.id;
            if(client.staff.has(message.guild.id + m.id)) {
              const perms = []
              if(client.staff.get(key, 'allow_kick')) perms.push('KICK_MEMBERS')
              if(client.staff.get(key, 'allow_ban')) perms.push('BAN_MEMBERS')
              if(client.staff.get(key, 'allow_mute')) perms.push('MUTE_MEMBERS')
              if(client.staff.get(key, 'allow_warn')) perms.push('WARN_MEMBERS')
              if(client.staff.get(message.guild.id+m.id, 'isStaff')){
                array.push(`${m.displayName}: ${perms.join(', ')}`)
              }
            } 
          })
          if(array.length <= 0) return message.channel.send('There is no custom staff in this server')
          message.channel.send(`\`\`\`${array.join('\n')}\`\`\``)
        }
        arr()
      }
    
      let target = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(m => m.user.tag === args[1])
    
      if(args[0] === 'add'){      
        if(!client.staff.has(message.guild.id+target.id)){
          client.staff.ensure(message.guild.id + target.id, {
            member: target.id,
            isStaff: false,
            allow_kick: false,
            allow_ban: false,
            allow_nute: false,
            allow_warn: false
          });
        }
        if(client.staff.get(message.guild.id+target.id, 'isStaff')) return message.channel.send(`This member is already in the STAFF Team`)
      
        client.staff.set(message.guild.id + target.id, true, 'isStaff')
        message.channel.send(`${target.displayName} is now a part of the STAFF Team\nTo set permissions use <prefix>staff permissions <member> <permission> true/false`)
      }
    
      if(args[0] === 'remove'){
        client.staff.set(message.guild.id+target.id, false, 'isStaff')
        message.channel.send(`${target.displayName} have been removed from the STAFF Team`)
      }
    
      if(args[0] === 'permissions'){
        if(!['kick', 'ban', 'mute', 'warn'].includes(args[2])) return message.channel.send(`${args[2]} is not a valid permission use one of **ban/kick/mute/warn**`)
        
        client.staff.set(message.guild.id+target.id, !client.staff.get(message.guild.id+target.id, `allow_${args[2]}`), `allow_${args[2]}`)
        message.channel.send(`${target.displayName}'s ${args[2]} permission is now set to ${client.staff.get(message.guild.id+target.id, `allow_${args[2]}`)}`)

      }
    } else {
      message.channel.send('You dont have the permissions for this command')
    }
  },
};