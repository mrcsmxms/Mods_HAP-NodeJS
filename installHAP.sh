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
sudo apt-get update
sudo apt-get install git-core libnss-mdns libavahi-compat-libdnssd-dev -y
sudo apt-get remove nodejs-legacy -y
sudo wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb
node -v
npm -v
sudo npm install -g node-gyp
sudo npm install -g forever
sudo git clone https://github.com/KhaosT/HAP-NodeJS.git
cd HAP-NodeJS
sudo npm install node-persist
sudo npm rebuild
sudo npm install debug mdns fast-srp-hap ed25519 buffer-shims curve25519-n ip wiring-pi python-shell

sudo node Core.js