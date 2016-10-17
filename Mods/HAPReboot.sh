echo "HomeKit Server wird neugestartet"
sudo forever stopall
echo "HomeKit Server angehalten"
cd
cd /home/pi/HAP-NodeJS/
sudo forever start BridgedCore.js
echo "HomeKit Server gestartet"
