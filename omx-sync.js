var fs = require('fs');
var server = require('http').createServer();
var socket = require('socket.io-client')('http://192.168.0.99:3000');
// var io = require('socket.io')(server);
var io = require('socket.io')(server, {'pingInterval': 10000, 'pingTimeout': 15000});
var dbus = require('dbus-native');
var exec = require('child_process').exec;
var file = process.argv.slice(2)[0]; //get a path to the video argument
var options = process.argv.slice(2)[1];
var currentPosition, totalDuration;
var bus; //main DBUS

server.listen(3000, function() { console.log( 'Listening on port 3000') });

// PARSE TERMINAL INPUT.
if(options == undefined){
  options = '-o hdmi -b --loop --no-osd '; // --no-osd --loop
}
if(file == undefined){
  console.log("no video file specified");
  return
}

//kill previous players if the script needs to restart
var killall = exec('killall omxplayer', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

var killall2 = exec('killall omxplayer.bin', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

console.log('current video path: ' + file);

//start omx player
// var omx = exec('omxplayer '+options+' "'+file+'"');
var omx = exec('omxplayer '+options+'  '+file+'  ', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

//SOCKET.IO HANDLING
io.on('connection', function(socket){
  console.log("Listener connected: " + socket.id);

  socket.on('disconnect', function(){
    console.log("Listener disconnected: " + socket.id );
  });

});

socket.on('connect', function(){
  console.log("Connected to the broadcaster as: " + socket.id);
});

socket.on('loopFlag', function(loopFlag){
  console.log("loop flag recieved, go to 0");
  seek(100);
})

//DBUS HANDLING
setTimeout(function(){ //wait for dbus to become available.

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


  //send out loop flag
  setInterval(function(){
    bus.invoke({
            path: "/org/mpris/MediaPlayer2",
            interface: "org.freedesktop.DBus.Properties",
            member: "Position",
            destination: "org.mpris.MediaPlayer2.omxplayer",
    }, function(err, position) {
            currentPosition = position; //set to a global
            // console.log("CP: " + currentPosition);
    });

    if(currentPosition >= totalDuration - 250000 && currentPosition < totalDuration){ //are we in the end range of the file?
      console.log("*File Ended");
      io.emit('loopFlag', { loopFlag : 'loop' });
    }

  },100);

}, 1000);


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
          console.log("ERROR: "+err);
        }
  });

}


