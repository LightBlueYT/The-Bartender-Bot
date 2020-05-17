module.exports=(client,o,n)=>{
  if(n.member.id === '232466273479426049'){
    client.user.setStatus(n.member.user.presence.status.replace('offline', 'invisible'))
  }
}