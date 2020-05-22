const {red, green} = require('../colors.json')
module.exports = {
	name: 'case',
	description: 'Show case #X',
  guildOnly: true,
  ownerOnly: false,
  aliases: [],
  category: 'mod', //mod info fun misc
  perms_needed: [],
	execute(message, args, client, MessageEmbed) {
    let caseN = args[0].replace('#', '')
    if(!caseN) return message.channel.send(`Please mention a case #`)
    if(isNaN(caseN)) return message.channel.send(`${caseN} is not a valid number`)

    if(!client.cases.has(message.guild.id+'-'+caseN)) return message.channel.send(`Case #${caseN} does not exist`)
    
    async function cases(){
    
      const key = `${message.guild.id}-${caseN}`
    
      const c = client.cases;
      const cType = c.get(key, 'type');
      const cEx = await client.users.fetch(c.get(key, 'executor'));
      const cTar = await client.users.fetch(c.get(key, 'target'));
      const cRe = c.get(key, 'reason');
      const cTime = c.get(key, 'time');
    
      const embed = new MessageEmbed()
      .setTitle(`Case #${caseN}`)
      .setDescription(`Type: \`${cType}\`\n----------\nExecutor: \`${cEx.username}\`\nTarget: \`${cTar.username}#${cTar.discriminator}\`\n----------\nReason: \`\`\`${cRe}\`\`\``)
      .setFooter(cTime)
      .setColor(green)
    
      message.channel.send(embed)
    }
    cases()
  },
};