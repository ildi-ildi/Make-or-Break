/**
 * Created by ILDI on 11/03/2017.
 */
//the slider should store data in the database,
// - when (date) it was moved - showing it loaded date in that day
// - to what value it is
// - to update the value in case it moves multiple times in the day.

// - after 24 hrs the slider should be back at 0
//   - if it is in the same 24 hours, update the input

// - silderDateLoaded - an array to load the input for that day

$(document).ready(function() {
    $('#btnedit').hide();

    getHabit();

    $('form').submit(function (event) {
        event.preventDefault();
        
        $.post('/api/habit', {
            name: $('#name').val(), //gets the value from the id
            startdate: $('#start-date').val(),
            enddate: $('#end-date').val(),
            colour: $('#colour').val(),
        }, function () {
            getHabit();
            $('#name').val('');
            $('#start-date').val('');
            $('#end-date').val('');
            $('#colour').val('');

        })
    })
});

function getHabit(){
    $.getJSON( "/api/habit", function( data ) {
        var tableBody = $('#habitfill');
        tableBody.empty();

        $.each(data.habits, function(idx, habit) {
            /*var tableRow = $('<tr id="' + habit._id + '"></tr>').appendTo(tableBody);
            $('<td>' + habit.name + '</td>').appendTo(tableRow);
            $('<td>' + habit.description + '</td>').appendTo(tableRow);
            $('<td>' + habit.colour + '</td>').appendTo(tableRow);*/

            var listRow = $('<li class="full-width-slider" id="'+ habit._id +'">').appendTo(tableBody);
            $('<input type="range" id="slider" value="0" min="-5" max="5"/>').appendTo(listRow);
            var fieldsetRow = $('<fieldset data-role="collapsible"><legend>Options</legend>').appendTo(listRow);
            var divRow = $('<div data-role="controlgroup">').appendTo(fieldsetRow);

            var btnEditRow = $('<a href="#home" data-role="button" id="edit">Edit</a>').appendTo(divRow);
            btnEditRow.click({ habit: habit }, editHabit);

            var btnDeleteRow =$('<a href="#home" data-role="button" id="delete">Delete</a>').appendTo(divRow);
            btnDeleteRow.click({ id: habit._id }, deleteHabit);

            $('<a href="#" data-role="button">Report</a>').appendTo(divRow);

            $('</div> </fieldset>').appendTo(listRow);
            $('<h2 class="title-habit-display">' + habit.name +' </h2> </li>').appendTo(listRow);

            /*var btnDeleteColumn = $('<td><button>Delete</button></td>').appendTo(listRow);
            btnDeleteColumn.find('button').click({ id: habit._id }, deleteHabit);

            var btnEditColumn = $('<td><input type="button" value="Edit" id="edit"></td>').appendTo(listRow);
            btnEditColumn.find('input').click({ habit: habit }, editHabit);*/
            //$().trigger("create");
        });
        $('#add-habit').trigger("create");
        $('#habitfill').listview('refresh');
    });
}

function deleteHabit(event) {
        event.preventDefault();

        $.ajax({ // same like post and get - add more functions
            method: "DELETE",
            url: "/api/habit",
            data: { id: event.data.id }
        }).done(function( msg ) { //delete row
            $('#' + event.data.id).remove();
        });
}

function formatDate(data){
    var d_y =  new Date(data).getFullYear();
    var d_m =  new Date(data).getMonth();
    var d_d =  new Date(data).getDay();
    if(d_m < 10){
        d_m = "0" + d_m;
    }
    if(d_d < 10){
        d_d = "0" + d_d
    }
    var d_full = d_y +"-"+ d_m +"-"+ d_d;

    return d_full;
}

function editHabit(event) {
    // fill input box
    //$('#name').html(event.data.habit.name);
    // ...
    $('#name').val(event.data.habit.name);

    var sd_full = formatDate(event.data.habit.startdate);
    $('#start-date').val(sd_full);

    var ed_full = formatDate(event.data.habit.enddate);
    $('#end-date').val(ed_full);
    $('#colour').val(event.data.habit.colour);

    // make submit button invisible
    $('#btnsubmit').hide();
    // make update button visible
    $('#btnedit').show();

    $('#update').click({ id: event.data.habit._id }, updateHabit);
}

function updateHabit(event) {
    event.preventDefault();
    var $id = event.data.id;
    var $name = $('#name').val();
    var $startdate = $('#start-date').val();
    var $enddate = $('#end-date').val();
    var $colour = $('#colour').val();

    $.ajax({
        method: "PUT",
        url: "/api/habit",
        data: { id: $id,
                name: $name,
                startdate: $startdate,
                enddate: $enddate,
                colour: $colour,
        }
    }).done(function() {
        getHabit();

        $('#btnedit').hide();
        $('#btnsubmit').show();

        $('#name').val('');
        $('#start-date').val('');
        $('#end-date').val('');
        $('#colour').val('');

        console.log("succes update");
    })
}