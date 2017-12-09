var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());  

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mongotest', { useMongoClient: true });  

var Schema = mongoose.Schema;

// todos  
var todosShema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
});

var Todos = mongoose.model('todos', todosShema);  

app.get('/todos', function (req, res) {
    console.log("Hello");
    Todos.find({}, function (err, todos) {

        if (!todos) {
            res.statusCode = 404;

            return res.json({
                error: 'Not found'
            });
        };

        if (!err) {
            return res.json({
                status: 'OK',
                todos: todos
            });
        } else {
            res.statusCode = 500;
            //  log.error('Internal error(%d): %s',res.statusCode,err.message);  

            return res.json({
                error: 'Server error'
            });
        };
    });
});  

app.post('/todo', function (req, res) {

    var tdos = new Todos({
        name: req.body.name,
        content: req.body.content
    });

    tdos.save(function (err, todos) {
        console.log(err);
        if (!err) {
            return res.json({
                status: 'OK',
                todos: todos
            });
        } else {
            res.statusCode = 500;
            res.json({
                error: 'Server error'
            });
        }
    });
});  

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Start the server  
app.set('port', 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});  