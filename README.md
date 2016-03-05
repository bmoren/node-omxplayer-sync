# node-omxplayer-sync

## synchronized looping video for raspberry pi &amp; omxplayer!

node-omxplayer-sync utilizes a socket.io connection between and broadcaster and many listener raspberry pis provided to synchronized playback. The broadcaster sends out a notification to all listeners when its video has looped. This resets all listeners (including itself) to the start of the loop playback. All listeners synchronize on one full playback loop of the main broadcaster and will continually attempt to re-sync each time the main broadcaster's file loops.

### to install for deployment:

- `git clone` this repository to `~/` on your raspberry pi
- `cd ~/node-omxplayer-sync`
- `chmod +x install.sh`
- `./install.sh`
- configure the ip address of one of the raspberry pis to act as the main broadcaster with a [Static IP](https://pihw.wordpress.com/guides/direct-network-connection/in-a-nut-shell-direct-network-connection/) of `192.168.0.99`, or dive into the omx-sync.js file and adjust the socket.io IP assignment manually to whatever you like.
- `node omx-sync.js path/to/video.mp4` on each pi

--------------------------------------------------------------------------------

### auto-run on startup

coming soon!

### Tested on

Node V 5.6.0

omxplayer<br>Version   : f544084 [master]

RASPBIAN JESSIE LITE<br>Release date:2016-02-09<br>Kernel version:4.1

dbus-native@0.2.0<br>socket.io@1.4.5
