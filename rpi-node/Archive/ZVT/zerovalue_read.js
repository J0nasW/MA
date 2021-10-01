/////////////////////////////////////////////
// This is a simple IOTA Implementation of sending Zero Value Transactions to the Tangle containing some information.
/////////////////////////////////////////////

//Packages
const Iota = require('@iota/core'); // Get IOTA Packages
const Extract = require('@iota/extract-json'); // To get JSON Things
const Converter = require('@iota/converter'); // Get IOTA Converter
const { asciiToTrytes } = require('@iota/converter') //IOTA Trytes Conversation
const fsLibrary  = require('fs'); //Load File System Package
const chalk = require('chalk'); // Nice Terminal Output
const moment = require('moment'); //For Timestamp!

// IOTA Variables
const provider = 'https://nodes.devnet.iota.org:443' //Using the public DEVNET tangle.
//const provider = 'http:127.0.0.1:14265'; //For private tangles.
const depth = 3 //Defining the security level (see https://docs.iota.org/docs/getting-started/0.1/clients/security-levels)
const securityLevel = 2 //Defining the security level (see https://docs.iota.org/docs/getting-started/0.1/clients/security-levels)
const minWeight = 9 //Optional minimum number of trailing zeros in transaction hash. This is used by attachToTangle function to search for a valid nonce. Currently is 14 on mainnet & spamnnet and 9 on most other devnets. Null value will set minWeightMagnitude to 9
const TIMEINTERVAL  = 15; // In seconds.

//----------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS -----------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------

// Nothing here yet

//----------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------



// Connect to a node
const iota = Iota.composeAPI({
  provider: provider
});

// Define the tail transaction hash of the bundle
const tailTransactionHash =
'RLFYHDUICQFH9IAQDGGCDZJNV9HXWEVXSZK9REL9SSPOQHHUJNZJ9ARURULEAHEPIGSIUWZDLRUGNF999';
console.log(chalk.yellow("Your tailTransactionHash is: " + tailTransactionHash));


// Get the bundle
iota.getBundle(tailTransactionHash)
.then(bundle => {
    console.log(JSON.parse(Extract.extractJson(bundle)));
})
.catch(err => {
    console.error(err);
});



