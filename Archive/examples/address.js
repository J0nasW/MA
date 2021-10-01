// All the packages...
const Iota = require('@iota/core'); // Get IOTA Packages
const { asciiToTrytes } = require('@iota/converter') //IOTA Trytes Conversation
const fsLibrary  = require('fs'); //Load File System Package
const chalk = require('chalk'); // Nice Terminal Output
const moment = require('moment'); //For Timestamp!
const functions = require('./functions'); //Import own functions

// IOTA Variables
const provider = 'https://nodes.comnet.thetangle.org:443' //Using the public DEVNET tangle.
//const provider = 'http:127.0.0.1:14265'; //For private tangles.
const securityLevel = 2 //Defining the security level (see https://docs.iota.org/docs/getting-started/0.1/clients/security-levels)
const minWeight = 9 //Optional minimum number of trailing zeros in transaction hash. This is used by attachToTangle function to search for a valid nonce. Currently is 14 on mainnet & spamnnet and 9 on most other devnets. Null value will set minWeightMagnitude to 9
const TIMEINTERVAL  = 15; // In seconds.

//Connect to a Node in IOTA's DevNet
const iota = Iota.composeAPI({
    provider: provider
    });

//Defining the seed for which to generate an address (has to be 81 characters!)
const seed = functions.random_seed(81);
console.log(chalk.yellow("Your seed is: " + seed));

//Getting the address from IOTA + Console output
iota.getNewAddress(seed, { index: 0, securityLevel: securityLevel, total: 1 })
    .then(address => {
        console.log(chalk.yellow.bold('Your address is: ' + address));
    })
    .catch(err => {
        console.log(err);
});