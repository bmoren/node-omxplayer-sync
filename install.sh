#!/bin/bash

#install rsync on the client for the deploy script, uncomment if you are going to do some development, not needed for a standard deployment.
#sudo --yes --force-yes apt-get install rsync

#create the folder for the project to live
# mkdir ~/node-omxplayer-sync

########

#install nvm & node.js latest
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

source ~/.bashrc

nvm install stable

cd ~/node-omxplayer-sync
npm install

#install omxplayer
sudo --yes --force-yes apt-get install omxplayer

#install usb-mount so we can easily get files into the system.
# sudo --yes --force-yes apt-get install usbmount

#get your pi up to date!
sudo apt-get update
sudo apt-get upgrade

#dont forget to expand your filesystem using:
#sudo raspi-config
