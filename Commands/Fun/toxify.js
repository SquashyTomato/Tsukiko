/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Command Module
module.exports = {
    // Command Information
    name: 'toxify',
    alias: ['toxic'],
    description: 'I Will Toxify Your Words',
    category: 'Fun',
    arguments: [ {k: 'Message', p: 'I need something to make toxic'} ],
    permission: 'ALL',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // Alternate Case Loop
        var chars = raw.toLowerCase().split('');
        for (var i = 1; i < chars.length; i += 2) {
            chars[i] = chars[i].toUpperCase();
        }
        let altCase =  chars.join('');

        // Send Message
        await msg.channel.send(altCase);
        return;
    }
};