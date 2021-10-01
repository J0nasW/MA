/*
A Script by Jonas Wilinski working @ LogU TUHH.

It just recieves data from the IOTA Devnet Tangle. Nothing more - just for testing purposes.

*/

const Mam = require('@iota/mam')
const { trytesToAscii } = require('@iota/converter')
const provider = 'https://nodes.devnet.iota.org:443'; //Using the public tangle.
//const provider = 'http:127.0.0.1:14265'; //For private tangles.
const mamType = 'restricted' //Choose between public, private or restricted - NOTE: When using restricted, provide a Secret Key!
const mamSecret = 'VERYSECRETKEY' //Secret Key for restricted MAM usage.
const TIMEINTERVAL  = 10; // In seconds.

var readlineSync = require('readline-sync');
const chalk = require('chalk')

var root = readlineSync.question('Please input root of msg tree: ')

// Initialize MAM State - PUBLIC
var mamState = Mam.init(provider)

// Callback used to pass data out of the fetch
const logData = data => console.log(trytesToAscii(data))

// Main Function
const execute = async () => {
  // Callback used to pass data + returns next_root
  const resp = await Mam.fetch(root, mamType, mamSecret, logData)
  console.log(chalk.yellow(JSON.parse(resp)))
  console.log(resp)
  root = resp.nextRoot
  console.log(chalk.yellow("Next root is: " + resp.nextRoot))
  console.log(chalk.blue("list done, wait for next loop..."))
}

//START
console.log(chalk.blue("Start listening tree root: " + root + "..." ))
//execute(root)
setInterval(execute, TIMEINTERVAL*1000)