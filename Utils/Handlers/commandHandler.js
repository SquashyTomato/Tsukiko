/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Node Modules
const fs = require('fs');

// Module Export
module.exports = (client, config) => {
    // Define Command Directory
    const commandDir = fs.readdirSync('./Commands/');
    // Check Directories In Command Directory
    for (const dir of commandDir) {
        if (fs.statSync('./Commands/' + dir).isDirectory()) {
            const commandGroup = fs.readdirSync('./Commands/' + dir + '/');
            for (const file of commandGroup) {
                // Require Command File
                const command = require('../../Commands/' + dir + '/' + file);
                // Import Into Collections
                client.commands.set(command.name, command);
                if (command.alias.length !== 0) {
                    command.alias.forEach(alias => {
                        client.alias.set(alias, command.name);
                    });
                }
            }
        }
    }
};