// Require IOTA Packages
const Iota = require('@iota/core');

// Connect to a Node in IOTA's DevNet
const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });

// Define the depth and the minimum weight magnitude
const depth = 3;
const minimumWeightMagnitude = 9;

// Defining the SEED of the ADDRESS with valid IOTAs from Faucet!
const seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

// Defining the Address that is recieving IOTAs
const receivingAddress = "ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDXNYVAPLZAW";

// Create a transfer-object - HERE: Send 1 IOTA token
const transfers = [
    {
      value: 1,
      address: receivingAddress
    }
    ]