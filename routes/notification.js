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
    console.log(req.user);
    
    Slot.find({},function(err,slot){
        if(err){
            console.log(err);
            return res.status(200).json({
                success: false
            })
        }
        var slotObject = [];
    
        //converting start-end to hh:mm
        for(var i=0;i<slot.length;i++){

            var time=slot[i].start,hr=0,min=0;
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
    } 
      var time2=slot[i].end,hr2=0,min2=0; 
    if(time2<31) {
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
    }    var h1 = "";
    
        if(parseInt(hr)/10<1){
             h1 = "0"+hr;
        }
        else {
             h1 = hr;
        }

        var h2= "";
        if(parseInt(hr2)/10<1){
            h2 = "0"+hr2;
       }
       else {
            h2 = hr2;
       }

        var timeSlot = {
            owner  : slot[i].owner.username,
            start : h1+":"+min,
            end: h2 +":"+min2
        }
        //console.log(timeSlot);
        slotObject.push(timeSlot);
        }
        //console.log("Notification page loaded.");
        //console.log(slotObject);
        res.status(200).json({
            success:true,
            data:slotObject
        })
    });
});

router.get("/notifNumber",function(req,res){
    Slot.find({},function(err,slot){
        if(err){
            console.log(err);
            return res.status(200).json({
                success: false
            });
        }
        res.status(200).json({success:true,slot}); 
    });
});

module.exports=router;