/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                     Tsukiko, The Multipurpose Discord Bot                     *
 *  Copyright (c) SquashyTomato <me@tomato.sh>. Licensed under the MIT Licence.  *
 *       See the LICENCE file in the repository root for the licence text.       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Node Modules
const chalk = require ('chalk');

// Event Module
module.exports = async (client, config, name, reason) => {
    // Console Log
    console.log(chalk.bgBlue('SHOUKAKU') + ' Disconnected from Node ' + name + ' for ' + reason);
};