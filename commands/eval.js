const ms = require('ms');
const moment = require('moment');
module.exports = {
	name: 'eval',
	description: 'Eval',
  guildOnly: false,
  ownerOnly: true,
  aliases: ['ev', 'e'],
  category: 'misc', // mod > info > fun > misc
  perms_needed: [],
	execute(message, args, client, MessageEmbed) {
    
    const clean = text => {
      if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
        return text;
    }
    const args1 = message.content.split(" ").slice(1);
 
    try {
      const code = args.join(" ").split("<").join("").split(">").join("").split("#").join(".");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
	    
	if(evaled == client.token) evaled = "Barak Obama for president!"
 
      const embed = new MessageEmbed()
      .setTitle(`Successfull Evaluation`)
      .setColor(`#008000`)
      .addField(`Input`, `\`\`\`js\n${args.join(" ")}\`\`\``)
      .addField(`Output`, `\`\`\`js\n${evaled}\`\`\``)
      .setTimestamp()
      .setThumbnail('https://media1.tenor.com/images/88d89612db5eaacc6c9c6ac6bf6cd6e7/tenor.gif?itemid=7715402')
      
      
      message.channel.send(embed);
    } catch (err) {
      const embed = new MessageEmbed()
      .setTitle(`Unsuccessfull Evaluation`)
      .setColor(`#FF0000`)
      .addField(`Input`, `\`\`\`js\n${code}\`\`\``)
      .addField(`Error`, `\`\`\`js\n${err}\`\`\``)
      .setTimestamp()
      .setThumbnail('https://media1.tenor.com/images/a4ffc23c3537fc4eb8c076c4fb072f32/tenor.gif?itemid=7304550')
      
      message.channel.send(embed)
    }
  },
};
