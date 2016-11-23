var http = require("http");
var fs =  require("fs"); 
var Accessory = require('../').Accessory;
var Service = require('../').Service;
var Characteristic = require('../').Characteristic;
var uuid = require('../').uuid;

// here's a humidity sensor device that we'll expose to HomeKit
var HUMID_SENSOR = {
  currentHumidity: 50,
  getHumidity: function() { 
    console.log("Getting the current humidity!");
    return HUMID_SENSOR.currentHumidity;
  },
  getNewHumidity: function() {
// the file where the data from the actual sensor is exported to

    var humid = fs.readFileSync("/home/pi/HAP-NodeJS/humid");
    var raspiHumid = humid/1;
    HUMID_SENSOR.currentHumidity = raspiHumid;
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
    callback(null, HUMID_SENSOR.getHumidity());
  });

// refresh our humidity reading every 3 seconds
setInterval(function() {
  
  HUMID_SENSOR.getNewHumidity();
  
  // update the characteristic value so interested iOS devices can get notified
  sensor
    .getService(Service.HumiditySensor)
    .setCharacteristic(Characteristic.CurrentRelativeHumidity, HUMID_SENSOR.currentHumidity);
  
}, 3000);
