# node-omxplayer-sync

## synchronized looping video for raspberry pi &amp; omxplayer!

node-omxplayer-sync utilizes a socket.io connection between and broadcaster and many listener raspberry pis provided to synchronized playback. The broadcaster sends out a notification to all listeners when its video has looped. This resets all listeners (including itself) to the start of the loop playback. All listeners synchronize on one full playback loop of the main broadcaster and will continually attempt to re-sync each time the main broadcaster's file loops.

### to install for deployment:

Currently the installer script does not work, if you want to make one, please make a pull request! Verbose directions below!

1. Setup your Pi
  1. Expand your filesystem: `sudo raspi-config`
  1. `sudo apt-get update`
  1. `sudo apt-get upgrade`
1. `git clone` this repository to `~/` on your raspberry pi
1. if you are running raspbian jessie lite, install omxplayer & rsync
  1. `sudo apt-get install omxplayer`
  1. ` sudo apt-get install rsync`
1. install nvm & node.js latest
 1. `wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash`
 1. `source ~/.bashrc`
 1. `nvm install stable`
1. update & install npm packages
  1. `cd ~/node-omxplayer-sync`
  1. `npm install`
1. configure the ip address of one of the raspberry pis to act as the main broadcaster with a [Static IP](https://www.modmypi.com/blog/how-to-give-your-raspberry-pi-a-static-ip-address-update) of `192.168.0.99`, or dive into the omx-sync.js file and adjust the socket.io IP assignment manually to whatever you like.
1. connect all pis to the same local network via wifi or ethernet
1. `node omx-sync.js path/to/video.mp4` on each pi to run the sync video!

--------------------------------------------------------------------------------

### auto-run on startup

1. run `sudo raspi-config`, navigate to the boot options and choose `command line (auto login as user pi)`
1. `nano ~/.bashrc`
1. find the line to load NVM `export NVM_DIR="/home/pi/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm` or something similar
1. add `node ~/node-omxplayer-sync/omx-sync.js ~/absolute/path/to/video.mp4` below the NVM listeners
1. `ctrl+x` then `Y` then `Enter` to save
1. `sudo reboot`

### Tested on

Node v6.3.0

omxplayer<br>Version: 6c90c75 [master]

RASPBIAN JESSIE LITE<br>Release date:2016-05-27

dbus-native@0.2.0<br>socket.io@1.4.8
