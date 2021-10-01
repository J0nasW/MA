# The Client Software

Currently, IOTA does not support dApps and Smart Contracts in order to process computation and algorithms right on the blockchain. To overcome this, a client software has to be written, which can be accessed via CLI or any web-browser supporting JavaScript. Participants of the IOTA Tangle can log in to this client and either register a new device (e.g. a new Raspberry Pi Sensor) or subscribe to a sensor data flow. Aditionally, a warning system has to be integrated for warnings on the cold chain, if for example temperature is not constant or a sensor has problems pushing data to the tangle.

This Project provides a client application written in REACT to access a given tangle and read temperature data from the RasperryPi.

# Usage

## Prequisites:
- Make sure that you have an up to date system
- Install NodeJS:</br>
    Run the command `curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -` to get the latest NodeJS Package.</br>
    Then run `sudo apt-get install -y nodejs` to install it.</br>
    Check your installed NodeJS version with `node -v`. If you get a valid version number, continue to Installation.
- Install Git on the Raspberry Pi:</br>
Type: `sudo apt install git`
- Install yarn via npm using this command: `npm install -g yarn`. If you don't have npm, follow the [Instructions](https://www.npmjs.com/get-npm).
- Install React Native via the Expo installer: `npm install -g expo-cli`
- Navigate to a suitable workplace (e.g. `\home\iota`).
- Navigate into `logu-iota\client`.
- Run `yarn install`. It will install all necessary dependencies and set up the environment.
- Run `expo start` to start the client.

## Using the Client



![UC](img/under-construction.jpg)