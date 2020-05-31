const Discord = require('discord.js');
const client = new Discord.Client({presence: {activity: {name: "!help | Mention for prefix",type:"WATCHING"}}});
const Enmap = require('enmap');
const {token} = require('./config.json') // also if the token is in process.env what is this for

const fs = require('fs');


client.commands = new Discord.Collection();

const cFiles = fs.readdirSync('./commands').filter(monkeyWithBananas => monkeyWithBananas.endsWith('.js'));

for(const file of cFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.events = new Discord.Collection();

fs.readdir("./events/", (err, files) => {
  
  if (err) return console.error(err);
  
  files.forEach(file => {
   
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.events.set(eventName, event)
    
    client.on(eventName, event.bind(null, client));
    
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.serverconfig = new Enmap({name: `serverconfig`})
client.xp = new Enmap({name: `xp`})
client.welcomemessage = new Enmap({name: `Welcomemessage`})
client.staff = new Enmap({name: `staff`})
client.cases = new Enmap({name: `cases`})
client.cchan = new Enmap({name: `cchan`})
client.serverconfig.destroy()


client.login(process.env.TOKEN); // Fun Fact: if you name it DISCORD_TOKEN instead of TOKEN you don't even need to provide any parameters!

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, res) => {
  res.send('Yup nothing here')
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://yellow-soft-streetcar.glitch.me/`);
}, 280000);
