/**
 * Created by ILDI on 11/03/2017.
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');


var Habit = require('./app/api/habit.js');

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser());

// viewed at http://localhost:8080
app.get('/api/habit', function(req, res) { // app.get - reading

    Habit.find({}, function(err,habits) {
        if(err)
            throw err;
        res.status(200);
        res.json( { habits: habits }); // in format json
    });
});

app.post('/api/habit', function(req,res) {
    console.log(req.body);
    Habit.create({name: req.body.name,
                description: req.body.description,
                colour: req.body.colour },function(err,habits){
        if(err) throw err;
        res.send();
    });
});

app.delete('/api/habit',function(req,res){
    Habit.findOneAndRemove({_id: req.body.id },function(err,habits){
                                                        if(err) throw err;
        res.send();
    });
});

app.put('/api/habit',function(req,res){
    console.log(req.body);
    Habit.findByIdAndUpdate({_id: req.body.id},
        {name: req.body.name,
        description: req.body.description,
        colour: req.body.colour},function(err,habits){
                                                    if(err) throw err;
        res.send();
    });
});

mongoose.connect('mongodb://localhost/habitdb').then(function () {
    app.listen(8080);
}).catch(function (err) {
    console.error(err);
});


