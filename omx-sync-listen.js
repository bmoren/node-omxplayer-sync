var fs = require('fs');
var socket = require('socket.io');
var dbus = require('dbus-native');
var args = process.argv.slice(2)[0]; //get a path to the video argument
console.log('current video path: ' + args);

var bus = dbus.sessionBus({
        busAddress: fs.readFileSync('/tmp/omxplayerdbus.root', 'ascii').trim()
});

var pos = 600000000;

bus.invoke({
        path: "/org/mpris/MediaPlayer2",
        interface: "org.mpris.MediaPlayer2.Player",
        member: "SetPosition",
        destination: "org.mpris.MediaPlayer2.omxplayer",
        signature: "ox",
        body: [ '/not/used', pos ]
}, function(err) {
        console.log(err);
});