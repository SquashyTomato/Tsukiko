/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Node Modules
const Discord = require('discord.js');
const moment = require('moment');

// Event Module
module.exports = async (client, config, msg) => {
    // Check If Bot User Or DM Channel
    if (msg.author.bot || msg.channel.type == 'dm') return;

    conn.getConnection(function (err, con) {
        con.query("SELECT * FROM `guilds` WHERE `id` = " + msg.guild.id, function (err, result) {
            if (err) throw err;
            if (!result[0]) return;

            // Check If Message Logging Is Enabled
            if (!(result[0].log_channel === null || result[0].log_message === '1')) {
                // Send Log Message
                const logEmbed = new Discord.MessageEmbed()
                    .setAuthor('Message Deleted in #' + msg.channel.name, msg.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
                    .setDescription(msg.author.tag)
                    .setColor(config.general.color)
                    .addField('Deleted At', moment(Date().now).format('MMMM Do YYYY, h:mm:ss A Z'), false)
                    .addField('Message', func.shortenMsg(msg.content), false)
                    .setFooter('Author: ' + msg.author.id + ' | Message: ' + msg.id)

                client.channels.cache.get(result[0].log_channel).send({embed: logEmbed});
            }
        });
        con.release();
    });
};