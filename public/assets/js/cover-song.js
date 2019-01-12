var client_id = 'cfc03335d19e4df6802ddd464fbd27ac';
var client_secret = 'aead85ca76d64466a4194d53c799e5a8';
var seed_tracks = []

function serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

$(window).ready(function(){
    $("#tracks").focusin(function(){
        $.ajax({
            type: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            headers:{
                Authorization: 'Basic ' + window.btoa(client_id+":"+client_secret)
            },
            data :{
                grant_type:'client_credentials'
            }
        }).done(function(res){
            var access_token = res.access_token;
            window.addEventListener('keyup',(event) => {
                var query = $("#tracks").val().trim();
                var params = {
                    q: query,
                    // market: 'US',
                    limit: 5,
                    type: 'track'
                }
                $.ajax({
                    type : 'GET',
                    url : 'https://api.spotify.com/v1/search?'+ serialize(params),
                    headers:{
                        Authorization:'Bearer '+ access_token
                    }  
                }).done(function(res){
                    //console.log(res);
                    $("#search-sug-table").empty();
                    for(x in res.tracks.items){ 

                        $("#search-sug-table").append("<tr id=\""+res.tracks.items[x].id+" \"><td>" +res.tracks.items[x].name + "</td>"+"<td>" +res.tracks.items[x].artists[0].name + "</td>"+"<td>" +res.tracks.items[x].album.name + "</td>"+"</tr>");

                    }
                    

                })
                .fail(function(err){
                    console.log(err);
                    $("#search-sug-table").empty();
                });
        });
            
        }).fail(function(err){
            console.log(err);
            //location.reload(true);
        });
    });
        
});