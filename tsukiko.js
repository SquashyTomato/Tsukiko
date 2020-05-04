/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Strict Mode
'use strict';

// Node Modules
const { ShardingManager } = require('discord.js');
const Sentry = require('@sentry/node');
const fs = require('fs');
const mysql = require('mysql');
const chalk = require('chalk');

// JSON Files
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

// Utilities
Sentry.init({ dsn: config.integration.sentry });
const shardManager = new ShardingManager('./bot.js', { token: config.general.token, autoSpawn: true });

// SQL Connection
global.conn = mysql.createPool({ host: config.db.host, port: config.db.port, user: config.db.username, password: config.db.password, database: config.db.database, connectionLimit: config.db.limit, supportBigNumbers: true, bigNumberStrings: true });

// Console Out
console.log(chalk.gray('----------------------'));
console.log(chalk.cyan('Tsukiko v' + pkg.version));
console.log(chalk.red('By ' + pkg.author));
console.log(chalk.gray('----------------------'));

// Database Connection
conn.getConnection(function (err, con) {
    if (err) throw err;
    console.log(chalk.bgGreen('SUCCESS') + ' Connected to Database');
    con.release();
});
console.log(chalk.bgYellow('NOTICE') + ' Spawning Shards...');

// Spawn Shards
shardManager.spawn();

// Launch Event
shardManager.on('shardCreate', (shard) => {
    console.log(chalk.gray('----------------------'));
    console.log(chalk.bgMagenta('SHARD') + ' Launched Shard ' + shard.id);
});