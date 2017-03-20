/**
 * Created by ILDI on 11/03/2017.
 */


$(document).ready(function() {
       $('#btnedit').hide();

    getHabit(); // loads everything

    $('form').submit(function (event) {
        event.preventDefault();
        
        $.post('/api/habit', {
            name: $('#name').val(), //gets the value from the id
            startdate: $('#start-date').val(),
            enddate: $('#end-date').val(),
            colour: $('#colour').val(),
        }, function () {
            getHabit();
            name: $('#name').val('');
            startdate: $('#start-date').val('');
            enddate: $('#end-date').val('');
            colour: $('#colour').val('');

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
        });
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

function editHabit(event) {
    // fill input box
    //$('#name').html(event.data.habit.name);
    // ...
    $('#name').val(event.data.habit.name);
    var sd_y =  new Date(event.data.habit.startdate).getFullYear();
    var sd_m =  new Date(event.data.habit.startdate).getMonth();
    var sd_d =  new Date(event.data.habit.startdate).getDay();
    if(sd_m < 10){
        sd_m = "0" + sd_m;
    }
    if(sd_d < 10){
        sd_d = "0" + sd_d
    }
    var sd_full = sd_y +"-"+ sd_m +"-"+ sd_d;
    $('#start-date').val(sd_full);
    var ed_y =  new Date(event.data.habit.enddate).getFullYear();
    var ed_m =  new Date(event.data.habit.enddate).getMonth();
    var ed_d =  new Date(event.data.habit.enddate).getDay();
    if(ed_m < 10){
        ed_m = "0" + ed_m;
    }
    if(ed_d < 10){
        ed_d = "0" + ed_d
    }
    var ed_full = ed_y +"-"+ ed_m +"-"+ ed_d;
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

        name: $('#name').val('');
        startdate: $('#start-date').val('');
        enddate: $('#end-date').val('');
        colour: $('#colour').val('');

        console.log("succes update");
    })
}