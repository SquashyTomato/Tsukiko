/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Node Modules
const Discord = require('discord.js');
const moment = require('moment');

// Event Module
module.exports = async (client, config, oldMsg, newMsg) => {
    // Check If Bot User Or DM Channel
    if (newMsg.author.bot || newMsg.channel.type == 'dm') return;

    // Check If Deletion Or Same Content
    if (oldMsg.content == newMsg.content || !newMsg.content) return;

    conn.getConnection(function (err, con) {
        con.query("SELECT * FROM `guilds` WHERE `id` = " + newMsg.guild.id, function (err, result) {
            if (err) throw err;
            if (!result[0]) return;

            // Check If Message Logging Is Enabled
            if (!(result[0].log_channel === null || result[0].log_message === '1')) {
                // Send Log Message
                const logEmbed = new Discord.MessageEmbed()
                    .setAuthor('Message Edited in #' + newMsg.channel.name, newMsg.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
                    .setDescription(newMsg.author.tag)
                    .setColor(config.general.color)
                    .addField('Edited At', moment(Date().now).format('MMMM Do YYYY, h:mm:ss A Z'), false)
                    .addField('Old Message', func.shortenMsg(oldMsg.content), false)
                    .addField('New Message', func.shortenMsg(newMsg.content), false)
                    .setFooter('Author: ' + newMsg.author.id + ' | Message: ' + newMsg.id)

                client.channels.cache.get(result[0].log_channel).send({embed: logEmbed});
            }
        });
        con.release();
    });
};