var fs = require('fs');
var socket = require('socket.io-client')('http://192.168.0.24:3000');
var dbus = require('dbus-native');
var exec = require('child_process').exec;
var file = process.argv.slice(2)[0]; //get a path to the video argument
var options = process.argv.slice(2)[1];
var bus;
var currentPosition;
var gate = true;

// PARSE TERMINAL INPUT.
if(options == undefined){
  options = '-o hdmi --loop -b --no-osd';
}
if(file == undefined){
  console.log("no video file specified");
  return
}
console.log('current video path: ' + file);

//start omx player
var omx = exec('omxplayer '+options+' "'+file+'"');

//SOCKET.IO HANDLING
socket.on('connect', function(){
  console.log("I am connected as: " + socket.id);
});

//DBUS HANDLING
setTimeout(function(){ //wait for dbus to become available.
  bus = dbus.sessionBus({
          busAddress: fs.readFileSync('/tmp/omxplayerdbus.pi', 'ascii').trim()
  });

  socket.on('loopFlag', function(loopFlag){
    console.log("Broadcaster looped, go to start");
    seek(0);
  })

}, 500)


// SEEK a specific position.
function seek(pos){
  bus.invoke({
          path: "/org/mpris/MediaPlayer2",
          interface: "org.mpris.MediaPlayer2.Player",
          member: "SetPosition",
          destination: "org.mpris.MediaPlayer2.omxplayer",
          signature: "ox",
          body: [ '/not/used', pos ]
  }, function(err) {
    if(err != null){
          console.log(err);
        }
  });

}