// A collection of valuable functions

const moment = require('moment'); //For Timestamp!
const Iota = require('@iota/core'); // Get IOTA Packages

module.exports = {
    random_seed: function (string_length){
        let random_string = '';
        let random_ascii;
        let ascii_low = 65;
        let ascii_high = 90
        for(let i = 0; i < string_length; i++) {
            random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
            random_string += String.fromCharCode(random_ascii)
        }
        return random_string
    };

    newAdress: function (seed, securityLevel) {
        // Generate a new Address from the IOTA Tangle
        const address = iota.getNewAddress(seed, { index: 0, securityLevel: securityLevel, total: 1 });
        return address;
    };

    generateJSON: function() {
        // Generate some random numbers simulating sensor data
        const data = Math.floor((Math.random()*89)+10);
        const dateTime = moment().utc().format('DD/MM/YYYY hh:mm:ss');
        const json = {"data": data, "dateTime": dateTime};
        return json;
    }
}