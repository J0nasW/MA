///////////////////////////////
// Fetch your HELLOWORLD Message
///////////////////////////////

const iotaLibrary = require('@iota/core')
const Converter = require('@iota/converter')

const iota = iotaLibrary.composeAPI({
  provider: 'https://nodes.comnet.thetangle.org:443'
})

const address =
  'XSWFSZFGBNKLSJYVVSASFGVPRWIK9HY9ISQBTABPIWSBVDQRGZEZITFQOW9UZBZPJLCOAJOGSEBXCJCIC'

iota
  .findTransactionObjects({ addresses: [address] })
  .then(response => {
      msg = response
      .sort(function (a, b) { return b.timestamp - a.timestamp; })

    console.log('Encoded message:')
    console.log(msg)

    //Convert trytes to plan text
    //const data = Converter.trytesToAscii(msg)
    //console.log('Decoded message:')
    //console.log(data)
  })
  .catch(err => {
    console.error(err)
  })