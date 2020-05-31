module.exports=(client)=>{
  client.user.setPresence({ activity: { name: '!help | mention for prefix' }, status: 'online' })
}
