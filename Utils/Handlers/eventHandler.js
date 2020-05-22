/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Functions
const e = (cat, event) => require('../../Events/' + cat + '/' + event);

// Module Export
module.exports = (client, config) => {
    // Client Events
    client.on('ready', async () => e('Client', 'ready')(client, config));
    client.on('disconnect', async () => e('Client', 'disconnect')(client, config));
    client.on('reconnecting', async () => e('Client', 'reconnecting')(client, config));
    client.on('message', async (msg) => e('Client', 'message')(client, config, msg));

    // Guild Events
    client.on('guildCreate', async (guild) => e('Guild', 'guildCreate')(client, config, guild));
    client.on('guildDelete', async (guild) => e('Guild', 'guildDelete')(client, config, guild));

    // Guild Member Events
    client.on('guildMemberAdd', async (guildMember) => e('GuildMember', 'guildMemberAdd')(client, config, guildMember));
    client.on('guildMemberRemove', async (guildMember) => e('GuildMember', 'guildMemberRemove')(client, config, guildMember));

    // Message Events
    client.on('messageDelete', async (msg) => e('Message', 'messageDelete')(client, config, msg));
    client.on('messageUpdate', async (oldMsg, newMsg) => e('Message', 'messageUpdate')(client, config, oldMsg, newMsg));

    // Channel Events
    client.on('channelCreate', async (channel) => e('Channel', 'channelCreate')(client, config, channel));
    client.on('channelDelete', async (channel) => e('Channel', 'channelDelete')(client, config, channel));

    // Roles Events
    //client.on('roleCreate', async (role) => e('Role', 'roleCreate')(client, config, role));
    //client.on('roleDelete', async (role) => e('Role', 'roleDelete')(client, config, role));

    // Shoukaku Events
    client.shoukaku.on('ready', async (name) => e('Shoukaku', 'ready')(client, config, name));
    client.shoukaku.on('close', async (name, code, reason) => e('Shoukaku', 'close')(client, config, name, code, reason));
    client.shoukaku.on('disconnected', async (name, reason) => e('Shoukaku', 'disconnected')(client, config, name, reason));
};