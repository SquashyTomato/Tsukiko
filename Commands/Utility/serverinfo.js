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
    name: 'serverinfo',
    alias: [],
    description: 'Get information about a server',
    category: 'Utility',
    arguments: [],
    permission: 'ALL',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // Variables
        let guild = msg.guild;
        let owner = msg.guild.owner.user;

        // Check If Guild Is Available
        if (!(guild.available)) return;

        // Get Guild Bans
        guild.fetchBans()
            .then(bans => {
                // Create Embed
                const embed = new Discord.MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
                    .setColor(config.general.color)
                    .setThumbnail(guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
                    .addField(':id: Server ID', guild.id, true)
                    .addField(':spy: Owner', owner, true)
                    .addField(':earth_asia: Region', func.titleStr(guild.region), true)
                    .addField(':busts_in_silhouette: Members', guild.members.cache.size, true)
                    .addField(':notebook_with_decorative_cover: Channels', guild.channels.cache.size, true)
                    .addField(':page_facing_up: Roles', guild.roles.cache.size, true)
                    .addField(':smiley: Emotes', guild.emojis.cache.size, true)
                    .addField(':ballot_box_with_check: Status', serverStatus(guild), true)
                    .addField(':rocket: Boost Tier', boostLevel(guild.premiumTier) + ' (' + guild.premiumSubscriptionCount + ' Boosts)', true)
                    .addField(':underage: Filter', contentFilter(guild.explicitContentFilter), true)
                    .addField(':no_entry_sign: Bans', bans.size, true)
                    .addField(':traffic_light: Verification', verificationLevel(guild.verificationLevel), true)
                    .addField(':bed: Created At', moment(guild.createdTimestamp).format('MMMM Do YYYY, h:mm:ss A Z'), true)
                    .setTimestamp()
            // Send Embed
            return msg.channel.send({embed: embed});
        });
    }
};

// Functions
function verificationLevel(level) {
    if (level === 'NONE') return 'None';
    else if (level === 'LOW') return 'Low (Email)';
    else if (level === 'MEDIUM') return 'Medium (5+ Minutes)';
    else if (level === 'HIGH') return 'High (10+ Mins)';
    else if (level === 'VERY_HIGH') return 'Extreme (Verified Phone)';
    else return 'Unknown';
}

function contentFilter(filter) {
    if (filter === 'DISABLED') return 'Off';
    else if (filter === 'MEMBERS_WITHOUT_ROLES') return 'Without Role';
    else if (filter === 'ALL_MEMBERS') return 'All Members';
    else return 'Unknown';
}

function boostLevel(level) {
    if (level === 0) return 'None';
    else if (level === 1) return 'Tier 1';
    else if (level === 2) return 'Tier 2';
    else if (level === 3) return 'Tier 3';
    else return 'Unknown';
}

function serverStatus(guild) {
    if (guild.partnered) return 'Partnered';
    else if (guild.verified) return 'Verified';
    else return 'No Official Status';
}