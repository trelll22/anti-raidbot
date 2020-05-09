const Discord = require('discord.js');
const client = new Discord.Client();
const crypto = require("crypto");
const config = require('./config.json');


//On Ready

client.on('ready', () => {
    console.log(`Logged into ${client.user.tag}`)
    client.user.setActivity(`${client.guilds.cache.size} Guilds.` , {
        type: "WATCHING",
    });
});

//  MAIN

function setstatus() {
    client.user.setActivity(`${client.guilds.cache.size} Guilds.` , {
        type: "WATCHING",
    });
}


client.on('guildCreate', () => {
    setstatus()
}); 

client.on('guildDelete', () => {
    setstatus()
})


client.on('guildMemberAdd', (member) => {
    if(member.user.bot){
        const id = crypto.randomBytes(16).toString("hex");

        //CheckUSERID

        if(member.id === config.dynoid) {
            return;
        } 

        if(member.id === config.mee6id) {
            return;
        }

        //CheckUsername

        if(member.user.username === "Dyno") {
            if(member.id === config.dynoid) {
                return;
            } else {
                if(member.kickable) {
                    member.kick('Possible fake!');
                    const embed = new Discord.MessageEmbed()
                    .setColor('#FFFFFF')
                    .setTitle('Anti-Nuke Bot')
                    .setDescription("Possible fake Dyno kicked.")
                    .addFields(
                        { name: "Tag", value: `${member.user.tag}`, inline: false},
                        { name: "Created at", value: `${member.user.createdAt}`, inline: false},
                    )
                    .setTimestamp()
                    .setFooter("ID - "+id);
                    member.guild.owner.send(embed);
                    return;
                }
            }
        }

        if(member.user.username === "MEE6") {
            if(member.id === config.mee6id) {
                return;
            } else {
                if(member.kickable) {
                    member.kick('Possible fake!');
                    const embed = new Discord.MessageEmbed()
                    .setColor('#FFFFFF')
                    .setTitle('Anti-Nuke Bot')
                    .setDescription("Possible fake MEE6 kicked.")
                    .addFields(
                        { name: "Tag", value: `${member.user.tag}`, inline: false},
                        { name: "Created at", value: `${member.user.createdAt}`, inline: false},
                    )
                    .setTimestamp()
                    .setFooter("ID - "+id);
                    member.guild.owner.send(embed);
                    return;
                }
            }
        }

        //MESSAGE

        const embed = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle('Anti-Nuke Bot')
        .setDescription("Possible suspicious bot added.")
        .addFields(
            { name: "Tag", value: `${member.user.tag}`, inline: false},
            { name: "Created at", value: `${member.user.createdAt}`, inline: false},
            { name: "Failed Real Bot Check", value: `True`, inline: false}
        )
        .setTimestamp()
        .setFooter("ID - "+id);
        member.guild.owner.send(embed);
    }
});

client.login(config.token)