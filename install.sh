#!/usr/bin/env bash
#install rsync on the client for the deploy script, uncomment if you are going to do some development, not needed for a standard deployment.
#sudo --yes --force-yes apt-get install rsync

#create the folder for the project to live
# mkdir ~/node-omxplayer-sync

########

#install nvm & node.js stable
echo "<<<<<<<<<<<< INSTALLING NVM NODE AND NPM >>>>>>>>>>>>"
wget https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh 
chmod +x ~/install.sh
./install.sh
rm ~/install.sh

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install stable 

#install git and clone this repo
echo "<<<<<<<<<<<< INSTALLING GIT AND CLONING REPO >>>>>>>>>>>>"
sudo apt-get --yes install git 
git clone https://github.com/bmoren/node-omxplayer-sync.git 

#install node dependencies
echo "<<<<<<<<<<<< INSTALLING DEPENDENCIES >>>>>>>>>>>>"
cd ~/node-omxplayer-sync 
npm install 

#install forever and append startup command to bashrc ... dont forget to change the filename to your video file
echo "<<<<<<<<<<<< INSTALLING FOREVER AND APPENDING .BASHRC >>>>>>>>>>>>"
npm install forever -g
echo 'forever start ~/node-omxplayer-sync/omx-sync.js ~/node-omxplayer-sync/test.mp4' >> ~/.bashrc 

#install omxplayer
echo "<<<<<<<<<<<< INSTALLING OMXPLAYER>>>>>>>>>>>>"
sudo apt-get --yes install omxplayer 

#install usb-mount so we can easily get files into the system.
echo "<<<<<<<<<<<< INSTALLING USBMOUNT >>>>>>>>>>>>"
sudo apt-get --yes install usbmount 

#get pi up to date!
echo "<<<<<<<<<<<< UPDATING PI >>>>>>>>>>>>"
sudo apt-get --yes update 
sudo apt-get --yes upgrade

echo "<<<<<<<<<<<< COMPLETE >>>>>>>>>>>>"

# set the login user to PI
echo "<<<<<<<<<<<< DONT FORGET TO SET CONSOLE TO AUTOLOGIN USER pi WITH: sudo raspi-config >>>>>>>>>>>>"
# sudo raspi-config
