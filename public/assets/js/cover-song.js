var client_id = 'cfc03335d19e4df6802ddd464fbd27ac';
var client_secret = 'aead85ca76d64466a4194d53c799e5a8';
var seed_tracks = [];
var seed_artists=[];
var requrl = "dhwaniportal.herokuapp.com"





function serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

$(window).ready(function(){


    //getting the genres list
    $.ajax({
        type: 'GET',
        url: requrl+'/api/genre-seeds'
    }).done((res) => {
        //console.log(res);
        //parsing the data
        //res = JSON.parse(res);

        var genres = res.genres;
        var i=0;
        genres.forEach(function(item){
            item.trim();

            var option = document.createElement('option');

            option.value = item;
        

            document.getElementById('json-datalist').appendChild(option);
        });
    })
    .fail( (err) =>{
        console.log(err);
    });


    

    $("#tracks").focusin(function(){
        
        document.getElementById("tracks").addEventListener('keyup',(event) => {
        var query = $("#tracks").val().trim();

        $.ajax({
            type : 'POST',
            url : requrl+'/api/tracks',
            //contentType:'application/json',
            data:{
                query:query
            } 
        }).done(function(res){
            //console.log(res);
            $("#search-sug-table").empty();
            for(x in res.tracks.items){ 

                $("#search-sug-table").append("<tr class =\"search-item\" id=\""+res.tracks.items[x].id+"\"><div><td>" +res.tracks.items[x].name + "</td>"+"<td>" +res.tracks.items[x].artists[0].name + "</td>"+"<td>" +res.tracks.items[x].album.name + "</td>"+"</div></tr>");

            }
            $(".search-item").click(function(event){
                event.preventDefault();
                //console.log("Hello");

                var id = $(this).attr('id');
                seed_tracks.push(id);
                //console.log(seed_tracks);
                //console.log("Entered the id:"+id);
               
                    $.ajax({
                        type: 'POST',
                        url :requrl+'/api/trackselect/',
                        data:{
                            id:id
                        }
        
                    }).done((res) =>{
                        //console.log(res);
                        md.showNotification('top','center',res.name+" has been added to the list");
                        $(".track-tiles").append("<div class=\"alert alert-success\">"+
                        "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
                            "<i class=\"material-icons\">close</i>"+
                         "</button>"+
                        "<div>"+
                        "<img src=\""+res.album.images[2].url+"\">"+
                        "<div><b>"+res.name+"</b> - "+res.artists[0].name+"</div></div>"+
                        "</div>"
                            
                        );
                    })
                    .fail((err) => {
                      console.log(err);  
                    });
                
            });

            

        })
        .fail(function(err){
            console.log(err);
            
        });
});
});
    $("#tracks").focusout(function(){
        setTimeout(function(){
            $("#search-sug-table").empty();
        },3000);
    });
    $("#artists").focusout(function(){
        setTimeout(function(){
            $("#search-sug-table").empty();
        },3000);
    });
    $("#artists").focusin(function(){
        document.getElementById("artists").addEventListener('keyup',() => {
            var query = $("#artists").val();
            query.toUpperCase();
            query.trim();
            var params = {
                q: query.replace("%20","%20OR%20"),
                // market: 'US',
                limit: 5,
                type: 'artist'
            }
            $.ajax({
                type : 'POST',
                url : requrl+'/api/artists',
                data:{
                    query:query
                }
 
            }).done(function(res){
                //console.log(res);
                $("#search-sug-table").empty();
                for(x in res.artists.items){ 
                    var genres = '';
                    if(res.artists.items[x].genres.length>=1){
                        genres = res.artists.items[x].genres[0].toUpperCase();
                    }
                    $("#search-sug-table").append("<tr  id=\""+res.artists.items[x].id+"\"><div><td class =\"search-item-artists\">" +res.artists.items[x].name + "</td>"+"<td class =\"search-item-artists\">" +genres + "</td>"+"</div></tr>");
               
                }


                $(".search-item-artists").click(function(event){
                    event.preventDefault();
                    //console.log("Hello");
                    var id = $(this).parent().attr('id');
                    seed_artists.push(id);
                    //console.log(seed_artists);
                    //console.log("Entered the id:"+id);
                        $.ajax({
                            type: 'POST',
                            url :requrl+ '/api/artistselect/',
                            data:{
                                id:id
                            } 
            
                        }).done((res) =>{
                            //console.log(res);
                            var genres = '';
                            if(res.genres.length>=1){
                                genres = res.genres[0].toUpperCase();
                            }
                            md.showNotification('top','center',res.name+" has been added to the list");
                            $(".artist-tiles").append("<div class=\"alert alert-danger\">"+
                            "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
                                "<i class=\"material-icons\">close</i>"+
                             "</button>"+
                            "<div>"+
                            "<img style = \"height:64px;width:64px;\" src=\""+res.images[2].url+"\">"+
                            "<div><b>"+res.name+"</b> - "+genres+"</div></div>"+
                            "</div>"
                                
                            );
                        })
                        .fail((err) => {
                          console.log(err);  
                        });
                    
                });

                

            })
            .fail(function(err){
                console.log(err);

            });
    });
    });    
});


