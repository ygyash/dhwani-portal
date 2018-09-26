// Initial Setup

var express=require("express");
var app=express();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose 




app.get("/",function(req,res){
    res.send("Hello");
});


app.listen(3000,function(){
    console.log("Server Running on Local host 3000");
});
