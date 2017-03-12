/**
 * Created by ILDI on 11/03/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var habitSchema = new Schema({
    name: String,
    description: String,
    colour: String
});

var Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;