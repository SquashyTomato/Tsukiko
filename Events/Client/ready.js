/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Node Modules
const chalk = require ('chalk');

// Event Module
module.exports = (client, config) => {
    // Set Client Presence & Array
    const presenceOne = [config.general.prefix + 'help', {type: 'PLAYING'}];
    const presenceTwo = ['anime', {type: 'WATCHING'}];
    const presenceThree = ['with String.', {type: 'PLAYING'}];
    const presenceFour = ['owo whats this?', {type: 'PLAYING'}];
    const presenceFive = ['owo', {type: 'PLAYING'}];
    const presenceSix = ['with ' + client.users.cache.size + ' weebs.', {type: 'PLAYING'}];
    const presences = [presenceOne, presenceTwo, presenceThree, presenceFour, presenceFive, presenceSix];

    // Begin Presence Loop
    setInterval(() => {
        let p = Math.floor(Math.random() * presences.length);
        client.user.setActivity(...presences[p]);
    }, 30000);
    
    // Console Log
    console.log(chalk.bgYellow('STATUS') + ' ' + client.guilds.cache.size + ' Guilds, ' + client.channels.cache.size + ' Channels, ' + client.users.cache.size + ' Users');
};