echo "
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒▒▒░░▒▒▒▒▒▒░░▒▒▒▒▒▒░░░░░░
  ░░░░░░▒▒░░▒▒░░▒▒░░▒▒░░▒▒░░▒▒░░░░░░▒▒░░░░░░░░
    ░░░░▒▒░░▒▒░░▒▒░░▒▒▒▒▒▒░░▒▒░░░░░░▒▒▒▒▒▒░░░░░░
  ░░░░░░▒▒░░▒▒░░▒▒░░▒▒▒▒░░░░▒▒░░░░░░░░░░▒▒░░░░
    ░░░░▒▒░░▒▒░░▒▒░░▒▒░░▒▒░░▒▒▒▒▒▒░░▒▒▒▒▒▒░░░░░░
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░▒▒▒▒▒▒▒▒▒▒░░▒▒░░▒▒░░▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒▒▒░░░░
  ░░░░▒▒░░▒▒░░▒▒░░░▒▒▒▒░░░▒▒░░▒▒░░▒▒░░▒▒░░░░░░
    ░░▒▒░░▒▒░░▒▒░░░░▒▒░░░░▒▒░░▒▒░░▒▒░░▒▒▒▒▒▒░░░░
  ░░░░▒▒░░▒▒░░▒▒░░░▒▒▒▒░░░▒▒░░▒▒░░▒▒░░░░░░▒▒░░
    ░░▒▒░░▒▒░░▒▒░░▒▒░░▒▒░░▒▒░░▒▒░░▒▒░░▒▒▒▒▒▒░░░░
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                        // github.com/mrcsmxms
"

#sudo bash installAdafruit.sh
echo "BridgedCore is shutting down"
sudo forever stopall
echo "moving some data to fix the problem"
sudo rm /home/pi/HAP-NodeJS/temp
sudo rm /home/pi/HAP-NodeJS/humid
sudo mv temp_init /home/pi/HAP-NodeJS/temp
sudo mv humid_init /home/pi/HAP-NodeJS/humid
sudo mv /home/pi/HAP-NodeJS/accessories/DHT_accessory.js /home/pi/HAP-NodeJS/accessories/DHT_accessory1.js
sudo mv Humid_DHT_accessory.js /home/pi/HAP-NodeJS/accessories/Humid_DHT_accessory.js
sudo mv Temp_DHT_accessory.js /home/pi/HAP-NodeJS/accessories/Temp_DHT_accessory.js
echo "launching BridgedCore with new structure" 
sudo forever start /home/pi/HAP-NodeJS/BridgedCore.js
echo "launching bot to keep data up to date"
sudo bash DHTbot.sh &
echo "have fun"

