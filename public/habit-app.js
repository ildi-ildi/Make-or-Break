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
            name: $('#name').val('');
            description: $('#desc').val('');
            colour: $('#colour').val('');
        })
    })

});

function getHabit(){
    $.getJSON( "/api/habit", function( data ) {
        var tableBody = $('#habitfill');
        tableBody.empty();
        
        $.each(data.habits, function(idx, habit) {
            var tableRow = $('<tr id="' + habit._id + '"></tr>').appendTo(tableBody);
            $('<td>' + habit.name + '</td>').appendTo(tableRow);
            $('<td>' + habit.description + '</td>').appendTo(tableRow);
            $('<td>' + habit.colour + '</td>').appendTo(tableRow);
                        
            var btnDeleteColumn = $('<td><button>Delete</button></td>').appendTo(tableRow);
            btnDeleteColumn.find('button').click({ id: habit._id }, deleteHabit);
            
            var btnEditColumn = $('<td><input type="button" value="Edit" id="edit"></td>').appendTo(tableRow);
            btnEditColumn.find('input').click({ habit: habit }, editHabit);
        });
    });
}

function deleteHabit(event) {
        event.preventDefault();

        $.ajax({ // same like post and get - add more functions
            method: "DELETE",
            url: "/api/habit",
            data: { id: event.data.id }
        }).done(function( msg ) { //auto update table when row is deleted
            $('#' + event.data.id).remove(); 
        });
}

function editHabit(event) {
    // fill input box
    //$('#name').html(event.data.habit.name);
    // ...
    
    // make submit button invisible
    // make update button visible
    
    //$('#update').click({ id: event.data.habit._id }, updateHabit);
}

function updateHabit(event) {
    event.preventDefault();

    var id = event.data.id;
    $('#name').val();

    
}