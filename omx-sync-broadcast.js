var fs = require('fs');
var socket = require('socket.io');
var dbus = require('dbus-native');
var exec = require('child_process').exec;
var file = process.argv.slice(2)[0]; //get a path to the video argument
var options = process.argv.slice(2)[1];

if(options == undefined){
  options = '-o hdmi --loop -b';
}
console.log('current video path: ' + file);

//start omx player
var omx = exec('omxplayer '+options+' "'+file+'"');

var bus = dbus.sessionBus({
        busAddress: fs.readFileSync('/tmp/omxplayerdbus.pi', 'ascii').trim()
});

// get current position to broadcast out to the listeners
setInterval(function(){
  bus.invoke({
          path: "/org/mpris/MediaPlayer2",
          interface: "org.freedesktop.DBus.Properties",
          member: "Position",
          destination: "org.mpris.MediaPlayer2.omxplayer",
  }, function(err, position) {
          console.log(err, position);
          console.log('position: '+ position / 1000000 + ' seconds');
  });

},100);



