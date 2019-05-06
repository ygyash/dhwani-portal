//Intial setup
var express=require("express");
var router=express.Router();
var request = require('request');
var querystring = require('querystring');


const client_id = 'cfc03335d19e4df6802ddd464fbd27ac';
const client_secret = 'aead85ca76d64466a4194d53c799e5a8';
var access_token ;
var authOptions = {
    url : 'https://accounts.spotify.com/api/token',
    headers:{
        Authorization: 'Basic ' + new Buffer(client_id+":"+client_secret).toString('base64')
    },
    form :{
        grant_type:'client_credentials'
    },
    json:true
}

request.post(authOptions,function(error, response, tokenRequest){
    //console.log("Entered")
    if(error){
        console.log(error);
    }
    
    if(!error && response.statusCode ===200){
       // console.log(response.body.access_token);
        access_token = response.body.access_token;
    }
});


router.post("/api/artists",function(req,res){

    
    //entering authentication details
    
    //console.log("The request: ",req.body.query);

    var query = req.body.query;
    query.toUpperCase();
    query.trim();
    var params = {
        q: query.replace("%20","%20OR%20"),
        // market: 'US',
        limit: 5,
        type: 'artist'
    }
                  
          //  console.log(querystring.stringify(params));

            var getAuthOptionsSearch = {
                url: 'https://api.spotify.com/v1/search?'+ querystring.stringify(params)
                        ,
                headers:{
                        Authorization:'Bearer '+ access_token
                    }   
            }
    
            if(req.body.query!=''){
                request.get(getAuthOptionsSearch,function(err,searchResponse){
                    //console.log(res.body);
                    if(err){
                        console.log(err);
                        res.status(500);
                    }
    
                    var searchData = JSON.parse(searchResponse.body);
                   // console.log(searchResponse.body);
                    
                    res.status(200).json(searchData);
        
                });
            }
           
            res.status(404);
});

router.post("/api/artistselect",function(req,res){

    
    //entering authentication details
    
    //console.log("The request: ",req.body.id);
    var id = req.body.id;
            var getAuthOptionsArtist = {
                url: 'https://api.spotify.com/v1/artists/'+ id
                        ,
                headers:{
                        Authorization:'Bearer '+ access_token
                    }   
            }
    
            if(req.body.id!=''){
                request.get(getAuthOptionsArtist,function(err,artistResponse){
                    //console.log(res.body);
                    if(err){
                        console.log(err);
                        res.status(500);
                    }
    
                    var artistData = JSON.parse(artistResponse.body);
                    //console.log(artistResponse.body);
                    res.status(200).json(artistData);
        
                });
            }
           
            res.status(404);
    

});

router.post("/api/tracks",function(req,res){

    
   
    //console.log("The request: ",req.body);
    var params = {
        q: req.body.query,
        // market: 'US',
        limit: 5,
        type: 'track'
    }

    
           // console.log(querystring.stringify(params));

            var getAuthOptionsSearch = {
                url: 'https://api.spotify.com/v1/search?'+ querystring.stringify(params)
                        ,
                headers:{
                        Authorization:'Bearer '+ access_token
                    }   
            }
    
            if(req.body.query!=''){
                request.get(getAuthOptionsSearch,function(err,searchResponse){
                    //console.log(res.body);
                    if(err){
                        console.log(err);
                        res.status(500);
                    }
    
                    var searchData = JSON.parse(searchResponse.body);
                    //console.log(searchResponse.body);
                    //console.log(recom.tracks[0].name);
                          //console.log(searchData.tracks['items'][x].name)
                    
                    res.status(200).json(searchData);
        
                });
            }
           
            res.status(404);
    

});
router.post("/api/trackselect",function(req,res){

    
    //console.log("The request: ",req.body.id);
    var id = req.body.id;
            var getAuthOptionsTrack = {
                url: 'https://api.spotify.com/v1/tracks/'+ id
                        ,
                headers:{
                        Authorization:'Bearer '+ access_token
                    }   
            }
    
            if(req.body.id!=''){
                request.get(getAuthOptionsTrack,function(err,trackResponse){
                    //console.log(res.body);
                    if(err){
                        console.log(err);
                        res.status(500);
                    }
    
                    var trackData = JSON.parse(trackResponse.body);
                   // console.log(trackResponse.body);
                    res.status(200).json(trackData);
        
                });
            }
           
            res.status(404);
    

});

router.get("/api/genre-seeds",function(req,res){
   
            var getAuthOptionsGenre = {
                url: 'https://api.spotify.com/v1/recommendations/available-genre-seeds',
                headers:{
                        Authorization:'Bearer '+ access_token
                    }   
            }
    
            request.get(getAuthOptionsGenre,function(err,genreResponse){
                //console.log(res.body);
                if(err){
                    console.log(err);
                    res.status(500);
                }

                res.status(200).json(JSON.parse(genreResponse.body));
    
            });

});

router.post('/api/recommend',function(req,res){


   

    var params  = req.body.data;

            //console.log(querystring.stringify(params));
            var getAuthOptionsRecom = {
                url: 'https://api.spotify.com/v1/recommendations?'+ querystring.stringify(params) ,
                headers:{
                        Authorization:'Bearer '+ access_token
                    }   
            };
    
            request.get(getAuthOptionsRecom,function(err,recomRes){
               
               var recomData = JSON.parse(recomRes.body);
                // for(x in recomData.tracks)
                    //console.log(recomData.tracks[x].name);

                res.status(200).json(recomData);
            });
});


module.exports = router;