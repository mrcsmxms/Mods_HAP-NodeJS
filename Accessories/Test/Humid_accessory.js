var http = require("http");
var fs =  require("fs"); 
var Accessory = require('../').Accessory;
var Service = require('../').Service;
var Characteristic = require('../').Characteristic;
var uuid = require('../').uuid;

// here's a fake temperature sensor device that we'll expose to HomeKit
var FAKE_SENSOR = {
  currentTemperature: 50,
  getTemperature: function() { 
    console.log("Getting the current humidity!");
    return FAKE_SENSOR.currentTemperature;
  },
  randomizeTemperature: function() {

    var temp = fs.readFileSync("/home/pi/HAP-NodeJS/humid");
    var raspiTemp = temp/1;
    FAKE_SENSOR.currentTemperature = raspiTemp;
 }
}


// Generate a consistent UUID for our Temperature Sensor Accessory that will remain the same
// even when restarting our server. We use the `uuid.generate` helper function to create
// a deterministic UUID based on an arbitrary "namespace" and the string "temperature-sensor".
var sensorUUID = uuid.generate('hap-nodejs:accessories:humid-sens');

// This is the Accessory that we'll return to HAP-NodeJS that represents our fake lock.
var sensor = exports.accessory = new Accessory('Humid Sens', sensorUUID);

// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
sensor.username = "F1:5D:3A:AE:55:FC";
sensor.pincode = "031-45-154";

// Add the actual TemperatureSensor Service.
// We can see the complete list of Services and Characteristics in `lib/gen/HomeKitTypes.js`
sensor
  .addService(Service.HumiditySensor)
  .getCharacteristic(Characteristic.CurrentRelativeHumidity)
  .on('get', function(callback) {
    
    // return our current value
    callback(null, FAKE_SENSOR.getTemperature());
  });

// randomize our temperature reading every 3 seconds
setInterval(function() {
  
  FAKE_SENSOR.randomizeTemperature();
  
  // update the characteristic value so interested iOS devices can get notified
  sensor
    .getService(Service.HumiditySensor)
    .setCharacteristic(Characteristic.CurrentRelativeHumidity, FAKE_SENSOR.currentTemperature);
  
}, 3000);