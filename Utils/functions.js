/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Module Export
module.exports = {
    /* 
     * randomString
     * Generates A Random String
     *
     * @param (int) (length) Length Of Returned String
     * @return (string) Generated String
     */
    randomString(length) {
        var result = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charLength = chars.length;
        for ( var i = 0; i < length; i++ ) {
           result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    },

    /* 
     * titleStr
     * Capitalise A String
     *
     * @param (string) (str) String To Capitalise
     * @return (string) Modified String
     */
    titleStr(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /* 
     * shortenMsg
     * Shorten A Message To Be Under Discord's 2000 Character Limit
     *
     * @param (string) (str) String To Shorten
     * @return (string) Short String
     */
    shortenMsg(str) {
        str = str.toString();
        if (str.length > 500) {
            let s = str.length - 500;
            str = str.substring(0, str.length - s);
            str = str + '...'
        }
        return str;
    }
};