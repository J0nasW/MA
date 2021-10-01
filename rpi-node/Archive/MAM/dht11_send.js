/*
A Script by Jonas Wilinski working @ LogU TUHH.

It publishes DHT11 sensor data onto the IOTA Devnet Tangle. Additionally, it returns a root on which you can subscribe to listen to the published sensor data.
Sensor data will be provided in YAML Format.

Run the following first in order to get dht11 sensor data:

wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.46.tar.gz
tar zxvf bcm2835-1.46.tar.gz
cd bcm2835-1.46
./configure
make
sudo make check
sudo make install
sudo npm install -g node-dht-sensor

*/

var sensorLib = require('node-dht-sensor');

// Setup sensor, exit if failed
var sensorType = 11; // 11 for DHT11, 22 for DHT22 and AM2302
var sensorPin  = 4;  // The GPIO pin number for sensor signal
if (!sensorLib.initialize(sensorType, sensorPin)) {
    console.warn('Failed to initialize sensor');
    process.exit(1);
}

