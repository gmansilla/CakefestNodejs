var app  = require("express")();
var http = require('http').Server(app);
var io   = require("socket.io")(http);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/articleNotification', function(req, res) {
    if (req.body.isNew === true) {
        io.sockets.emit('newArticle', req.body);
    }
    if (req.body.isNew === false) {
        io.sockets.emit('updatedArticle', req.body);
    }
    res.status(200).send('OK');
});

app.post('/newComment', function(req, res) {
    io.sockets.in(req.body.articleId).emit('newComment', req.body);
    io.sockets.emit('notifyNewComment', req.body);
    res.status(200).send('OK');
});

io.on('connection', function(socket) {
    socket.on('joinRoom', function(data){
        socket.join(data.articleId);
    });
});

http.listen(3000, function() {
    console.log("Listening on 3000");
});