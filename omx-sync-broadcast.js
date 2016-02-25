var fs = require('fs');
var server = require('http').createServer();
var socket = require('socket.io-client')('http://192.168.0.24:3000');
var io = require('socket.io')(server);
var dbus = require('dbus-native');
var exec = require('child_process').exec;
var file = process.argv.slice(2)[0]; //get a path to the video argument
var options = process.argv.slice(2)[1];
var currentPosition, totalDuration;
var bus;

server.listen(3000, function() { console.log( 'Listening on port 3000') });

// PARSE TERMINAL INPUT.
if(options == undefined){
  options = '-o hdmi -b --loop --no-osd '; // --no-osd --loop
}
if(file == undefined){
  console.log("no video file specified");
  return
}
console.log('current video path: ' + file);

//start omx player
var omx = exec('omxplayer '+options+' "'+file+'"');

//SOCKET.IO HANDLING
io.on('connection', function(socket){
  console.log("user connected: " + socket.id);
});

socket.on('loopFlag', function(loopFlag){
  console.log("looped");
  seek(0);
})

//DBUS HANDLING
setTimeout(function(){
  bus = dbus.sessionBus({
          busAddress: fs.readFileSync('/tmp/omxplayerdbus.pi', 'ascii').trim()
  });

  bus.invoke({
          path: "/org/mpris/MediaPlayer2",
          interface: "org.freedesktop.DBus.Properties",
          member: "Duration",
          destination: "org.mpris.MediaPlayer2.omxplayer",
  }, function(err, duration) {
          totalDuration = duration; //set to a global
          console.log("Duration: " + totalDuration);
  });


  // get current position to broadcast out to the listeners
  setInterval(function(){
    bus.invoke({
            path: "/org/mpris/MediaPlayer2",
            interface: "org.freedesktop.DBus.Properties",
            member: "Position",
            destination: "org.mpris.MediaPlayer2.omxplayer",
    }, function(err, position) {
      if( position < 18446744073709392000){
            currentPosition = position; //set to a global
            console.log("CP: " + currentPosition);
      }
    });

    if(currentPosition >= totalDuration - 200000 && currentPosition < totalDuration){
      console.log("******************Ended");
      io.emit('loopFlag', { loopFlag : 'loop' });
    }

    // io.emit('broadcastPosition', { position: currentPosition }); //send the position of the broadcaster to all of the listeners

  },100);

}, 500)


function seek(pos){
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

}


