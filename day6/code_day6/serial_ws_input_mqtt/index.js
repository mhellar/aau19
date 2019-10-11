var com = require("serialport");
var mqtt = require('mqtt')

const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort("/dev/tty.wchusbserial141720", {
    baudRate: 9600
});

var client = mqtt.connect('mqtt://127.0.0.1')
let myName = 'Mark';

client.on('connect', function () {
    client.subscribe('immersive', function (err) {
        if (!err) {
            client.publish('immersive', 'Hello from ' + myName)
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    let incoming = message.toString();
    console.log(incoming)
    if (incoming === 'red') {
        portWrite('R')
    }
    if (incoming === 'green') {
        portWrite('G')
    }
    if (incoming === 'blue') {
        portWrite('B')
    }

})

const parser = port.pipe(new Readline({
    delimiter: "\r\n"
}));

parser.on("data", function (data) {
    console.log(data);
});

function portWrite(msg) {
    port.write(msg, function (err) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
        console.log(msg + ' written')
    })
}

// Open errors will be emitted as an error event
port.on('error', function (err) {
    console.log('Error: ', err.message)
})