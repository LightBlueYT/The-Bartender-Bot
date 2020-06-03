const {red, green} = require('../colors.json');
const fetch = require('node-fetch');
let valid_projects = ['stable', 'master', 'rpc', 'commando', 'akairo', 'akairo-master'];
let validateProject = (p)=>valid_projects.includes(p);
module.exports = {
	name: 'docs',
	description: 'DJS documentation',
  guildOnly: false,
  ownerOnly: true,
  aliases: ['djs'],
  category: 'misc', //mod info fun misc
  perms_needed: [],
	async execute(message, args, client, MessageEmbed) {
      let queryString = args[0]
        let project = "master"
        if(args[1] && args[1].startsWith('--src=')) [, project]= args[1].split('=')
        if(!validateProject(project)) return msg.channel.send('Invalid source.')
        let docs = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${project}&q=${queryString}`).then(r => r.json())
        return await msg.channel.send({embed: docs})
  },
};
