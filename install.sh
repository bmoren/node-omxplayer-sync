#!/bin/bash

#install rsync on the client for the deploy script, uncomment if you are going to do some development, not needed for a standard deployment.
#sudo --yes --force-yes apt-get install rsync

#create the folder for the project to live
# mkdir ~/node-omxplayer-sync

########

#install nvm & node.js latest
wget https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh 
chmod +x ~/install.sh
./install.sh
rm ~/install.sh
source ~/.bashrc 
nvm install stable 

sudo apt-get -yes install git 
git clone https://github.com/bmoren/node-omxplayer-sync.git 

cd ~/node-omxplayer-sync 
npm install 

#install omxplayer
sudo apt-get -yes install omxplayer 

#install usb-mount so we can easily get files into the system.
sudo apt-get -yes install usbmount 

#get your pi up to date!
sudo apt-get -yes update 
sudo apt-get -yes upgrade

#dont forget to expand your filesystem using:
#sudo raspi-config
