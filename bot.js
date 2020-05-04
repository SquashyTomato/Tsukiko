/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Strict Mode
'use strict';

// Node Modules
const Discord = require('discord.js');
const { Shoukaku } = require('shoukaku');
const Sentry = require('@sentry/node');
const fs = require('fs');
const mysql = require('mysql');
const chalk = require('chalk');

// JSON Files
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

// Utilities
Sentry.init({ dsn: config.integration.sentry });
const client = new Discord.Client({ autoReconnect: true, disableEveryone: true });
client.shoukaku = new Shoukaku(client, config.lavalink.server, config.lavalink.options);
global.func = require('./Utils/functions.js');
global.db = require('./Utils/Helpers/databaseHelper.js');

// SQL Connection
global.conn = mysql.createPool({ host: config.db.host, port: config.db.port, user: config.db.username, password: config.db.password, database: config.db.database, connectionLimit: config.db.limit, supportBigNumbers: true, bigNumberStrings: true });

// Collections
client.commands = new Discord.Collection();
client.alias = new Discord.Collection();

// Handlers
require('./Utils/Handlers/eventHandler.js')(client, config);
require('./Utils/Handlers/commandHandler.js')(client, config);

// Call Functions
db.heartbeat(30000);

// Client Auth
client.login(config.general.token).catch(err => console.log(chalk.bgRed('ERROR') + ' Unable to log into Discord.'));