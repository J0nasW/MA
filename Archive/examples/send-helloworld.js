// Require IOTA Packages
const Iota = require('@iota/core');
const Converter = require('@iota/converter');

//Connect to a Node in IOTA's DevNet
const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });

//Defining the depth and minimum magnitude
const depth = 3;
const minimumWeightMagnitude = 9;

//Defining the Senders ADRESS (Must be 81 characters)
const address =
'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';

//Defining a SEED (is not used here (bc of zero-value transaction) but has to be valid (81 characters))
const seed =
'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

//Creating the Hello World Message - In JSON
const message = JSON.stringify({"message": "Hello world"});
const messageInTrytes = Converter.asciiToTrytes(message); //Message is converted to Trytes for the Tangle

//Defining the zero-value transaction
const transfers = [
    {
        value: 0,
        address: address,
        message: messageInTrytes
    }
    ];

//Creating a bundle and sending it to the DevNet
iota.prepareTransfers(seed, transfers)
    .then(trytes => {
        return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
    })
    .then(bundle => {
        console.log(bundle[0].hash)
    })
    .catch(err => {
        console.error(err)
    });