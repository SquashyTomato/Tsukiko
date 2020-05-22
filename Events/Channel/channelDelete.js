/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Node Modules
const Discord = require('discord.js');
const moment = require('moment');

// Event Module
module.exports = async (client, config, channel) => {
    // Check If DM Channel
    if (channel.type == 'dm') return;

    conn.getConnection(function (err, con) {
        con.query("SELECT * FROM `guilds` WHERE `id` = " + channel.guild.id, function (err, result) {
            if (err) throw err;
            if (!result[0]) return;

            // Check If Channel Logging Is Enabled
            if (!(result[0].log_channel === null || result[0].log_channels === '1')) {
                // Send Log Message
                const logEmbed = new Discord.MessageEmbed()
                    .setAuthor('Channel Deleted', channel.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
                    .setDescription(func.channelName(channel))
                    .setColor(config.general.color)
                    .addField('Deleted At', moment(Date().now).format('MMMM Do YYYY, h:mm:ss A Z'), false)
                    .setFooter('Channel: ' + channel.id)

                client.channels.cache.get(result[0].log_channel).send({embed: logEmbed});
            }
        });
        con.release();
    });
};