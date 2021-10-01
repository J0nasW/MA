// Initialize the required packages
var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;
// Initialize new instances
var crypt = new Crypt({ md: 'sha512' });
var rsa = new RSA();
// Store RSA Keypair into variables - NOT SECURE AND WILL BE CHANGED IN THE FUTURE!!!
// Generate keys

rsa.generateKeyPairAsync().then(
    keyPair => {
        var publicKey = keyPair.publicKey;
        var privateKey = keyPair.privateKey;
        console.log(publicKey);
        console.log(privateKey);
    }).catch(err => {
    console.log(err)
});

const log = function() {
    console.log(publicKey);
    console.log(privateKey);
}


setInterval(log, 1000);