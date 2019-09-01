var express= require('express');
var http = require('http');
var app = express();
var morgan= require('morgan');
var bodyParser = require('body-parser');
var server = http.createServer(app);
var io = require("socket.io").listen(server);


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/',express.static('./src/client/'));
app.use('/',express.static('./node_modules'));


io.on('connection', function (socket) {
    var data = {
        cpuPct : 10.0,
        time: new Date()
    };
    setInterval(function(){
        socket.emit('metricServiceDataEvent', data);
        var r = Math.random();
        data.cpuPct += 15 * r - 7.5;
        if(data.cpuPct > 100) data.cpuPct = 100;
        if(data.cpuPct < 0) data.cpuPct = 0;

        data.time = new Date();

    }, 500);
});


app.get('*',function(req,res){
	res.sendfile('./src/client/index.html');
});

server.listen(8080);
console.log('servidor escuchando en el puerto 8080');
