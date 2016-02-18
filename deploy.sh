#!/bin/bash

ssh_alias="pi@192.168.0.25"
site_folder="./*"
remote_folder="~/node-omxplayer-sync"
exclude="node_modules"

rsync --exclude ${exclude} -a ${site_folder} ${ssh_alias}:${remote_folder} -v

#try to fix this....
# ssh -t ${ssh_alias} "cd $remote_folder && npm install"

# ssh ${ssh_alias} 'bash -l -c "source /home/pi/.bashrc; cd $remote_folder; npm install"'
