const { ClientBuilder } = require('@iota/client')

// Encryption
var keygen = require("keygenerator");
var PASSPHRASE = keygen._(); //Passphrase to encrypt the IOTA JSON Message.
var CryptoAES = require('crypto-js/aes');

// Web Server Packages
var http = require('http');

// Other Packages
// const fsLibrary  = require('fs'); //Load File System Package
const chalk = require('chalk'); // Nice Terminal Output
const moment = require('moment'); //For Timestamp!

const TIMEINTERVAL  = 15; // In seconds.
const provider = 'https://chrysalis-nodes.iota.org' // IOTA MAINNET
const topic = "blockchain_explorer_test";
let messageID = 0;
let json = 0;

// DHT11 Packages
// var sensor = require("node-dht-sensor");

// Reading the DHT11 Sensor Results
// const DHTData = function() {
//     var sensorResult = sensor.read(11, 4); // GPIO PIN 4
//     return sensorResult; // Containing Temp. and Hum.
// }

// const parser = port.pipe(new SerialPortParser());
// const Request = require("request-promise");

// NEO 6M GPS Packages
// const SerialPort = require("serialport");
// const SerialPortParser = require("@serialport/parser-readline");
// const GPS = require("gps");
// const port = new SerialPort("/dev/ttyS0", { baudRate: 9600 });
// const gps = new GPS();

// Reading GPS Position
// const GPSData = async packet => {
//     gps.on("data", data => {
//         if(data.type == "GGA" || data.type == "RMC") {
//             if(data.quality != null || data.status == "active") {
//                 console.log(data.lat + "," + data.lon);
//             } else {
//                 console.log("no gps fix available");
//             }
//         }
//     });
//     return data;
// }

// Creates a JSON-formatted Dataset with random numbers (later Sensor Data) and a timestamp.
const generateJSON = function() {
    // Generate some random numbers simulating sensor data

    // var sensorResult = DHTData();
    // const temperature = sensorResult.temperature.toFixed(1);
    // const humidity = sensorResult.humidity.toFixed(1);
    // const sensorResult = "LogU_Result";
    // const temperature = "22";
    // const humidity = "96";
    // const dateTime = moment().utc().format('DD/MM/YYYY hh:mm:ss');
    // const timezone = "UTC";
    // const Latitude = "53.529444";
    // const Longitude = "9.921735";
    // const container = "MWBNB564534884a";
    // const booking_nr = "35646794533";
    // const departure = "HAM";
    // const departure_time = "2021-09-14, 08:33:47";
    // const arrival = "ROT";
    // const arrival_time = "2021-09-18, 18:00:54";
    // const content = "Blattsalat";
    // const freeze = "yes";
    // const status_dht_11 = "No Error";
    // const status_rpi = "No Error";
    // const status_gps = "No Error";
    // var json = {"Temperature": temperature, "Humidity": humidity, "dateTime": dateTime, "lat":lat, "lon":lon, "container": container, "booking_nr": booking_nr, "departure": departure, "arrival": arrival, "content": content, "freeze": freeze};
    
    const min_temp = 8;
    const max_temp = 12;
    const min_hum = 60;
    const max_hum = 67;
    const min_lat = 53.45;
    const max_lat = 53.47;
    const min_lon = 9.92;
    const max_lon = 9.98;

    // var sensorResult = DHTData();
    // var GPSResult = GPSData();

    json = {
        sensorResult: "LogU_Result",
        temperature: min_temp + Math.random() * (max_temp - min_temp),
        humidity: min_hum + Math.random() * (max_hum - min_hum),
        // temperature: sensorResult.temperature.toFixed(1);
        // humidity: sensorResult.humidity.toFixed(1);
        timezone: "UTC",
        dateTime: moment().utc().format('DD/MM/YYYY hh:mm:ss'),
        container: "MWBNB564534884a",
        departure: "HAM",
        departure_time: "2021-09-14, 08:33:47",
        arrival: "ROT",
        arrival_time: "2021-09-18, 18:00:54",
        content: "Lettuce",
        content_specifics: "freeze",
        Latitude: min_lat + Math.random() * (max_lat - min_lat),
        Longitude: min_lon + Math.random() * (max_lon - min_lon),
        // Latitude: GPSResult.lat,
        // Longitude: GPSResult.lon,
        status_dht_11: "No Error",
        status_rpi: "No Error",
        status_gps: "No Error",
      }
    
    var encrypted_json = CryptoAES.encrypt(JSON.stringify(json), PASSPHRASE).toString();
    console.log(encrypted_json);
    return encrypted_json;
}

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
//----------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------

// Configuring the HTTP server
var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("LogU IOTA Supply Chain Node #1\n\n");
    response.write("The current Time Interval for publishing transactions is: " + TIMEINTERVAL + " seconds.\n");
    response.write("JSON Contents (decrpyted): " + JSON.stringify(json) + "\n\n");
    response.write("The used address is: " + topic + "\n\n");
    response.write("The used Passphrase is: " + PASSPHRASE + "\n\n");
    response.write("Go to the IOTA Tangle Explorer: https://explorer.iota.org/mainnet/indexed/" + messageID);
    response.end();
  });
  server.listen(8000);
  console.log("Server is running at http://127.0.0.1:8000/");

// Publish to tangle
const publish = async packet => {
    // Define a message to send. This message must include only ASCII characters, therefore, JSON Objects are stringified.
    const json = generateJSON(); // Get a current JSON Message
    console.log(chalk.white("Your encrypted JSON is: " + json)); // Output the current JSON Message on the console
    const client = new ClientBuilder()
        .node(provider) // Connect to the IOTA Mainnet or Devnet (depends on the provider defined above)
        .build() // Build the client and connect to IOTA
    const message = await client.message()
        .index(topic)
        .data(json)
        .submit(); // Submit the JSON as ZVT on the IOTA Tangle
    messageID = message.messageId;
    console.log(messageID);
}

setInterval(publish, TIMEINTERVAL*1000);