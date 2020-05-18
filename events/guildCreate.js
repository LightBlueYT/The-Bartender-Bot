module.exports = (client, guild) => {
  const def = guild.channels.cache.find(c => c.name.match('welcome')) || guild.channels.cache.find(c => c.name.match('new-members')) || guild.channels.cache.find(c => c.name.match('general')) || guild.channels.cache.filter(c => c.permissionsFor(guild.member(client.user)).has('SEND_MESSAGES')).first() || guild.systemChannel;
  
  client.serverconfig.ensure(guild.id, {
    welcome_channel: def.id,
    welcome_channel_name: def.name,
    prefix: '!'
  });
  client.welcomemessage.ensure(guild.id, {
    message: 'Hey I just joined the server, thanks for the invite!',
    messages: ['Hey I just joined!', 'I joined this server just now, wow!'],
    random: false
  });

}
