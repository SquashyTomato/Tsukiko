/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Command Module
module.exports = {
    // Command Information
    name: 'say',
    alias: ['simonsays'],
    description: 'I Will Repeat After You',
    category: 'Fun',
    arguments: [ {k: 'Message', p: 'I need something to repeat'} ],
    permission: 'MANAGE_CHANNELS',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // Send Message
        msg.delete({ timeout: 0 }).catch(console.error);
        return msg.channel.send(raw);
    }
};