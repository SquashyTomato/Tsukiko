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
        // Remove Information From Tables
        con.query("DELETE FROM `guilds` WHERE `id` = " + guild.id, function (err, result) { if (err) throw err });
        con.query("DELETE FROM `guilds_automod` WHERE `id` = " + guild.id, function (err, result) { if (err) throw err });
        con.query("DELETE FROM `guilds_commands` WHERE `id` = " + guild.id, function (err, result) { if (err) throw err });
        con.query("DELETE FROM `levels` WHERE `guild` = " + guild.id, function (err, result) { if (err) throw err });
        con.query("DELETE FROM `levels_roles` WHERE `guild` = " + guild.id, function (err, result) { if (err) throw err });
        con.query("DELETE FROM `punishments` WHERE `guild` = " + guild.id, function (err, result) { if (err) throw err });
        // End Database Connection
        console.log(chalk.bgCyan('LOG') + ' [Guild Leave] ' + guild.name);
        con.release();
    });
};