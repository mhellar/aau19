#include <SoftwareSerial.h>// import the serial library

SoftwareSerial BTport(2, 3); // RX, TX
int ledpin=13; // led on D13 will show blink on / off
int BluetoothData; // the data given from Computer

void setup() {
  // put your setup code here, to run once:
  BTport.begin(9600);
  BTport.println("Bluetooth On please press 1 or 0 blink LED ..");
  pinMode(ledpin,OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
   if (BTport.available()){
BluetoothData=BTport.read();
   if(BluetoothData=='1'){   // if number 1 pressed ....
   digitalWrite(ledpin,1);
   BTport.println("LED  On D13 ON ! ");
   }
  if (BluetoothData=='0'){// if number 0 pressed ....
  digitalWrite(ledpin,0);
   BTport.println("LED  On D13 Off ! ");
  }
}
delay(100);// prepare for next data ...
}
