/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Node Modules
const chalk = require ('chalk');

// Event Module
module.exports = async (client, config, guild) => {
    conn.getConnection(function (err, con) {
        // Add Information To Tables
        con.query("INSERT INTO `guilds` (`id`) VALUES (" + guild.id + ")", function (err, result) { if (err) throw err });
        con.query("INSERT INTO `guilds_automod` (`id`) VALUES (" + guild.id + ")", function (err, result) { if (err) throw err });
        con.query("INSERT INTO `guilds_commands` (`id`) VALUES (" + guild.id + ")", function (err, result) { if (err) throw err });
        // End Database Connection
        console.log(chalk.bgCyan('LOG') + ' [Guild Join] ' + guild.name);
        con.release();
    });
};