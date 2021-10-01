var request = require('request');

const iota = require('@iota/core');

Iota = iota.composeAPI({
    provider: 'http://localhost:14265'
});

var address = iota.generateAddress('SEED99999999999999999999999999999999999999999999999999999999999999999999999999999',0);

getBalance(address);

function getBalance(address) {

    var command = {
    'command': 'getBalances',
    'addresses': [
    address
    ],
    'threshold':100
    }

    var options = {
    url: 'http://localhost:14265',
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1'
    },
    json: command
    };

    request(options, function (error, response, data) {
        if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(data,null,1));
        }
    });
}