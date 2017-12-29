#!/usr/bin/env bash
#install rsync on the client for the deploy script, uncomment if you are going to do some development, not needed for a standard deployment.
#sudo --yes --force-yes apt-get install rsync

#create the folder for the project to live
# mkdir ~/node-omxplayer-sync

########

#install nvm & node.js stable
wget https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh 
chmod +x ~/install.sh
./install.sh
rm ~/install.sh

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install stable 

#install git and clone this repo
sudo apt-get --yes install git 
git clone https://github.com/bmoren/node-omxplayer-sync.git 

#install node dependencies
cd ~/node-omxplayer-sync 
npm install 

#install forever and append startup command to bashrc ... dont forget to change the filename to your video file
npm install forever -g
echo 'forever start ~/node-omxplayer-sync/omx-sync.js ~/node-omxplayer-sync/test.mp4' >> ~/.bashrc 

#install omxplayer
sudo apt-get --yes install omxplayer 

#install usb-mount so we can easily get files into the system.
sudo apt-get --yes install usbmount 

#get pi up to date!
sudo apt-get --yes update 
sudo apt-get --yes upgrade
