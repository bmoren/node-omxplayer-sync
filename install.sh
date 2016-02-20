#!/bin/bash

#install rsync on the client for the deploy script
sudo apt-get install rsync

#create the folder for the project to live
mkdir ~/node-omxplayer-sync

########

#install nvm & node.js latest
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

.source ~/.bashrc

nvm install stable

cd ~/node-omxplayer-sync
npm install


#install omxplayer
sudo apt-get install omxplayer

#get your pi up to date!
sudo apt-get update
sudo apt-get upgrade
