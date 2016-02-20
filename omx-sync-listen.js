var fs = require('fs');
var socket = require('socket.io-client')('http://192.168.0.25:3000');
var dbus = require('dbus-native');
var exec = require('child_process').exec;
var file = process.argv.slice(2)[0]; //get a path to the video argument
var options = process.argv.slice(2)[1];
var currentPosition;

// PARSE TERMINAL INPUT.
if(options == undefined){
  options = '-o hdmi --loop -b';
}
if(file == undefined){
  console.log("no video file specified");
  return
}
console.log('current video path: ' + file);

//start omx player
var omx = exec('omxplayer '+options+' "'+file+'"');

//SOCKET>IO HANDLING
socket.on('connect', function(){
  console.log("I am connected as: " + socket.id);
});

socket.on('broadcastPosition', function(position){
  console.log("socketData: " + position.position);
});

//DBUS HANDLING
var bus = dbus.sessionBus({
        busAddress: fs.readFileSync('/tmp/omxplayerdbus.pi', 'ascii').trim()
});

//SEEK a specific position.
// var pos = 600000000;
//
// bus.invoke({
//         path: "/org/mpris/MediaPlayer2",
//         interface: "org.mpris.MediaPlayer2.Player",
//         member: "SetPosition",
//         destination: "org.mpris.MediaPlayer2.omxplayer",
//         signature: "ox",
//         body: [ '/not/used', pos ]
// }, function(err) {
//         console.log(err);
// });