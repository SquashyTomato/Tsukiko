/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Command Module
module.exports = {
    // Command Information
    name: 'ping',
    alias: [],
    description: 'Pong',
    category: 'Core',
    arguments: [],
    permission: 'OWNER',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // Send Ping Message
        return msg.channel.send(':ping_pong: | Pong! `' + client.ws.ping + 'ms`');
    }
};