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
    name: 'rule34',
    alias: ['r34'],
    description: 'Get An Image From Rule34',
    category: 'NSFW',
    arguments: [ {k: 'Tag', p: 'You did not specify a tag'} ],
    permission: 'ALL',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        if (args.length > 6) return msg.channel.send(':negative_squared_cross_mark: | You may enter up to 6 tags');

        // API Request
        axios.get('http://rule34.xxx', { params: { page: 'dapi', s: 'post', q: 'index', tags: raw, limit: 100, json: 1 } })
		    .then(function (response) {
			    // Format Response Data
                let data = response.data;
            
                if (data.length === 0) return msg.channel.send(':negative_squared_cross_mark: | No Results Found');

                for (var i = data.length - 1; i >= 0; i--){
                    let tags = data[i].tags.split(' ');
                    if (tags.includes('cub') || tags.includes('shota') || tags.includes('loli') || tags.includes('young')) {
                        data.splice(i, 1);
                    }
                }

                if (data.length === 0) return msg.channel.send(':negative_squared_cross_mark: | No Results Found');
            
                let random = Math.floor(Math.random() * data.length);

                return msg.channel.send('http://img.rule34.xxx/images/' + data[random].directory + '/' + data[random].image);
		    })
		    .catch(function (error) {
			    // If Cant Reach API
			    msg.channel.send('`Could not get image, is rule34.xxx down?`');
		    });
    }
};