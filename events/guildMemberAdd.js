module.exports = async(client, member) => {
  let message;
  if(client.welcomemessage.get(member.guild.id, 'random')){
    let arr = client.welcomemessage.get(member.guild.id, 'messages')
    message = arr[Math.floor(Math.random() * arr.length)]
  } else {
    message = client.welcomemessage.get(member.guild.id, 'message')
  }
  
  let webhook = await member.guild.channels.cache.get(client.serverconfig.get(member.guild.id, 'welcome_channel')).createWebhook(member.displayName, {avatar: member.user.avatarURL({size: 4096, format: 'png'})})
  await webhook.send(`${message}`)
  webhook.delete()
  
  client.staff.ensure(member.guild.id + member.id, {
    member: member.id,
    isStaff: false,
    allowKick: false,
    allowBan: false,
    allowMute: false,
    allowWarn: false
  });
}