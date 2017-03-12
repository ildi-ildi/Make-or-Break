/**
 * Created by ILDI on 11/03/2017.
 */


$(document).ready(function() {
    getHabit(); // loads everything

    $('form').submit(function (event) {
        event.preventDefault();
        $.post('/api/habit', {
            name: $('#name').val(), // gets the value from the id
            description: $('#desc').val(),
            colour: $('#colour').val(),
        }, function () {
            getHabit();
        })
    })


});

function getHabit(){
    $.getJSON( "/api/habit", function( data ) {
        $('#habitfill').html('');
        $.each(data.habits, function(idx, habit){
            $('#habitfill').append('<tr data-habit="'+habit._id+'"><td>' + habit.name + '</td><td>' + habit.description+ '</td><td>' + habit.colour + '</td><td><button>Delete</button></td></tr>');
            //data-habit="'+habit._id+  -- gets the id of the row
        });
        $('button').off('click').on('click', deleteHabit); //off click -preventing the button to be pressed // on click, call the function deleteHabit
    });
}
function deleteHabit(event) {
        event.preventDefault();
        var id = $(event.target).parent().parent().attr('data-habit'); // event.target - where we clicked on // parent(). to go to <tr> //parent(). to go to <td> // .attr - geting the info from data-habit
        $.ajax({ // same like post and get - add more functions
            method: "DELETE",
            url: "/api/habit",
            data: { id: id }
        })
            .done(function( msg ) { //auto update table when row is deleted
                getHabit();
            });
}
