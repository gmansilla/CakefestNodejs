var app  = require("express")();
var http = require('http').Server(app);
var io   = require("socket.io")(http);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});

app.get("/notify", function(req, res) {
    io.sockets.emit("something", {hello: 'emit'});
});

app.post('/notify', function(req, res) {
    console.log(req.body);
    console.log('post notify');

});


io.on('connection',function(socket){
    console.log("A user is connected");
    socket.emit('something', { hello: 'world' });
});



http.listen(3000,function(){
    console.log("Listening on 3000");
});