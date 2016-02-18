#!/bin/bash

#sudo apt-get update

#install rsync for the deploy script
sudo apt-get install rsync

########

#install nvm & node.js latest
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
nvm install stable

#install omxplayer
sudo apt-get install omxplayer


#sudo apt-get upgrade