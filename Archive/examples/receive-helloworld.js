// Require IOTA Packages
const Iota = require('@iota/core');
const Extract = require('@iota/extract-json');

//Connect to a Node in IOTA's DevNet
const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });

//Defining the tail transaction hash of the bundle, because it is the the signatureMessageFragment of "Hello World!" 
const tailTransactionHash =
    'ZFICKFQXASUESAWLSFFIWHVOAJCSJHJNXMRC9AJSIOTNGNKEWOFLECHPULLJSNRCNJPYNZEC9VGOSV999';

//Getting the bundle from the tail transaction hash and extracting the JSON File
iota.getBundle(tailTransactionHash)
.then(bundle => {
    console.log(JSON.parse(Extract.extractJson(bundle)));
})
.catch(err => {
    console.error(err);
});