var rooms; 

$(document).ready(function(){
    getRooms();   
});

function getRooms() {
    
    $("table tr").remove(); 
    
    $.get("http://139.59.13.33:8383/hotel/view_rooms",function(data,status) {
        rooms = data.rooms;
        console.log(rooms);
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
        'room' :rooms[click_index].room
    };

    console.log(data_to_send);
    var data_to_send = JSON.stringify(data_to_send);
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
    loadOverlay();

}
function addRoom() {

    var roomNumber = document.getElementById("roomnumber").value;
    console.log(roomNumber);
    var mobile = document.getElementById("mobile").value;
    console.log(mobile);
    var name = document.getElementById("name").value;
    console.log(name);

    var data_to_send = { 
        'room': roomNumber,
        'mobile': mobile,
        'name': name
    };
    // console.log(data_to_send);

    // $.ajax({
    //     type: 'POST',

    //     data: data_to_send,
    //     dataType: "json",
    //     success: function(msg){
    //         getRooms();
    //     }
    // });

    

    // var json = JSON.stringify(data_to_send); 
    // console.log("json");
    // console.log(json);

    // $.ajax({
    // type: "POST",
    // url: 'http://139.59.13.33:8383/hotel/generate_key',
    // data: json,
    // contentType: "application/json; charset=utf-8",
    // dataType: "json",
    // success: function(msg) {
    //     getRooms();
    //     alert('In Ajax');
    // }
    // });
    var roomObj = new Object();

    roomObj.room = roomNumber;
    roomObj.mobile = mobile;
    roomObj.name = name;
  
    console.log(roomObj);
    roomObj = JSON.stringify(roomObj);
    console.log(roomObj);
    $.ajax({
  
            url: 'http://139.59.13.33:8383/hotel/generate_key',
  
            type: 'POST',
  
            dataType: 'json',
  
            data: roomObj,
  
            success: function (data, textStatus, xhr) {
              console.log("Posted!");
              getRooms();
            },
            error: function (xhr, textStatus, errorThrown) {
  
                console.log('Error in Operation');
  
            }
    });

    console.log("dksao");
}


function loadOverlay() {
    
    console.log("open");
    console.log("lmao12");

    $('#overlay').addClass("animated fadeIn");
    $('#overlay').css("display","block");

}
function closeOverlay() {

    console.log("close");
    // document.location.reload();
    $('#overlay').addClass("animated fadeOut");

}

