/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Node Modules
const chalk = require ('chalk');

// Event Module
module.exports = (client, config, msg) => {
    // Command Variables
    let command = msg.content.split(' ')[0];
    command = command.slice(config.general.prefix.length);
    let args = msg.content.split(' ').slice(1);
    let raw = msg.content.split(' ').slice(1).join(' ');

    // User & Channel Checks
    if (msg.author.bot || msg.channel.type == 'dm') return;

    // Message Handlers
    require('./../../Utils/Handlers/levelsHandler.js')(client, config, msg);
    require('./../../Utils/Handlers/triggerHandler.js')(client, config, msg);

    // Check For Prefix
    if (!msg.content.startsWith(config.general.prefix)) return;

    // Execute Command
    try {
        // Check If Command Or Alias Exists
        if (client.commands.has(command)) command = client.commands.get(command);
        else if (client.alias.has(command)) command = client.commands.get(client.alias.get(command));
        else return;

        // Start Database Connection
        conn.getConnection(function (err, con) {
            con.query("SELECT `" + command.category.toLowerCase() + "_" + command.name + "` FROM `guilds_commands` WHERE `id` = " + msg.guild.id, function (err, result) {
                if (result) {
                    let dbVal = command.category.toLowerCase() + "_" + command.name;
                    if (result[0][dbVal] === 0) return;
                }

                // Check Command Permissions
                let hasPermission = false;
                let alertPrompt = false;
                switch (command.permission.toUpperCase()) {
                    case 'OWNER':
                        if (msg.author.id == config.permissions.owner) hasPermission = true;
                        break;
                    case 'SUPPORT':
                        if (msg.author.id == config.permissions.owner) hasPermission = true;
                        else if (config.permissions.support.includes(msg.author.id)) hasPermission = true;
                        break;
                    case 'ALL':
                        hasPermission = true;
                        break;
                    default:
                        if (msg.author.id == config.permissions.owner) hasPermission = true;
                        else if (config.permissions.support.includes(msg.author.id)) hasPermission = true;
                        if (!(hasPermission)) {
                            if (msg.member.hasPermission(command.permission.toUpperCase(), false, false)) hasPermission = true;
                            alertPrompt = true;
                        }
                        break;
                }
                
                if (hasPermission == false) {
                    if (alertPrompt == true) return msg.channel.send(':negative_squared_cross_mark: | You require the `' + command.permission.toUpperCase() + '` permission to do this.').then(m => m.delete({ timeout: 5000 }).catch(console.error));
                    else return;
                }

                // Category Checks
                if (command.category == 'Music' && !(msg.member.voice.channelID)) return msg.channel.send(':negative_squared_cross_mark: | You are not in a voice channel.');
                if (command.category == 'NSFW' && !(msg.channel.nsfw)) return msg.channel.send(':underage: | NSFW Commands can only be ran in an NSFW channel.').then(m => m.delete({ timeout: 5000 }).catch(console.error));
            
                // Check If Command Has Arguments
                if (command.arguments.length > 0) {
                    // Loop Through Arguments
                    let argCount = 0;
                    for (const argu of command.arguments) {
                        if (command.arguments[argCount].p != '') {
                            // Check If Argument Was Entered
                            if (!args[argCount]) return msg.channel.send(':negative_squared_cross_mark: | ' + command.arguments[argCount].p);
                        }
                        argCount++;
                    }
                }
            
                // Execute Command & Log
                command.execute(client, config, msg, args, raw);
                console.log(chalk.bgCyan('LOG') + ' [' + msg.guild.name + '] ' + msg.author.tag + ': ' + msg.content);

                // End Database Connection
                con.release();
            });
        });
    } catch (err) {
        // Catch Error
        if (err.message.startsWith('Cannot find module')) return;
        console.log(chalk.bgRed('ERROR') + ' ' + err);
    }
};