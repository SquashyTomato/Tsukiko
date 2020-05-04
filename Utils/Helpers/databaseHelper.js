/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Module Export
module.exports = {
    /* 
     * heartbeat
     * Ping The Database To Maintain An Open Connection
     *
     * @param (int) (interval) Interval Of Each Heartbeat In Milliseconds
     */
    heartbeat(interval) {
        setInterval(function () {
            conn.getConnection(function (err, con) {
                if (err) throw err;
                con.query('SELECT 1');
                con.release();
            });
        }, interval);
    }
}