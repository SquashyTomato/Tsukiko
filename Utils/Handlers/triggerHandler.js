/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Module Export
module.exports = (client, config, msg) => {

	// Start Database Connection
    conn.getConnection(function (err, con) {
        // Check If Triggers Are Enabled
        con.query("SELECT * FROM `guilds` WHERE `id` = " + msg.guild.id, function (err, result) {
            if (result[0].triggers === 1) {
                // Triggers List
                const triggers = [
                    {trigger: 'owo', response: 'What\'s this?'},
                    {trigger: 'tsukiko broken', response: 'Blame Tomato >:c'},
                    {trigger: 'you can tune a piano', response: 'But you can\'t tuna fish!'},
                    {trigger: 'brain power', response: '**O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo AAE-O-A-A-U-U-A- E-eee-ee-eee AAAAE-A-E-I-E-A- JO-ooo-oo-oo-oo EEEEO-A-AAA-AAAA**'},
                ];

                // Check If Trigger
                let triggercount = 0;
                for (const loop of triggers) {
                    if (msg.content.toLowerCase().startsWith(triggers[triggercount].trigger)) {
                        msg.channel.send(triggers[triggercount].response);
                        return;
                    } else {
                        triggercount++;
                    }
                }
            }
        });
        // End Database Connection
        con.release();
    });
}