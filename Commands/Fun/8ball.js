/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Command Module
module.exports = {
    // Command Information
    name: '8ball',
    alias: [],
    description: 'I Will Give You An Outcome',
    category: 'Fun',
    arguments: [ {k: 'Question', p: 'Enter a question and I shall answer it'} ],
    permission: 'ALL',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // Variables
        let responses = ['It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes definitely.', 'You may rely on it.', 'As I see it, yes.', 'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.', 'Reply hazy try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.', 'Don\'t count on it.', 'My reply is no.', 'My sources say no.', 'Outlook not so good.', 'Very doubtful.'];
        let random = Math.floor(Math.random() * responses.length);

        // Send Message
        return msg.channel.send(':8ball: | **' + responses[random] + '**');
    }
};