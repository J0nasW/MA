/////////////////////////////////////////////
// This is a simple IOTA Implementation of sending Zero Value Transactions to the Tangle containing some information.
/////////////////////////////////////////////

// IOTA Packages
const Iota = require('@iota/core'); // Get IOTA Packages
const Converter = require('@iota/converter'); // Get IOTA Converter
const { asciiToTrytes } = require('@iota/converter') //IOTA Trytes Conversation

// Web Server Packages
var http = require('http');

// DHT11 Packages
var sensor = require("node-dht-sensor");

// Encryption
var keygen = require("keygenerator");
var PASSPHRASE = keygen._(); //Passphrase to encrypt the IOTA JSON Message.
var CryptoAES = require('crypto-js/aes');

// Other Packages
const fsLibrary  = require('fs'); //Load File System Package
const chalk = require('chalk'); // Nice Terminal Output
const moment = require('moment'); //For Timestamp!

// IOTA Variables
const provider = 'https://nodes.comnet.thetangle.org:443' //Using the public DEVNET tangle.
//const provider = 'http:127.0.0.1:14265'; //For private tangles.
const depth = 3 //Defining the security level (see https://docs.iota.org/docs/getting-started/0.1/clients/security-levels)
const securityLevel = 2 //Defining the security level (see https://docs.iota.org/docs/getting-started/0.1/clients/security-levels)
const minWeight = 10 //Optional minimum number of trailing zeros in transaction hash. This is used by attachToTangle function to search for a valid nonce. Currently is 14 on mainnet & spamnnet and 9 on most other devnets. Null value will set minWeightMagnitude to 9
const TIMEINTERVAL  = 30; // In seconds.

//----------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS -----------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------,

// Creates a new, random Seed for the initial Address of the sender.
const random_seed = function (string_length){
    let random_string = '';
    let random_ascii;
    let ascii_low = 65;
    let ascii_high = 90
    for(let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
        random_string += String.fromCharCode(random_ascii)
    }
    return random_string
}

// Takes the generated Seed and requests a new Address from the IOTA Tangle
const newAdress = function (addseed, addsecurityLevel) {
    // Generate a new Address from the IOTA Tangle
    iota.getNewAddress(addseed, { index: 0, securityLevel: addsecurityLevel, total: 1 })
    .then(address => {
        console.log('Your address is: ' + address);
        return String(address);
    })
    .catch(err => {
        console.log(err)
    });
}

// Reading the DHT11 Sensor Results
const DHTData = function() {
  var sensorResult = sensor.read(11, 4);
  return sensorResult;
}

// Creates a JSON-formatted Dataset with random numbers (later Sensor Data) and a timestamp.
const generateJSON = function() {
    // Generate some random numbers simulating sensor data
    var sensorResult = DHTData();
    const temperature = sensorResult.temperature.toFixed(1);
    const humidity = sensorResult.humidity.toFixed(1);
    const dateTime = moment().utc().format('DD/MM/YYYY hh:mm:ss');
    const container = "MWBNB564534884a";
    const booking_nr = "35646794533";
    const departure = "HAM";
    const arrival = "ROT";
    const content = "Blattsalat";
    const freeze = "ja";
    var json = {"Temperature": temperature, "Humidity": humidity, "dateTime": dateTime, "container": container, "booking_nr": booking_nr, "departure": departure, "arrival": arrival, "content": content, "freeze": freeze};
    var encrypted_json = CryptoAES.encrypt(JSON.stringify(json), PASSPHRASE).toString();
    console.log(encrypted_json);
    return encrypted_json;
}

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
//----------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------

// Connect to a IOTA node
const iota = Iota.composeAPI({
  provider: provider
});

// Define a seed and an address.
// These do not need to belong to anyone or have IOTA tokens.
// They must only contain a mamximum of 81 trytes
// or 90 trytes with a valid checksum

//Defining the seed for which to generate an address (has to be 81 characters!)
const seed = random_seed(81);
//const seed = 'JMAJVBLNFPGCXCTSEVENEYWFWTTGFWXMPNHKSSVJLXXRETXTFLPUHEQEYIIFHIFEDYTAPNREOHPHYDVBW';
console.log(chalk.yellow("Your Seed is: " + seed));

//Getting the address
//const address = newAdress(seed, securityLevel);
//const address = 'RLJMDVCJRFXKFMDJBWUJBYCLDF9PDU9OKRTBSBBTGIGTLWVBLNJFVBODPXUAPFQFSNGBFPPCKVNJGZCZC';
let IOTAaddress = 0;
iota.getNewAddress(seed, { index: 0, securityLevel: securityLevel, total: 1 })
    .then(address => {
        IOTAaddress= String(address);
        console.log(chalk.yellow.bold("Your Address is: " + IOTAaddress));
    })
    .catch(err => {
        console.log(err)
    });
  


// Configuring the HTTP server
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("LogU IOTA Supply Chain Node #1\n\n");
  response.write("The current Time Interval for publishing transactions is: " + TIMEINTERVAL + " seconds.\n");
  response.write("The used seed is: " + seed + "\n");
  response.write("The used address is: " + IOTAaddress + "\n\n");
  response.write("The used Passphrase is: " + PASSPHRASE + "\n\n");
  response.write("Go to the COMNET Explorer: https://comnet.thetangle.org/address/" + IOTAaddress);
  response.end();
});
server.listen(8000);
console.log("Server is running at http://127.0.0.1:8000/");
        

// Publish to tangle
const publish = async packet => {
  // Define a message to send.
  // This message must include only ASCII characters.
  const json = generateJSON(); // Get a JSON Message
  //const json = JSON.stringify({"message": "Hello world"});
  const messageInTrytes = Converter.asciiToTrytes(json); // Convert the message to trytes
  console.log(chalk.white("Your JSON is: " + json));

  // Define a zero-value transaction object
  // that sends the message to the address
  const transfers = [
    {
      value: 0,
      address: IOTAaddress,
      message: messageInTrytes
    }
  ];

  // Create a bundle from the `transfers` array
  // and send the transaction to the node
  iota
  .prepareTransfers(seed, transfers)
  .then(trytes => {
    return iota.sendTrytes(trytes, depth, minWeight);
  })
  .then(bundle => {
    console.log(chalk.yellow.bold("The Tail-Hash is: " + bundle[0].hash));
  })
  .catch(err => {
    console.error(err)
  });
}

setInterval(publish, TIMEINTERVAL*1000);
