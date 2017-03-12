/**
 * Created by ILDI on 11/03/2017.
 */

/**
$(document).ready(function() {
    $.getJSON( "/api/habit.js", function( data ) {
        $("#habitfill").append('<td> Name:' + data.name + '</td>');
        $("#habitfill").append('<td> Name:' + data.description + '</td>');
        $("#habitfill").append('<td> Name:' + data.colour + '</td>');
    });
});
*/

$(document).ready(function() {
    $.getJSON( "/api/habit", function( habitdata ) {
        $.each(habitdata, function(key,val){
           $('#habitfill').append('<td>' + key + ':' + val + '</td>');
        });
    });
});