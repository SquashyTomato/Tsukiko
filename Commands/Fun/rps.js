/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Command Module
module.exports = {
    // Command Information
    name: 'rps',
    alias: [],
    description: 'Let\'s Play Rock, Paper, Scissors',
    category: 'Fun',
    arguments: [ {k: 'Choice', p: 'You need to enter Rock, Paper or Scissors'} ],
    permission: 'ALL',
    
    // Command Script
    async execute(client, config, msg, args, raw) {
        // Variables
        var responses = [':full_moon: | **I chose Rock', ':page_facing_up: | **I chose Paper', ':scissors: | **I chose Scissors'];
        let random = Math.floor(Math.random()*responses.length);
        let outcome;

        // Go Through Outcomes
        if (random === 0 && args[0].toLowerCase() == 'rock') outcome = 'It\'s A Tie';
        else if (random === 0 && args[0].toLowerCase() == 'paper') outcome = 'You Win';
        else if (random === 0 && args[0].toLowerCase() == 'scissors') outcome = 'I Win';
        else if (random === 1 && args[0].toLowerCase() == 'rock') outcome = 'I Win';
        else if (random === 1 && args[0].toLowerCase() == 'paper') outcome = 'It\'s A Tie';
        else if (random === 1 && args[0].toLowerCase() == 'scissors') outcome = 'You Win';
        else if (random === 2 && args[0].toLowerCase() == 'rock') outcome = 'You Win';
        else if (random === 2 && args[0].toLowerCase() == 'paper') outcome = 'I Win';
        else if (random === 2 && args[0].toLowerCase() == 'scissors') outcome = 'It\'s A Tie';

        // Send Message
        return msg.channel.send(responses[random] + ', ' + outcome + '**');
    }
};