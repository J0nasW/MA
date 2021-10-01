/*
A Script by Jonas Wilinski working @ LogU TUHH.

It just publishes random data onto the IOTA Devnet Tangle. Nothing more - just for testing purposes.

*/

const Mam = require('@iota/mam')
const IOTA = require('@iota/core');
const { asciiToTrytes } = require('@iota/converter')
const moment = require('moment');


const mode = 'restricted'; // public, private or restricted
const secretKey = 'mysecret'; // Enter only ASCII characters. Used only in restricted mode
const provider = 'https://nodes.devnet.iota.org:443';
//const provider = 'http:127.0.0.1:14265';

const TIMEINTERVAL  = 30; // seconds

// Initialise MAM State
let mamState = Mam.init(provider);

// Set channel mode
if (mode == 'restricted') {
    mamState = Mam.changeMode(mamState, mode, secretKey);
} else {
    mamState = Mam.changeMode(mamState, mode);
}

// Publish data to the tangle
const publish = async packet => {
    // Create MAM Payload - A STRING OF TRYTES
    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)

    // Save new mamState
    mamState = message.state;

    // Attach the payload.
    await Mam.attach(message.payload, message.address, 3, 9);
    console.log('Sent message to the Tangle!');
    console.log('Root: ', message.root);
    //console.log('Address: ', message.address);

    console.log('Published', packet, '\n');
    return message.root;
}

const generateJSON = function() {
    // Generate some random numbers simulating sensor data
    const data = Math.floor((Math.random()*89)+10);
    const dateTime = moment().utc().format('DD/MM/YYYY hh:mm:ss');
    const json = {"data": data, "dateTime": dateTime};
    return json;
}

const executeDataPublishing = async function() {
    const json = generateJSON();
    console.log("json=",json);

    const root = await publish(json);
    console.log(`dateTime: ${json.dateTime}, data: ${json.data}, root: ${root}`);
}

// Start it immediately
executeDataPublishing();

setInterval(executeDataPublishing, TIMEINTERVAL*1000);
