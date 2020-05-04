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
    name: 'coronavirus',
    alias: ['covid'],
    description: 'Get Coronavirus Stats',
    category: 'Utility',
    arguments: [],
    permission: 'ALL',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // API Request
        axios.get('https://api.covid19api.com/summary')
		.then(function (response) {
			// Format Response Data
            let data = response.data;

			// Create Embed
			const embed = new Discord.MessageEmbed()
				.setAuthor('COVID-19 Statistics', 'https://s.tomato.sh/COVID-19.jpg')
				.setColor(config.general.color)
				.setThumbnail('https://s.tomato.sh/COVID-19.jpg')
                .addField('Total Confirmed', data.Global.TotalConfirmed, true)
                .addField('Total Deaths', data.Global.TotalDeaths, true)
                .addField('Total Recovered', data.Global.TotalRecovered, true)
                .addField('New Confirmed', data.Global.NewConfirmed, true)
                .addField('New Deaths', data.Global.NewDeaths, true)
                .addField('New Recovered', data.Global.NewRecovered, true)
				.setFooter('covid19api.com')
				.setTimestamp()

			// Send Embed
			return msg.channel.send({embed: embed});
		})
		.catch(function (error) {
			// If Cant Reach API
			return msg.channel.send('`Could not get COVID-19 stats, is the covid19api down?`');
		});
    }
};