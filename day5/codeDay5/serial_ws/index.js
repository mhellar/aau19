var com = require("serialport");
var app = require('express')();

var server = app.listen(3000);
var io = require('socket.io')(server);

const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort("/dev/tty.usbmodem3013401", {
    baudRate: 9600
});

//Serve index.html when some make a request of the server
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const parser = port.pipe(new Readline({
    delimiter: "\r\n"
}));

parser.on("data", function (data) {
    console.log(data);
    io.sockets.emit('data', data);
});