$("#submit").click(function(e){
    e.preventDefault();
    
var acousticness = parseFloat($("#acousticness").html())*1.00/100;
var danceability = parseFloat($("#danceability").html())*1.00/100;
var loudness  = parseFloat($("#loudness").html())-60.00;
var popularity = parseInt($("#popularity").html());
var tempo = parseFloat($("#tempo").html());
var energy = parseFloat($("#energy").html())*1.00/100;
var key =parseInt( $("#key").val());
//console.log(key);
var seed_genres = [];
var genre = $("#genre").val();
if(genre!=""){
    seed_genres.push(genre);
}
var mode1 = $("#mode").val();
var mode = -1;
if(mode1 === "Major"){
     mode = 1;
}
else if(mode1 === "Minor"){
     mode = 0;
}
if(seed_tracks.length!=0&&seed_artists.length!=0){
    while(seed_tracks.length+seed_artists.length>4){
        if(seed_artists>seed_tracks){
            seed_artists.pop();
        }
        else{
            seed_tracks.pop();
        }
    }
}

        var data = {
            limit:10,
            target_acousticness : acousticness,
            target_danceability : danceability,
            target_loudness : loudness,
            target_popularity : popularity,
            target_tempo : tempo,
            target_energy : energy,
        }
        if(isNaN(key)===false){
            data.target_key=key;
        }
        if(mode!==-1){
            data.target_mode = mode;
        }
        if(seed_genres.length>0){
            data.seed_genres=seed_genres;
        }
        else{
            alert("Please enter the genre.")   
        }

        if(seed_artists.length>0){
            data.seed_artists=seed_artists;
        }
        else{
            alert("Please enter the artists.")   
        }


        if(seed_tracks.length>0){
            data.seed_tracks=seed_tracks;
        }
        else{
            alert("Please enter the tracks.")   
        }
        
        //console.log("Dataaaaaa: ",data);
     if(seed_artists.length>0&&seed_tracks.length>0&&seed_genres.length>0){
        let loadingText="<i class='fa fa-circle-o-notch fa-spin'></i> Loading.."
        $(this).html(loadingText);
        $(this).prop('disabled',true);
        
        $("#submit").attr('id',"");
        $.ajax({
            type : 'POST',
            url: requrl+'/api/recommend',
            data:{
                data:data
            }
        }).done( (res) =>{
           // console.log(res);
            var tracks = res.tracks;
            for(var i = 0;i<tracks.length;i++){
                
                $("#tracks-container").append("<div class=\"card card-stats\">"+
                "<div class=\"card-header card-header-warning card-header-icon\">"+
                  "<div class=\"card-icon\">"+
                   "<img src=\""+tracks[i].album.images[2].url+"\">"+

                  "</div>"+
                  "<p class=\"card-category\">"+tracks[i].artists[0].name+"</p>"+
                  "<h3  class=\"card-title\"><a  target=\"_blank\" href=\""+tracks[i].external_urls.spotify+"\">"+tracks[i].name+
                    
                  "</a></h3>"+
                "</div>"+
                "<div class=\"card-footer\">"+
                  "<div class=\"stats\">"+
                   
                    tracks[i].album.name+
                  "</div>"+
                "</div>"+
              "</div>");
                
            }
            $("#seeds-container").fadeOut();
            setTimeout(function(){
                $("#tracks-container").fadeIn();
            },1000);

        })
        .fail( (err)=>{
            console.log(err);
        });
     }
    });
