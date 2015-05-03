var app  = require("express")();
var http = require('http').Server(app);
var io   = require("socket.io")(http);



app.get("/",function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});



io.on('connection',function(socket){
    console.log("A user is connected");
    socket.emit('something', { hello: 'world' });
});



http.listen(3000,function(){
    console.log("Listening on 3000");
});