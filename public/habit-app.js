/**
 * Created by ILDI on 11/03/2017.
 */


$(document).ready(function() {
    getHabit();

    $('form').submit(function(event){
        event.preventDefault();
        $.post('/api/habit',function(){
            getHabit();
        })
    })
});

function getHabit(){
    $.getJSON( "/api/habit", function( data ) {
        $('#habitfill').html('');
        $.each(data.habits, function(idx, habit){
            $('#habitfill').append('<tr><td>' + habit.name + '</td><td>' + habit.description+ '</td><td>' + habit.colour + '</td></tr>');
        });
    });
};