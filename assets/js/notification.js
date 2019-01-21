var requrl="http://localhost:5000";
$(window).ready(function(){

      $.ajax({
          type: 'GET',
            url : requrl+"/dashboard/slotsBooked"
      }).done(function(res){
          if(res.success==false) {
              return console.log("Some Error");
          }
          
          $("#notif-length").html(res.len);
      });

    $.ajax({
        type: 'GET',
        url : requrl+"/notif"
      }).done(function(res){
          if(res.success==false) {
              return console.log("Some Error");
          }
          else{
            console.log(res.data);
          }
          res.data.forEach(slot => {
            $("#notif-dropdown").append("<a class=\"dropdown-item\">"+slot.owner+" booked the slot from "+slot.start+" to "+slot.end+"</a>");
          });
      });
})