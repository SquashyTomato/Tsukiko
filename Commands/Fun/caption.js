/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Node Modules
const axios = require('axios');

// Command Module
module.exports = {
    // Command Information
    name: 'caption',
    alias: [],
    description: 'I Will Try And Identify An Image',
    category: 'Fun',
    arguments: [ {k: 'URL', p: 'Please enter a URL to an image'} ],
    permission: 'ALL',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // Check If URL
        if (!args[0].startsWith('http')) return msg.channel.send(':negative_squared_cross_mark: | Please enter a URL to an image');

        // API Request
        axios.post('https://captionbot.azurewebsites.net/api/messages', { Type: 'CaptionRequest', 'Content': args[0] })
            .then(function (response) {
                // If No Description
                if (response.data.startsWith('I really can\'t describe the picture')) return msg.channel.send('I really can\'t describe the picture ;-;');
                // Send Description
                msg.channel.send(':thinking: | **' + response.data + '**');
            })
            .catch(function (error) {
                // If Cant Reach API
                msg.channel.send('`Could not get description, is CaptionBot down?`');
            });
    }
};