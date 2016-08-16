#!/bin/bash
#reboot the looper, change 01_nomotion.mp4 to what ever file you want to reboot the player into.
#dont forget to `chmod +x` me!

killall node
killall omxplayer
killall omxplayer.bin

node ~/node-omxplayer-sync/omx-sync.js 01_nomotion.mp4