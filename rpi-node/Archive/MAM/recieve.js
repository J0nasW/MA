/*
A Script by Jonas Wilinski working @ LogU TUHH.

It just recieves data from the IOTA Devnet Tangle. Nothing more - just for testing purposes.

*/

const Mam = require('@iota/mam')
const IOTA = require('@iota/core');
const { asciiToTrytes } = require('@iota/converter')


const mode = 'public'; // public, private or restricted
const secretKey = 'mysecret'; // Enter only ASCII characters. Used only in restricted mode
const provider = 'https://nodes.devnet.iota.org:443';
//const provider = 'http:127.0.0.1:14265';

let root;
let key;

// Check the arguments
const args = process.argv;
if(args.length !=3) {
    console.log('Missing root as argument: node x.js <root>');
    process.exit();
}
/*
else if(!IOTA.valid.isAddress(args[2])){
    console.log('You have entered an invalid root: '+ args[2]);
    process.exit();
} else {
    root = args[2];
}
*/

// Initialise MAM State
let mamState = Mam.init(provider);

// Set channel mode
if (mode == 'restricted') {
    mamState = Mam.changeMode(mamState, mode, secretKey);
} else {
    mamState = Mam.changeMode(mamState, mode);
}

// Receive data from the tangle
const executeDataRetrieval = async function(rootVal, keyVal) {
    let resp = await Mam.fetch(rootVal, mode, keyVal, function(data) {
        let json = JSON.parse(trytesToAscii(data));
        console.log(`dateTime: ${json.dateTime}, data: ${json.data}`);
    });

    executeDataRetrieval(resp.nextRoot, keyVal);
}

executeDataRetrieval(root, secretKey);