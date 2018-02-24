var rooms; 

$(document).ready(function(){
    getRooms();   
});

function getRooms() {
    
    $("table tr").remove(); 
    
    $.get("http://139.59.13.33:8383/hotel/view_rooms",function(data,status) {
        rooms = data.rooms;
        for (i = 0; i < rooms.length; i++) {
            var index = i;
            var roomno = rooms[i].room;
            var markup = "<tr><td>" + ((index) + (1)) + "</td><td>" + roomno + "</td><td><button onClick='deleteRoom(" + index + ")'><span class='glyphicon glyphicon-remove'></span></button></td></tr>";
            $("table tbody").append(markup);
        }
    });    
}

function deleteRoom(click_index){
    


    var data_to_send = { 
        '"room"' :rooms[click_index].room
    };

    console.log(data_to_send);

    $.ajax({
        url: 'http://139.59.13.33:8383/hotel/delete_key',
        type: 'DELETE',
        data: data_to_send,
        dataType: 'json',               
        success: function(result) { getRooms(); },
        error: function(result){ alert("error!") }
    });

    
}

function checkin() {

    var lolz = $('#roomNo');
    var data_to_send = { 
        'room':lolz.val()
    };
    console.log(data_to_send);
    $.ajax({
        type: 'POST',
        url: 'http://139.59.13.33:8383/hotel/generate_key',
        data: JSON.stringify(data_to_send),
        dataType: "json",
        success: function(msg){
            getRooms();
        }
    });


}
