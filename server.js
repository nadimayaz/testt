var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

server.listen(8000,function(){console.log('Server is up....');});

app.get('/*',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

try {
    var dbURI = 'mongodb://127.0.0.1/mydatabase';
    mongoose.connect(dbURI,{ useMongoClient: true });

    var db = mongoose.connection;

}
catch (e) {
    console.log(e.String);
}
