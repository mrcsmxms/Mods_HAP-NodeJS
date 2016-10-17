var PythonShell = require('python-shell'); 
// HomeKit types required
var types = require("./types.js")
var exports = module.exports = {};

var exec = require('child_process').exec;

var execute = function(accessory,characteristic,value){ 
    console.log("executed accessory: " + accessory + ", and characteristic: " + characteristic + ", with value: " +  value + "."); 
}

exports.accessory = {
  displayName: "Steckdose",
  username: "1F:2F:3C:4D:5E:FE",
  pincode: "031-45-154",
  services: [{
    sType: types.ACCESSORY_INFORMATION_STYPE, 
    characteristics: [{
        cType: types.NAME_CTYPE, 
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "Steckdose",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Bla",
        designedMaxLength: 255    
    },{
        cType: types.MANUFACTURER_CTYPE, 
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "Oltica",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Bla",
        designedMaxLength: 255    
    },{
        cType: types.MODEL_CTYPE,
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "Rev-1",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Bla",
        designedMaxLength: 255    
    },{
        cType: types.SERIAL_NUMBER_CTYPE, 
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "A1S2NASF68EW",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Bla",
        designedMaxLength: 255    
    },{
        cType: types.IDENTIFY_CTYPE, 
        onUpdate: null,
        perms: ["pw"],
        format: "bool",
        initialValue: false,
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Identify Accessory",
        designedMaxLength: 1    
    }]
  },{
    sType: types.OUTLET_STYPE, 
    characteristics: [{
        cType: types.NAME_CTYPE,
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "Steckdose",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Bla",
        designedMaxLength: 255   
    },{
	cType: types.POWER_STATE_CTYPE,
        onUpdate: function(value)
        {
                console.log("Change:",value);
                if (value) {
                        PythonShell.run('outlet1.py', function (err) {
                                console.log('On Success');
                        });
                } else {
                        PythonShell.run('outlet0.py', function (err) {
                                console.log("Off Success");

                        });
                }
        },
        perms: ["pw","pr","ev"],
                format: "bool",
                initialValue: false,
                supportEvents: false,
                supportBonjour: false,
                manfDescription: "Turn On the Light",
                designedMaxLength: 1   
  },{
        cType: types.OUTLET_IN_USE_CTYPE,
        onUpdate: function(value) { console.log("Change:",value); execute("Test Accessory 1", "light service", value); },
        perms: ["pr","ev"],
        format: "bool",
        initialValue: false,
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Turn On the Light",
        designedMaxLength: 1    
    }]
  }]
}
