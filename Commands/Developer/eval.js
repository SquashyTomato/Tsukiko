/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Command Module
module.exports = {
    // Command Information
    name: 'eval',
    alias: [],
    description: 'Test Some Code',
    category: 'Developer',
    arguments: [ {k: 'Code', p: 'No Code Provided!'} ],
    permission: 'OWNER',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        try {
            // Run Evaluation
            eval(raw);
        } catch (err) {
            // Send Error If Any
            return msg.channel.send('`' + err + '`');
        }
        return;
    }
};