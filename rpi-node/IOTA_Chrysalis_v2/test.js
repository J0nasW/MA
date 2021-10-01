const mqtt = require('mqtt')
var client = mqtt.connect({ port: 1883, host: '192.168.2.36', keepalive: 10000});

client.subscribe('dht11_temp')
client.on('message', function (topic, message) {
  console.log(message)
})