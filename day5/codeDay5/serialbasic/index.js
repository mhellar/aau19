const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort("/dev/cu.usbmodem143731", {
  baudRate: 9600
});

const parser = port.pipe(new Readline({
  delimiter: "\r\n"
}));

parser.on("data", function (data) {
  console.log(data);
});
© 2019 GitHub, Inc.