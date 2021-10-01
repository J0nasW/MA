const SerialPort = require("serialport");
const SerialPortParser = require("@serialport/parser-readline");
const GPS = require("gps");

const port = new SerialPort("/dev/ttyS0", { baudRate: 9600 });
const gps = new GPS();

const parser = port.pipe(new SerialPortParser());



gps.on('data', function(data) {
  console.log(data, gps.state);
});

port.on('data', function(data) {
  gps.updatePartial(data);
});







/*
gps.on("data", async data => {
    if(data.type == "GGA") {
        if(data.quality != null) {
            coords = data;
            console.log("Got the data!");
        } else {
            console.log("No gps fix available.");
        }
    }
});

gps.update();
console.log(coords.lat);
 

parser.on("data", data => {
    try {
        gps.update(data);
    } catch (e) {
        throw e;
    }
});
*/