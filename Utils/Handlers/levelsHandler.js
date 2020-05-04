/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Module Export
module.exports = (client, config, msg) => {

	// Variables
    let currentTime = Math.floor(new Date() / 1000);
    let xpValue = Math.floor(Math.random() * (25 - 15 + 1) + 15);

    // Start Database Connection
    conn.getConnection(function (err, con) {
        // Check If XP Is Enabled
        con.query("SELECT * FROM `guilds` WHERE `id` = " + msg.guild.id, function (err, result) {
            if (result[0].levels === 1) {
                // Check If User Is In Database
                con.query("SELECT * FROM `levels` WHERE `server` = " + msg.guild.id + " AND `user` = " + msg.author.id, function (err, levelResult) {
                    if (err) throw err;
                    // Add User If They Don't Exist
                    if (levelResult.length < 1) {
                        con.query("INSERT INTO `levels` (`server`, `user`, `level`, `xp`, `time_last`) VALUES (" + msg.guild.id + ", " + msg.author.id + ", 0, " + parseInt(xpValue) + ", " + parseInt(currentTime) + ")", function (err, result) { if (err) throw err });
                    // Check Existing Users Values
                    } else {
                        // If 2 Minutes Have Passed Since Last Level Up
                        if (parseInt(currentTime) > parseInt(levelResult[0].time_last + 120)) {
                            // Get New XP Values
                            let xpNew =  levelResult[0].xp + xpValue;
                            let msgNew = levelResult[0].message_count + 1;
                            let lvl = parseInt(levelResult[0].level);
                            let xpCalculation = Math.round(5 / 6 * (lvl + 1) * (2 * (lvl + 1) * (lvl + 1) + 27 * (lvl + 1) + 91));
    
                            // If User Has Leveled Up
                            if (xpNew >= xpCalculation) {
                                lvl = lvl + 1;
                                let rec;

                                // Check If Level Up Messages For The Guild Are DM Only
                                if (result[0].levels_dm === 1) rec = msg.author;
                                else rec = msg.channel;

                                // Send Level Up Message
                                rec.send('Hey <@' + msg.author + '>, you are now Level **' + lvl + '**');
                            }
                            // Update XP Values
                            con.query("UPDATE `levels` SET `level` = " + lvl + ", `xp` = " + parseInt(xpNew) + ", `message_count` = " + parseInt(msgNew) + ", `time_last` = " + parseInt(currentTime) + " WHERE `server` = " + msg.guild.id + " AND `user` = " + msg.author.id, function (err, result) { if (err) throw err });
                        }
                    }
                });
            }
        });
        // End Database Connection
        con.release();
    });
}