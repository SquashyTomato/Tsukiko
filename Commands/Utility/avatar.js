/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Command Module
module.exports = {
    // Command Information
    name: 'avatar',
    alias: [],
    description: 'Get someone\'s avatar',
    category: 'Utility',
    arguments: [
        {k: 'User', p: ''}
    ],
    permission: 'ALL',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // Variables
        let user;
        let mention = msg.mentions.users.first();
        let tag = client.users.cache.find(value => value.tag === raw);
        let id = client.users.cache.find(value => value.id === raw);

        // Check User Type
        if (mention) user = mention;
        else if (tag) user = tag;
        else if (id) user = id;
        else user = msg.author;

        // Send Message
        return msg.channel.send(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
    }
};