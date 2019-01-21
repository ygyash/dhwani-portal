// Initial Setup

var express=require("express");
var router=express.Router();

// Models 

var Slot=require("../models/slot.js");
var User=require("../models/user.js");

// authentication

var passport=require("passport");

router.get("/notif",function(req,res){
    console.log("Notification page loading.")
    Slot.find({},function(err,slot){
        if(err){
            console.log(err);
        }      
        var time=interval[i].start,hr=0,min=0;
        if(time<31) {
        hr=(17+parseInt((time-17)/2)).toString();
        if(time%2===0) {
            min="30";
        } else {
            min="00"
        }
    }
    else  {
        time-=31;
        hr=(parseInt(time/2)).toString();
        if(time%2===1) {
            min="30";
        } else {
            min="00"
        }
    } %>
    <%  var time2=interval[i].end,hr2=0,min2=0;  %>
<%  if(time2<31) {
        hr2=(17+parseInt((time2-17)/2)).toString();
        if(time2%2===0) {
            min2="30";
        } else {
            min2="00"
        }
    }
    else  {
        time2-=31;
        hr2=(parseInt(time2/2)).toString();
        if(time2%2===1) {
            min2="30";
        } else {
            min2="00"
        }
    } %>   
        console.log("Notification page loaded.");
        for(var i=0;i<slot.length;i++) {
            console.log(slot[i]);
        }
    });
});

module.exports=router;