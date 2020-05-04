/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Node Modules
const Discord = require('discord.js');
const moment = require('moment');

// Command Module
module.exports = {
    // Command Information
    name: 'whois',
    alias: [],
    description: 'Get information about a user',
    category: 'Utility',
    arguments: [
        {k: 'User', p: ''}
    ],
    permission: 'ALL',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // Variables
        var user;
        var guildUser;
        var mention = msg.mentions.users.first();
        var tag = client.users.cache.find(value => value.tag === raw);
        var id = client.users.cache.find(value => value.id === raw);

        // Check User
        if (!args.length >= 1) user = msg.author;
        else if (mention) user = mention;
        else if (tag) user = tag;
        else if (id) user = id;
        else return msg.channel.send(':negative_squared_cross_mark: | Invalid user Tag/ID!');

        // Define Targets Guild User
        guildUser = msg.guild.members.cache.get(user.id);

        // Create Embed
        var embed = new Discord.MessageEmbed()
			.setAuthor(user.tag, user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
			.setColor(config.general.color)
            .setThumbnail(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))

            .setDescription(user)
            
            .addField(':id: ID', user.id, true)
            .addField(':pencil2: Nickname', nickname(guildUser), true)
            .addField(':information_source: Status', userStatus(user.presence.status), true)
			.addField(':bed: Account Created', moment(user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss A Z'), false)
			.addField(':door: Join Date', moment(guildUser.createdTimestamp).format('MMMM Do YYYY, h:mm:ss A Z'), false)
			.addField(':page_facing_up: Roles [' + (guildUser.roles.cache.size - 1) + ']', guildUser.roles.cache.map(role => role.name).toString().replace(/,/g, ', '), false)

        // Send Embed
        return msg.channel.send({embed: embed});
    }
};

// Functions
function userStatus(user) {
    if (user == 'online') return 'Online';
    else if (user == 'away') return 'Away';
    else if (user == 'dnd') return 'Do Not Disturb';
    else if (user == 'offline') return 'Offline';
    else return 'Unknown';
}

function nickname(user) {
    if (user.nickname === null || user.nickname == user.username) return 'None';
	else return user.nickname;
}