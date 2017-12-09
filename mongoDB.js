
'use strict'
    var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

try {
    var dbURI = 'mongodb://localhost:8808/mydatabase';
    mongoose.connect(dbURI, { useMongoClient: true });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection-error'));

    db.once('open', function () {
        console.log("Database connected");
    });

    //Base Schema [Products]

    var Schema = mongoose.Schema;

    var SomeModelSchema = new Schema({
        a_string: String
    });
    var some = mongoose.model("some", SomeModelSchema);

    var test = new some({
        a_string: "Hello"
    });
    test.save(function (err, obj_id) {
        if (err) return handleError(err);
        else console.log("Inserted successfully!", obj_id);
    });
}
catch (e) {
    console.log(e.String);
}

