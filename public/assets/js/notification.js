$(window).ready(function(){

      $.ajax({
          type: 'GET',
            url : "/dashboard/slotsBooked"
      }).done(function(res){
          if(res.success==false) {
              alert(res.msg);
              window.location.href = "login.html";
              return;
          }
          
          $("#notif-length").html(res.len);
      });

    $.ajax({
        type: 'GET',
        url : "/notif"
      }).done(function(res){
          if(res.success==false) {
            alert(res.msg);
            window.location.href = "login.html";
            return;
          }
          res.data.forEach(slot => {
            $("#notif-dropdown").append("<a class=\"dropdown-item\">"+slot.owner+" booked the slot from "+slot.start+" to "+slot.end+"</a>");
          });
      });
})