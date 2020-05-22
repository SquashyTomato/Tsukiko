/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Node Modules
const Discord = require('discord.js');
const axios = require('axios');

// Command Module
module.exports = {
    // Command Information
    name: 'urban',
    alias: ['ud'],
    description: 'Get Definitions From Urban Dictionary',
    category: 'Fun',
    arguments: [ {k: 'Word', p: 'Enter a word to look up'} ],
    permission: 'ALL',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // API Request
        axios.get('http://api.urbandictionary.com/v0/define', { params: { term: raw } })
            .then(function (response) {
                // Format Response Data
                let define = response.data;
            
                // Create Embed
                const embed = new Discord.MessageEmbed()
                    .setColor(config.general.color)
                    .addField('Word', define.list[0].word, false)
                    .addField('Definition', define.list[0].definition, false)
                    .addField('Rating', ':thumbsup: ' + define.list[0].thumbs_up + ' | :thumbsdown: ' + define.list[0].thumbs_down, false)
                    .setFooter('Written On ' + define.list[0].written_on)

                // Send Embed
                return msg.channel.send({embed: embed});
            })
            .catch(function (error) {
                // If Cant Reach API
                return msg.channel.send(':negative_squared_cross_mark: | Word could not be defined!');
            });
    }
};