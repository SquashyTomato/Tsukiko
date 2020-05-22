/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Node Modules
const Discord = require('discord.js');
const moment = require('moment');

// Event Module
module.exports = async (client, config, guildMember) => {
    conn.getConnection(function (err, con) {
        con.query("SELECT * FROM `guilds` WHERE `id` = " + guildMember.guild.id, function (err, result) {
            if (err) throw err;
            if (!result[0]) return;

            // Check If User Is A Bot
            if (!(guildMember.user.bot)) {
                // Check If Channel Or Message Is Null
                if (!(result[0].alert_channel === null || result[0].alert_leave === null)) {

                    // Replace Parts Of The String
                    let alertMessage = result[0].alert_leave;
                    alertMessage = alertMessage.replace(/{@user}/gi, '<@' + guildMember + '>');
                    alertMessage = alertMessage.replace(/{user}/gi, guildMember.user.tag);
                    alertMessage = alertMessage.replace(/{guild}/gi, guildMember.guild.name);

                    // Send Final String
                    client.channels.cache.get(result[0].alert_channel).send(alertMessage);
                }
            }

            // Check If User Logging Is Enabled
            if (!(result[0].log_channel === null || result[0].log_user === '1')) {
                // Send Log Message
                const logEmbed = new Discord.MessageEmbed()
                    .setAuthor('User Left', guildMember.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
                    .setDescription(guildMember.user.tag)
                    .setColor(config.general.color)
                    .setThumbnail(guildMember.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
                    .addField('Created At', moment(guildMember.user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss A Z'), false)
                    .addField('Left At', moment(Date().now).format('MMMM Do YYYY, h:mm:ss A Z'), false)
                    .setFooter('ID: ' + guildMember.user.id)
                
                client.channels.cache.get(result[0].log_channel).send({embed: logEmbed});
            }
        });
        con.release();
    });
};