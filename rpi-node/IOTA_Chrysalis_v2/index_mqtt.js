const mqtt = require('mqtt')
var client = mqtt.connect({ port: 1883, host: '127.0.0.1', keepalive: 10000});
// DHT11 Packages
var sensor = require("node-dht-sensor");



const TIMEINTERVAL  = 30; // In seconds.

// Reading the DHT11 Sensor Results
const DHTData = function() {
    var sensorResult = sensor.read(11, 4);
    return sensorResult;
}
//----------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------

// Publish to tangle
const publish_data = async packet => {
    var sensorResult = DHTData();
    client.publish('dht11_temp', sensorResult.temperature.toFixed(1));
    client.publish('dht11_hum', sensorResult.humidity.toFixed(1))
    client.end();
    
}

setInterval(publish_data, TIMEINTERVAL*1000);