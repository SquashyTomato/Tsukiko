/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Node Modules
const TinyURL = require('tinyurl');

// Command Module
module.exports = {
    // Command Information
    name: 'google',
    alias: ['lmgtfy'],
    description: 'Let\'s Google That For You',
    category: 'Fun',
    arguments: [ {k: 'Query', p: 'I need something to look up'} ],
    permission: 'ALL',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // Variables
        let search = raw.replace(/ /g, '+');
        let lmgtfy = 'http://lmgtfy.com/?q=' + search;

        // Shorten URL
        try {
            TinyURL.shorten(lmgtfy, function(final) {
                // Send Message
                return msg.channel.send(':mag: | Okay, Let me Google that for you! <' + final + '>');
            });
        } catch {
            // If Cant Reach API
            return msg.channel.send('`Could not google query, is TinyURL down?`');
        }
    }
};