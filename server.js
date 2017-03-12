/**
 * Created by ILDI on 11/03/2017.
 */

var express = require('express');
var mongoose = require('mongoose');
var app = express();
var path = require('path');

var Habit = require('./app/api/habit.js');

app.use(express.static(path.join(__dirname,"public")));

// viewed at http://localhost:8080
app.get('/api/habit', function(req, res) { // app.get - reading
    console.log("hello")
    Habit.find({}, function(err,habits) {
        if(err)
            throw err;
        console.log(err, habits);
        res.status(200);
        res.json( { habits: habits }); // in format json
    });
});

app.post('/api/habit', function(req,res) {
    Habit.create({name: "test", description: "short desc of test", colour: "blue"},function(err,habits){
        if(err) throw err;
        res.send();
    });
});

mongoose.connect('mongodb://localhost/habitdb').then(function () {
    app.listen(8080);
}).catch(function (err) {
    console.error(err);
});


