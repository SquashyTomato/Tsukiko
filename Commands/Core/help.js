/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Command Module
module.exports = {
    // Command Information
    name: 'help',
    alias: [],
    description: 'Displays This Message',
    category: 'Core',
    arguments: [],
    permission: 'ALL',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // Variables
        let { commands } = msg.client;
        let commandList = '# ' + client.user.username + ' Commands\n';
        let currentCat;
        let argCount = 0;
        let argList = '';

        try {
            // Loop For Creating Commands List
            for(let [name, info] of commands) {
                // If Message Is Big, Start A New One
                if (commandList.length > 1900) {
                    msg.author.send('```md\n' + commandList + '```');
                    commandList = '';
                }

                // If New Category, Create New List
                if (!(currentCat) || info.category != currentCat) {
                    currentCat = info.category;
                    commandList = commandList + '\n[' + info.category + ']\n';
                }

                // Check If Command Has Arguments
                if (info.arguments.length > 0) {
                    // Loop Through Arguments
                    for (const argu of info.arguments) {
                        // List Arguments
                        argList = argList + '<' + info.arguments[argCount].k + '> '
                        argCount++;
                    }
                }
                // Add Commands, Args and Description To Each Category
                commandList = commandList + config.general.prefix + name + ' ' + argList + '| ' + info.description + '\n';
                argList = '';
                argCount = 0;
            }
            // Send Final Message
            msg.author.send('```md\n' + commandList + '```');
        } catch {
            // Failed Message
            msg.channel.send(':negative_squared_cross_mark: | I could not DM you the help message, please change your privacy settings and try again!');
        } finally {
            // Confirmation Message
            msg.channel.send(':mailbox_with_mail: | Sent command list to you via DMs!');
        }
        return;
    }
};