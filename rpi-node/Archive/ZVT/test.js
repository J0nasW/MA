///////////////////////////////
// Fetch your HELLOWORLD Message
///////////////////////////////

const iotaLibrary = require('@iota/core')
const Converter = require('@iota/converter')

const iota = iotaLibrary.composeAPI({
  provider: 'https://nodes.comnet.thetangle.org:443'
})

var PASSPHRASE = ":FMm-@!cyA2b_>JEQ(aR8pTd}KP9WhJ3PC#%9EP,"; //Passphrase to encrypt the IOTA JSON Message.
var encryptor = require('simple-encryptor')(PASSPHRASE);

const address =
  'HOYXQD9EPEDDKGLVAUMGDJERRYTIZOP9SISE9XGBQEQDEQWKOJMWHVWMXZEMDKDJQEUBOSISZWGZIWFOC'


iota
  .findTransactionObjects({ addresses: [address] })
  .then(response => {
    const msg = response
      .sort(function (a, b) { return b.timestamp - a.timestamp; })
      .map(tx => tx.signatureMessageFragment)
      .join('')
      
    const msg_slice = msg.slice(0,2186);
    console.log(msg_slice)
    var data = Converter.trytesToAscii(msg_slice)
    
    console.log('Encoded message:')
    console.log(data)

    var data_decrypted = encryptor.decrypt(data);
    console.log('Encrypted message:')
    console.log(data_decrypted);

    //Parse JSON
    // preserve newlines, etc - use valid JSON
    data_decrypted = data_decrypted.replace(/\\n/g, "\\n")  
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
    // remove non-printable and other non-valid JSON chars
    data_decrypted = data_decrypted.replace(/[\u0000-\u0019]+/g,""); 
    var payload = JSON.parse(data_decrypted);


    //var payload = JSON.parse(data);
    console.log(payload.Temperature)
    console.log(payload.Humidity)
    console.log(payload.dateTime)

  })
  .catch(err => {
    console.error(err)
  })
  