/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Command Module
module.exports = {
    // Command Information
    name: 'roll',
    alias: [],
    description: 'Roll A Number Between 1 And 100',
    category: 'Fun',
    arguments: [],
    permission: 'ALL',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // Get Random Number & Send Message
        let roll = Math.floor(Math.random() * Math.floor(100)) + 1;
        return msg.channel.send('<@' + msg.author + '> rolls ' + roll + ' point(s)');
    }
};